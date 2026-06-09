// Keep try/catch here — missing transcription file is normal (job not done yet)
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

// Check video exists in S3 before starting transcription
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