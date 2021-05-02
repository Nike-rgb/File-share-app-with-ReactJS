import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";

const toast = {
  position: "fixed",
  width: 200,
  padding: 5,
  borderRadius: 5,
  bottom: 10,
  left: 5,
  textAlign: "center",
  color: "white",
};

const useStyles = makeStyles((theme) => ({
  error: {
    ...toast,
    background: theme.palette.secondary.error,
  },
  success: {
    ...toast,
    background: theme.palette.secondary.success,
  },
  icon: {
    position: "absolute",
    left: 5,
    top: 7,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
}));

export default function UploadToast(props) {
  const classes = useStyles();
  return (
    <>
      {props.status === "error" && (
        <Paper elevation={1} className={classes.error}>
          <ErrorIcon className={classes.icon} />
          <Typography
            className={classes.text}
            component="div"
            color="textPrimary"
          >
            {props.msg}
          </Typography>
        </Paper>
      )}
      {props.status !== "error" && (
        <Paper elevation={1} className={classes.success}>
          <CheckCircleIcon className={classes.icon} />
          <Typography
            variant="caption"
            className={classes.text}
            component="div"
            color="textPrimary"
          >
            {props.msg}
          </Typography>
        </Paper>
      )}
    </>
  );
}
