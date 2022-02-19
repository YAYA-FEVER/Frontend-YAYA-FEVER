import axios from "axios";
import React, { Fragment, useState } from "react";

const ImageEditor = () => {

  
  const [fileState, setFileState] = useState(null)

  const onFileChange = event => {
    setFileState({ selectedFile: event.target.files[0] })
    console.log(event.target.files[0])
  }

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      fileState.selectedFile
    );
  
    // Details of the uploaded file
    console.log(fileState.selectedFile);
  
    // Request made to the backend api
    // Send formData object
    axios.post(`https://ecourse.cpe.ku.ac.th/exceed05/api/admin/image_upload/${1}`, formData);
  };
  return (
    <Fragment>
      <input type="file" onChange={onFileChange} />
    </Fragment>
  );
};

export default ImageEditor;
