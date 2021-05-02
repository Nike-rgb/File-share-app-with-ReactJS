import Header from "./header";
import UploadBox from "./uploadBox";
import DownloadLinkBox from "./downloadLinkBox.js";
import DownloadPage from "./downloadPage";
import { useState } from "react";
import { Switch as RouterSwitch, Route } from "react-router-dom";
import UploadToast from "./uploadToast";
import Sidebar from "./sidebar";
import QrScan from "./Qrscan";
import { makeStyles } from "@material-ui/core/styles";
import SettingsOverscanIcon from "@material-ui/icons/SettingsOverscan";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  body: {
    background: theme.palette.secondary.paper,
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  githubLink: {
    position: "absolute",
    top: 70,
    right: 5,
    color: theme.palette.secondary.text,
  },
  instruction: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 15,
    boxSizing: "border-box",
    width: "100%",
    color: theme.palette.secondary.text,
    fontSize: 15,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
}));

const localDb = window.localStorage;

function App(props) {
  const classes = useStyles();
  const [openToast, setOpenToast] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const dataFromDb = JSON.parse(localDb.getItem("upload"));
  const [uploaded, setUploaded] = useState(
    dataFromDb ? dataFromDb.status : false
  );
  const [openOnlineMsg, setOpenOnlineMsg] = useState(false);
  const [data, setData] = useState(dataFromDb ? dataFromDb.data : {});

  return (
    <div className={classes.body}>
      {openToast && (
        <UploadToast
          status={openToast === "Upload Failed" ? "error" : "success"}
          msg={openToast}
        />
      )}
      {openOnlineMsg && (
        <UploadToast
          styles={{ backgroundColor: "#41b9b1" }}
          msg="User is online."
        />
      )}
      <RouterSwitch>
        <Route exact path="/">
          <Header
            setGoBack={setGoBack}
            setScannerOpen={setScannerOpen}
            uploaded={uploaded}
            dark={props.dark}
            setOpenOnlineMsg={setOpenOnlineMsg}
            changeTheme={props.changeTheme}
            uuid={data.uuid}
            showChat={uploaded}
          />
          {!uploaded && (
            <UploadBox
              setOpenToast={setOpenToast}
              setData={setData}
              setUploaded={setUploaded}
            />
          )}
          {uploaded && (
            <DownloadLinkBox
              goBack={goBack}
              setGoBack={setGoBack}
              setUploaded={setUploaded}
              data={data}
            />
          )}
          {uploaded && <Sidebar data={data} />}
        </Route>
        <Route exact path="/files/:uuid">
          <Header
            dark={props.dark}
            changeTheme={props.changeTheme}
            data={data}
            isReceiver={true}
            showChat={true}
            setOpenOnlineMsg={setOpenOnlineMsg}
          />
          <DownloadPage />
        </Route>
      </RouterSwitch>
      <div className={classes.githubLink}>
        Fork this project on Github.
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Nike-rgb/File-share-app-with-ReactJS"
        >
          <IconButton color="primary">
            <GitHubIcon />
          </IconButton>
        </a>
      </div>
      {!uploaded && (
        <div className={classes.instruction}>
          Have a QR code from the sender? Click on{" "}
          <SettingsOverscanIcon
            style={{
              display: "inline-block",
              position: "relative",
              top: 6,
              padding: "0 3px",
            }}
          />{" "}
          icon on top.
        </div>
      )}
      {scannerOpen && <QrScan setScannerOpen={setScannerOpen} />}
    </div>
  );
}

export default App;
