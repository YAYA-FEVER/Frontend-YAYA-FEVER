
import firebase from 'firebase/app'
import { storageRef } from '../config/firebase';

export async function uploadImage(file) {
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
  const metadata = {
    contentType: file.type,
  };
  return new Promise((resolve, rejects) => {
    try {
      const uploadTask = storageRef
        .child(timeStamp + file.name)
        .put(file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`uploading... ${progress}%`);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
          throw error;
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(
              downloadURL
            );
          });
        }
      );
    } catch {
      rejects({
        uid: file.name + timeStamp,
        name: file.name,
        status: "error",
      });
    }
  });
}
