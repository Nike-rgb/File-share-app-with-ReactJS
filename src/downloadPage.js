import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Axios } from "./axios.config";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import GetAppIcon from "@material-ui/icons/GetApp";
import WarningIcon from "@material-ui/icons/Warning";
import dotenv from "dotenv";
dotenv.config();

const useStyles = makeStyles((theme) => ({
  container: {
    height: 250,
    overflowY: "auto",
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
  list: {
    width: "90%",
    margin: "auto",
    color: "#505ad6",
  },
  title: {
    textAlign: "center",
    color: theme.palette.secondary.text,
    fontSize: 16,
    paddingTop: 10,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  noFilesMsg: {
    color: theme.palette.secondary.text,
    textAlign: "center",
    fontSize: 16,
    paddingTop: 80,
  },
  invalidLink: {
    position: "absolute",
    top: "80%",
    width: "80%",
    left: "10%",
    textAlign: "center",
    color: theme.palette.secondary.text,
  },
  primary: {
    color: theme.palette.secondary.title,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  secondary: {
    color: theme.palette.secondary.subtitle,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
}));

export default function DownloadPage(props) {
  const classes = useStyles();
  const [fileArr, setFileArr] = useState([]);
  let { uuid } = useParams();
  useEffect(() => {
    Axios.get(`/api/download/${uuid}`).then((res) => {
      if (res.data.error) return setFileArr(null);
      let fileArr = res.data;
      setFileArr(fileArr);
    });
  }, [uuid]);
  return (
    <>
      <Paper className={classes.container}>
        <div className={classes.title}>Files shared to you</div>
        {fileArr && (
          <List className={classes.list}>
            {fileArr.map((file) => {
              return (
                <ListItem key={file.fileName}>
                  <ListItemText
                    classes={{
                      primary: classes.primary,
                      secondary: classes.secondary,
                    }}
                    primary={file.fileOriginalName}
                    secondary={(file.fileSize / 2 ** 20).toFixed(4) + " MB"}
                  />
                  <ListItemAvatar>
                    <IconButton>
                      <a
                        href={
                          process.env.REACT_APP_API_URL +
                          "/api/download/" +
                          uuid +
                          "/" +
                          file.fileName
                        }
                      >
                        <GetAppIcon
                          style={{ width: 30, height: 30, fill: "#1b95bd" }}
                        />
                      </a>
                    </IconButton>
                  </ListItemAvatar>
                </ListItem>
              );
            })}
          </List>
        )}
        {fileArr && !fileArr.length && (
          <div className={classes.noFilesMsg}>
            No files has been shared with you.
          </div>
        )}
        {!fileArr && (
          <>
            <WarningIcon
              style={{
                fill: "#e60976",
                height: 60,
                width: "20%",
                top: "30%",
                left: "40%",
                position: "absolute",
              }}
            />
            <div className={classes.invalidLink}>
              The link you visited is invalid or broken. Sorry!
            </div>
          </>
        )}
      </Paper>
    </>
  );
}
