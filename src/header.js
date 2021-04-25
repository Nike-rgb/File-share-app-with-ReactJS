import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chat from './chat';
import Switch from '@material-ui/core/Switch';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import { useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar : {
    background : '#862dca',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  switch : {
    background : "#fff",
  },
  checked : {
    "&.Mui-checked": {
      color: "#fff",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#eee",
    },
  },
  switchHead : {
    color : '#aaaac8',
  }
}));

export default function Header(props) {
  const classes = useStyles();
  let { uuid } = useParams();
  uuid = (uuid)? uuid : props.uuid;
  const toggleScanner = () => {
    props.setScannerOpen(prevValue => !prevValue);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            NepalShares
          </Typography>
          {props.dark && <NightsStayIcon />}
          <Tooltip title={`${props.dark? 'Light' : 'Dark'} mode`}>
            <Switch
              checked={props.dark}
              onChange={props.changeTheme}
              classes={{track:classes.switch, colorSecondary:classes.checked, switchBase:classes.switchHead}}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip>
          { props.showChat && <Chat isReceiver={props.isReceiver} uuid={uuid} /> }
          {!props.uploaded && <a href="/" style={{color:'white', textDecoration:'none'}}><Button color="inherit">Home</Button></a> }
          {props.uploaded && <Button color="inherit" onClick={() => props.setGoBack(true)}>Home</Button> }
          {!props.uploaded && !props.isReceiver && (
            <Tooltip title="Scan QR code">
                <IconButton onClick={toggleScanner}>
                    <SettingsOverscanIcon style={{fill:'white'}} />
                </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
