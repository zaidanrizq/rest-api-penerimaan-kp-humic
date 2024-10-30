import { Storage } from "@google-cloud/storage"
import 'dotenv/config';


const projectId = process.env.GCP_PROJECT_ID;
const bucketName = process.env.GCS_BUCKET_NAME;
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const storage = new Storage({ projectId, keyFilename });
const bucket = storage.bucket(bucketName);

export default bucket;