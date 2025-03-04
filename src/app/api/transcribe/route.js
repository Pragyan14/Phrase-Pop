import {GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";

function getClient(){
    return  new TranscribeClient({
        region: 'ap-south-1',
        credentials:{
            accessKeyId: process.env.ACCESS_KEY_AWS,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
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
        stream.on('data',(chunk) => {chunks.push(chunk)});
        stream.on('end', () => {resolve(Buffer.concat(chunks).toString('utf8'));});
        stream.on('error',(err) => {reject(err);});
    });
}

async function getTranscriptionFile(filename){
    const transcriptionFile = `${filename}.transcription`;
    const s3client = new S3Client({
        region: 'ap-south-1',
        credentials:{
            accessKeyId: process.env.ACCESS_KEY_AWS,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
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
        return JSON.parse(await streamToString(transcriptionJobResponse.Body));
    }
    return null;
}

export async function GET(req){
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const filename = searchParams.get('filename');

    // find ready transcription
    const transcription = await getTranscriptionFile(filename);
    if(transcription){
        return Response.json({
            status: "COMPLETED",
            transcription
        });
    }

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