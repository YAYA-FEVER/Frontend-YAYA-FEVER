import React, { Fragment } from "react";

const ImageEditor = () => {
  const fileSelectorHandler = (event) => {
    console.log(event.target.file[0]);
  };

  return (
    <Fragment>
      <input type="file" onChange={fileSelectorHandler} />
    </Fragment>
  );
};

export default ImageEditor;
