import bucket from "../index.js";

const deleteFile = async (fileUrl) => {
    try {
        // Extract only the path within the bucket
        const bucketBaseUrl = `https://storage.googleapis.com/${bucket.name}/`;
        const filePath = fileUrl.replace(bucketBaseUrl, '');

        await bucket.file(filePath).delete();
        console.log(`Successfully deleted file: ${filePath}`);
    } catch (error) {
        console.error(`Failed to delete file: ${filePath}`, error);
    }
};

export default deleteFile;