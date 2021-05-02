import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import QrReader from "react-qr-scanner";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    background: "#5d5b5b9e",
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  loading: {
    color: theme.palette.secondary.text,
    position: "absolute",
    top: "41%",
    left: "41%",
  },
}));

export default function QrScan(props) {
  const classes = useStyles();
  const [ready, setReady] = useState(false);
  let flag;
  const handleScan = (data) => {
    if (data && !flag) {
      window.location.href = data.text;
      flag = true;
    }
  };

  const handleError = () => {};
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "20%",
          width: "100%",
          zIndex: 1202,
          textAlign: "center",
          color: "white",
        }}
      >
        {ready ? "Place the QR code in the scanner below." : "Loading..."}
      </div>
      <Backdrop
        classes={{ root: classes.backdrop }}
        open={true}
        onClick={() => props.setScannerOpen(false)}
      >
        <div
          style={{
            width: 250,
            height: 250,
            position: "relative",
            border: "3px solid white",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              border: "50px solid #80808070",
              boxShadow: "rgb(40 255 1 / 77%) 0px 0px 0px 2px inset",
            }}
          >
            {!ready && <CircularProgress className={classes.loading} />}
          </div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            facingMode="rear"
            onLoad={() => setReady(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Backdrop>
    </>
  );
}
