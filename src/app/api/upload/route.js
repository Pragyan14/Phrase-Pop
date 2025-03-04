import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(req){

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
        return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
        return Response.json({ error: "File size exceeds 10MB limit" }, { status: 413 });
    }

    const {name,type} = file;
    const data = await file.arrayBuffer();

    const s3client = new S3Client({
        region: 'ap-south-1',
        credentials:{
            accessKeyId: process.env.ACCESS_KEY_AWS,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
        }
    });

    const id = uniqid();
    const ext = name.split(".").slice(-1)[0];
    const newName = `${id}.${ext}`;

    const uploadCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: data,
        ACL: 'public-read',
        ContentType: type,
        Key: newName
    })

    await s3client.send(uploadCommand);

    return Response.json({name,ext,newName,id});
}