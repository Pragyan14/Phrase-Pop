import { GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient, DeleteTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { GetObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { waitUntil } from '@vercel/functions';

function getTranscribeClient() {
    return new TranscribeClient({
        region: 'ap-south-1',
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_AWS,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
        }
    });
}

// Job names can only contain letters, numbers, and hyphens
function toJobName(filename) {
    return filename.replace(/\./g, '-');
}

async function videoExists(filename) {
    const s3client = getS3Client();
    try {
        await s3client.send(new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename
        }));
        return true;
    } catch (e) {
        if (e?.name === 'NoSuchKey' || e?.Code === 'NoSuchKey') {
            return false;
        }
        throw e;
    }
}

function getS3Client() {
    return new S3Client({
        region: 'ap-south-1',
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_AWS,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
        }
    });
}

function createTranscriptionCommand(filename) {
    const uri = 's3://' + process.env.AWS_BUCKET_NAME + '/' + filename;
    return new StartTranscriptionJobCommand({
        TranscriptionJobName: toJobName(filename), // ← sanitized
        OutputBucketName: process.env.AWS_BUCKET_NAME,
        OutputKey: `${filename}.transcription`,
        IdentifyLanguage: true,
        Media: { MediaFileUri: uri }
    });
}

async function createTranscriptionJob(filename) {
    const transcribeClient = getTranscribeClient();
    const transcriptionCommand = createTranscriptionCommand(filename);
    return transcribeClient.send(transcriptionCommand);
}

async function getJob(filename) {
    const transcribeClient = getTranscribeClient();
    try {
        const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
            TranscriptionJobName: toJobName(filename)
        });
        return await transcribeClient.send(transcriptionJobStatusCommand);
    } catch (e) {
        return null;
    }
}

async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => { chunks.push(chunk); });
        stream.on('end', () => { resolve(Buffer.concat(chunks).toString('utf8')); });
        stream.on('error', (err) => { reject(err); });
    });
}

async function getTranscriptionFile(filename) {
    const transcriptionFile = `${filename}.transcription`;
    const s3client = getS3Client();
    try {
        const transcriptionJobResponse = await s3client.send(new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: transcriptionFile
        }));
        if (transcriptionJobResponse) {
            return JSON.parse(await streamToString(transcriptionJobResponse.Body));
        }
    } catch (e) {
        // NoSuchKey here just means transcription not ready yet — not an error
        if (e?.name === 'NoSuchKey' || e?.Code === 'NoSuchKey') {
            return null;
        }
        throw e; // re-throw unexpected errors
    }
    return null;
}

// Deletes video + transcription file from S3 and the Transcribe job
async function deleteAllFiles(filename) {
    const s3client = getS3Client();
    const transcribeClient = getTranscribeClient();

    const transcriptionFile = `${filename}.transcription`;

    try {
        // Delete original video from S3
        await s3client.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename
        }));
        console.log(`Deleted S3 video: ${filename}`);
    } catch (e) {
        console.error(`Failed to delete S3 video: ${filename}`, e);
    }

    try {
        // Delete transcription JSON from S3
        await s3client.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: transcriptionFile
        }));
        console.log(`Deleted S3 transcription: ${transcriptionFile}`);
    } catch (e) {
        console.error(`Failed to delete S3 transcription: ${transcriptionFile}`, e);
    }

    try {
        // Delete Transcribe job
        await transcribeClient.send(new DeleteTranscriptionJobCommand({
            TranscriptionJobName: toJobName(filename)
        }));
        console.log(`Deleted Transcribe job: ${filename}`);
    } catch (e) {
        console.error(`Failed to delete Transcribe job: ${filename}`, e);
    }
}

// Waits 30 minutes then deletes everything
async function scheduleCleanup(filename) {
    await new Promise(resolve => setTimeout(resolve, 30 * 60 * 1000)); // 30 min
    await deleteAllFiles(filename);
}

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename');

    if (!filename) {
        return Response.json({ error: 'No filename provided' }, { status: 400 });
    }

    try {
        // Check transcription file first
        const transcription = await getTranscriptionFile(filename);
        if (transcription) {
            try {
                waitUntil(scheduleCleanup(filename));
            } catch (e) {
                setTimeout(() => scheduleCleanup(filename), 0);
            }
            return Response.json({ status: "COMPLETED", transcription });
        }

        // Check if transcribe job already running
        const existingJob = await getJob(filename);
        if (existingJob) {
            return Response.json({
                status: existingJob.TranscriptionJob.TranscriptionJobStatus,
            });
        }

        // No transcription, no job — check video actually exists before creating job
        const exists = await videoExists(filename);
        if (!exists) {
            return Response.json({ error: 'Not found' }, { status: 404 });
        }

        // Video exists, start transcription
        const newJob = await createTranscriptionJob(filename);
        return Response.json({
            status: newJob.TranscriptionJob.TranscriptionJobStatus,
        });

    } catch (e) {
        console.error('Transcribe route error:', e);
        return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
}