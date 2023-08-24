import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import ImageKit from "imagekit";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function ImageUpload({
  setFileUploadError,
  setImageUrl,
  maxImages,
  maxSizes,
  optionalFunction = null,
}) {
  const [uploading, setUploading] = useState(0);

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".png"],
      },
      maxFiles: maxImages,
      maxSize: maxSizes,
      onDropRejected: (e) => {
        let error = e[0]?.errors[0].code;
        setFileUploadError(error);
        setUploading(-1);
      },

      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );

        let immediateFile = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        handleUploadToImageKit(immediateFile);
      },
    });

  const handleUploadToImageKit = async (files) => {
    setUploading(1);
    const imagekit = new ImageKit({
      publicKey: "public_G1mBGH4ynRy46gzsggJdCguDRZA=",
      privateKey: "private_Df2/XKDIEaIDztFzQ+tAJVmKAOI=",
      urlEndpoint: "https://ik.imagekit.io/padeusnha",
    });

    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const uploadPromise = imagekit.upload({
        file,
        fileName: file.name,
      });

      uploadPromises.push(uploadPromise);
    }

    try {
      const responses = await Promise.all(uploadPromises);
      const uploadedImageUrls = responses.map((response) => response.url);
      if (uploadedImageUrls.length == 0 || !uploadedImageUrls) {
        setUploading(-1);
      } else {
        setUploading(2);
        setImageUrl(uploadedImageUrls);
        if (optionalFunction != null) optionalFunction(uploadedImageUrls);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const thumbs = files.map((file) => {
    return (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    );
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="text-center">
          Drag 'n' drop some package image here,
          <br /> or click to upload iamge
        </p>
        <br />
        <p className="btn text-white">
          UPLOAD IMAGE
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/windows/32/FFFFFF/file-upload.png"
            alt="file-upload"
          />
        </p>
      </div>

      <aside style={thumbsContainer}>{thumbs}</aside>
      {uploading == -1 ? (
        <em>
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/sf-black-filled/64/FA5252/error.png"
            alt="checked--v1"
          />{" "}
          error; try again
        </em>
      ) : uploading == 1 ? (
        <>
          {" "}
          <span className="d-flex">
            <div className="loading-container mr-3">
              <div className="loader"></div>
            </div>
            <b>uploading image, please wait</b>
          </span>
        </>
      ) : uploading == 2 ? (
        <em>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-filled/50/90EE90/checked--v1.png"
            alt="checked--v1"
          />{" "}
          uploaded <br />
        </em>
      ) : null}
    </section>
  );
}

export default ImageUpload;
