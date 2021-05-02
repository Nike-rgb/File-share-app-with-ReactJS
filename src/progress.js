import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  progressBtn: {
    position: "absolute",
    right: 5,
    bottom: "5%",
    zIndex: 2,
    backgroundColor: "#40b396",
    "&:hover": {
      backgroundColor: "#40b396",
    },
  },
  progressTxt: {
    color: "white",
    fontSize: 13,
  },
});

export default function Progress(props) {
  const classes = useStyles();
  return (
    <>
      <Tooltip title="Uploading..." aria-label="progress">
        <Fab
          className={classes.progressBtn}
          color="primary"
          aria-label="toggle"
        >
          <CircularProgress variant="determinate" />
          <Box
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              className={classes.progressTxt}
              component="div"
              color="textPrimary"
            >{`${props.progress}%`}</Typography>
          </Box>
        </Fab>
      </Tooltip>
    </>
  );
}
