import {GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";

function getClient(){
    return  new TranscribeClient({
        region: 'ap-south-1',
        credentials:{
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    })
}

function createTranscriptionCommand(filename){
    const uri = 's3://'+process.env.AWS_BUCKET_NAME+'/'+filename;
    console.log(uri)
    return new StartTranscriptionJobCommand({
        TranscriptionJobName: filename,
        OutputBucketName: process.env.AWS_BUCKET_NAME,
        OutputKey: `${filename}.transcription`,
        IdentifyLanguage: true,
        Media:{
            MediaFileUri: uri
        }
    })
}

async function createTranscriptionJob(filename){
    const transcribeClient = getClient();
    const transcriptionCommand = createTranscriptionCommand(filename);
    return transcribeClient.send(transcriptionCommand);
}

async function getJob(filename){
    const transcribeClient = getClient();
    let jobStatusResult = null;
    try{
        const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
            TranscriptionJobName: filename
        })
        jobStatusResult = await transcribeClient.send(transcriptionJobStatusCommand);
    }catch (e) {}
    return jobStatusResult;
}

async function streamToString(stream){
    const chunks = [];
    return new Promise((resolve,reject)=>{
        stream.on('data',chunk => chunks.push(Buffer.from(chunk)));
        stream.on('end', resolve(Buffer.concat(chunks).toString('utf8')));
        stream.on('error',reject);
    });
}

async function getTranscriptionFile(filename){
    const transcriptionFile = `${filename}.transcription`;
    const s3client = new S3Client({
        region: 'ap-south-1',
        credentials:{
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });

    const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: transcriptionFile
    })

    let transcriptionJobResponse = null;
    try{
        transcriptionJobResponse = await s3client.send(getObjectCommand);
    }catch (e){}

    if(transcriptionJobResponse){
        const transcription = await streamToString(transcriptionJobResponse.Body);
        console.log({transcription});
    }
}

export async function GET(req){
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename');

    // find ready transcription
    await getTranscriptionFile(filename);

    // check if already transcribing
    const existingJob = await getJob(filename);

    if(existingJob){
        return Response.json({
            status: existingJob.TranscriptionJob.TranscriptionJobStatus,
        })
    }
    // creating new transcription job
    if(!existingJob) {
        const newJob = await createTranscriptionJob(filename);
        return Response.json({
            status: newJob.TranscriptionJob.TranscriptionJobStatus,
        })
    }


    return Response.json(null);
}