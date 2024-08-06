const { format } = require('util');
const { bucket } = require('./firebase'); // Import bucket from firebase.js

/**
 * Uploads a file to Firebase Storage and returns the public URL.
 *
 * @param {object} file - The file object to upload.
 * @returns {Promise<string>} - A promise that resolves to the public URL of the uploaded file.
 */
const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error("No file provided."));
        }

        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (err) => {
            reject(err);
        });

        blobStream.on('finish', async () => {
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            try {
                await blob.makePublic();
                resolve(publicUrl);
            } catch (err) {
                reject(new Error('Error making file public: ' + err.message));
            }
        });

        blobStream.end(file.buffer);
    });
};

module.exports = {
    uploadFile
};
