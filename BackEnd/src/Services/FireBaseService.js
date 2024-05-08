require("dotenv").config();
const firebase = require('../config/db/firebase');
const multer = require("multer");
const {initializeApp} = require("firebase/app");
const {getStorage, ref, getDownloadURL, uploadBytesResumable} = require("firebase/storage");

// Initialize Firebase
initializeApp(firebase.firebaseConfig);

const uploadStorageFireBase = async (dataImg) => {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, `image/${dataImg.originalname}`);
        const metaData = {
            contentType: dataImg.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, dataImg.buffer, metaData);
        const dowloadUrlImg = await getDownloadURL(snapshot.ref);
        
        return {
            Success: true,
            Mess: 'Upload success',
            Type: process.env.GOOD_REQ,
            URL_IMG: dowloadUrlImg
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Mess: 'Error From Server',
            Type: process.env.ERROR_SERVER
        }
    }
}

module.exports = {
    uploadStorageFireBase: uploadStorageFireBase
}