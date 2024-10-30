import bucket from "../index.js";


const uploadFile = async (folder,file) => {

    const blob = bucket.file(`${folder}/${Date.now()}-${file.originalname}`);

    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype
    });

    blobStream.end(file.buffer);

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    
    return publicUrl;

}

export default uploadFile;