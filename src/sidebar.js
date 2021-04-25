import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Axios } from './axios.config';
import Fab from '@material-ui/core/Fab';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    drawer : {
        width : 300,
      },
      outside : {
        width : 'auto',
      },
      toggleBtn : {
        position : 'absolute',
        right : 5,
        bottom : '5%',
        backgroundColor: theme.palette.primary.button,
        '&:hover' : {
          backgroundColor: theme.palette.primary.button,
        }
      },
      emptyList : {
        position : 'absolute',
        top : '52%',
        width : '90%',
        left : '5%',
        textAlign : 'center',
        color : theme.palette.secondary.text,
      },
      attachIcon : {
        fill : theme.palette.secondary.title,
      },
      paper : {
        background : theme.palette.secondary.paper,
      },
      primary : {
        color : theme.palette.secondary.title,
      },
      secondary : {
        color : theme.palette.secondary.subtitle,
      },
}));
  
export default function Sidebar(props) {
    const [fileArr, setFileArr] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        Axios.get(`/api/download/${props.data.uuid}`).then(res => {
            setFileArr(res.data);
        });
    }, [props.data.uuid]);

    const toggleOpen = event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
        if(!open) setOpen(true);
        else setOpen(false);
    }

    const removeFile = fileName => {
        Axios.get(`/api/delete/${props.data.uuid}/${fileName}`).then(res => {
            let updatedFileArr = res.data;
            setFileArr(updatedFileArr);
        });
    }

    const classes = useStyles();
    return (
        <div className={classes.outside}>
            <Drawer classes={{'paper' : classes.paper}} onClose={toggleOpen} anchor="right" open={open}>
                <List className={classes.drawer}>
                    <ListItem key="title">
                        <ListItemText classes={{primary:classes.primary, secondary:classes.secondary}} primary="Files you have shared" secondary="Click on a file to remove"/>
                    </ListItem>
                    <Divider light />
                    {
                        fileArr.map(file => (
                        <ListItem onClick={() => removeFile(file.fileName)} button key={file.fileName}>
                            <ListItemIcon><AttachFileIcon className={classes.attachIcon} /></ListItemIcon>
                            <ListItemText classes={{primary:classes.primary, secondary:classes.secondary}} primary={file.fileOriginalName} secondary={file.fileSize}/>
                        </ListItem>
                    ))
                    }
                </List>
                {!(fileArr.length) && <div className={classes.emptyList}>You haven't shared any files.</div>}
            </Drawer>
            <Tooltip title="Files you shared" aria-label="files">
                <Fab className={classes.toggleBtn} onClick={toggleOpen} color="primary" aria-label="toggle">
                    <InsertDriveFileIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}

    