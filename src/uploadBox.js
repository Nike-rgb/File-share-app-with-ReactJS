import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Progress from "./progress";
import { Axios } from "./axios.config";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 250,
    maxWidth: 500,
    width: "60%",
    margin: "auto",
    marginTop: 200,
    position: "relative",
    boxSizing: "border-box",
    background: theme.palette.secondary.card,
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      height: 200,
      marginTop: "45%",
    },
  },
  uploadBtnContainer: {
    position: "relative",
    display: "inline-block",
    left: "40%",
    width: "20%",
    textAlign: "center",
    top: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "40%",
      left: "30%",
      top: "77%",
    },
  },
  uploadBtn: {
    width: "100%",
    background: theme.palette.primary.button,
    "&:hover": {
      background: theme.palette.primary.button,
    },
  },
  uploadIcon: {
    position: "absolute",
    left: "105%",
    top: -7,
  },
  uploadText: {
    color: theme.palette.secondary.text,
    textAlign: "center",
    position: "absolute",
    top: "10%",
    width: "80%",
    left: "10%",
  },
  dragIconCon: {
    position: "absolute",
    top: "35%",
    width: "40%",
    height: "30%",
    textAlign: "center",
    left: "30%",
    [theme.breakpoints.down("xs")]: {
      top: "40%",
    },
  },
  dragIcon: {
    width: 60,
    height: 60,
    fill: "#625c67",
    [theme.breakpoints.down("xs")]: {
      width: 50,
      height: 50,
    },
  },
}));

export default function UploadBox(props) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const fileIcon = useRef();
  const classes = useStyles();
  const handleProgress = (e) => {
    if (e.lengthComputable) {
      let progress = Math.trunc(Math.round(e.loaded * 100) / e.total);
      setProgress(progress);
    } else setProgress(67);
  };
  const handleUpload = () => {
    let fileInput = fileInputRef.current;
    fileInput.click();
    fileInput.onchange = () => {
      setUploading(true);
      let formData = new FormData(document.forms.uploadForm);
      Axios.post("/api/upload", formData, {
        onUploadProgress: handleProgress,
      })
        .then((res) => {
          //show success toast
          let data = res.data;
          if (data.error) throw new Error("");
          props.setData(data);
          window.localStorage.upload = JSON.stringify({
            status: true,
            data: data,
          });
          props.setUploaded(true);
          props.setOpenToast("Upload Success");
          setTimeout(() => {
            props.setOpenToast("");
          }, 3000);
        })
        .catch((err) => {
          props.setOpenToast("Upload Failed");
          setProgress(0);
          setTimeout(() => {
            props.setOpenToast("");
          }, 3000);
        });
    };
  };
  return (
    <div>
      {!!progress && <Progress progress={progress} />}
      <Paper className={classes.container} elevation={2}>
        <div className={classes.uploadText}>Click the Upload button below</div>
        <div className={classes.dragIconCon}>
          <FileCopyIcon ref={fileIcon} className={classes.dragIcon} />
        </div>
        <div className={classes.uploadBtnContainer}>
          <Button
            onClick={handleUpload}
            className={classes.uploadBtn}
            variant="contained"
            color="primary"
            disabled={uploading}
          >
            {uploading ? "Uploading" : "Upload"}
          </Button>
          <IconButton
            disabled={uploading}
            onClick={handleUpload}
            className={classes.uploadIcon}
          >
            <CloudUploadIcon />
          </IconButton>
        </div>
        <form name="uploadForm" hidden encType="multipart/formdata">
          <input ref={fileInputRef} type="file" name="myfile" multiple />
        </form>
      </Paper>
    </div>
  );
}
