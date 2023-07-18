import React, { useRef, useState } from "react";
import useDrivePicker from 'react-google-drive-picker'

const Draganddrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [openPicker, data, authResponse] = useDrivePicker();

  //google apis
  const client_id = "863849231857-l0c35ao9rjim5ot3ofp7gf784aa0fm9i.apps.googleusercontent.com";
  const client_secret = "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";
  const redirect_url = "";
  const refresh_token = "";

  const handleOpenPicker = () => {
    openPicker({
      clientId:client_id,
      developerKey:"###yourapikey###",
      viewId:"DOCS",
      //token:"##youraccesstoken##", // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
        console.log(e.target.files[0])

    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <section className="Drag">
        <h4>Upload your advert</h4>
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button onClick={onButtonClick} className="upload-button">
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </section>
  );
};

export default Draganddrop;
