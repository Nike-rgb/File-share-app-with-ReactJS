import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import QRCode from 'qrcode.react';

const useStyles = makeStyles((theme) => ({
    container : {
        height : 250,
        maxWidth : 500,
        width : '60%',
        margin : 'auto',
        top : 200,
        position : 'relative',
        boxSizing : 'border-box',
        background : theme.palette.secondary.card,
    },
    downloadInstruction : {
        padding: 10,
        boxSizing : 'border-box',
        textAlign : 'center',
        color : theme.palette.secondary.text,
        fontSize : 15,
    },
    downloadPageLink : {
        color: theme.palette.secondary.downloadText,
        padding: 20,
        width: '70%',
        fontSize : 15,
        boxSizing: 'border-box',
        minHeight: 80,
        margin: "100px auto",
        background : theme.palette.secondary.card,
        border: theme.palette.secondary.text + ' dotted 2px',
    },
    qrIcon : {
        position:'absolute',
        height:70,
        left:'44%',
        top:70,
        width : 70,
        '&:hover' : {
            background : '#70e0b712',
        },
    },
    button : {
        background : theme.palette.primary.button,
        position : 'absolute',
        top : '105%',
        left : '41%',
        '&:hover' : {
            background : theme.palette.primary.button,
        }
    },
    dialogText : {
        '&:first-child' : {
            fontSize : 15,
            color : 'black',
        }
    },
    icon : {
        fill : theme.palette.secondary.text,
    },
    qrGenerateMenu : {
        width : 200,
        height : 200,
        display:'inline-block',
        position : 'relative',
    }
}));

export default function DownloadLinkBox (props) {
    const classes = useStyles();
    const [showQR, setShowQR] = useState(false);
    const handleBack = () => {
        window.localStorage.removeItem('upload');
        props.setUploaded(false);
        props.setGoBack(false);
    }
    const generateQR = e => {
        e.stopPropagation();
        setShowQR(prevValue => !prevValue);
    }
    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.downloadInstruction}>
                    Copy this link and send it to the receiver or click below to generate QR code
                </div>
                <Tooltip title="Generate QR of this URL">
                    <IconButton onClick={generateQR} classes={{root : classes.qrIcon}}>
                        <SettingsOverscanIcon className={classes.icon} style={{ width:'100%', height:'100%'}} />
                    </IconButton>
                </Tooltip>
                { showQR && (
                    <div style={{textAlign:'center', top:'10%', position:'absolute', width:'100%'}}>
                        <Paper onClick={generateQR} className={classes.qrGenerateMenu} elevation={1}>
                        <div style={{ position : 'relative', zIndex : '1', height : '5%', textAlign:'right'}}>
                            <IconButton onClick={ generateQR }>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div style={{position:'absolute', width:'100%', textAlign:'center', top:'18%'}}>
                            <QRCode value={props.data.downloadPageLink} />
                        </div>
                        </Paper>
                    </div>
                )} 
                <Paper elevation={0} className={classes.downloadPageLink}>{props.data.downloadPageLink}</Paper>
                <Button onClick={ () => props.setGoBack(true)} color="primary" variant="contained" className={classes.button}>Go Back</Button>
            </Paper>
            <Dialog
                open={props.goBack}
                aria-labelledby="alert-confirm"
                aria-describedby="alert-wanna-go-back"
            >
                <DialogTitle style={{ fontWeight:'bold', color:'#0c65c1',fontSize:17 }}>{"Confirm Go Back?"}</DialogTitle>
                <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    Clicking 'Yes' will delete the data of the files you've uploaded. The action is irreversible.
                    Only do so if you are done sharing files with the receiver.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleBack} color="primary">
                    Yes
                </Button>
                <Button onClick={ () => props.setGoBack(false)} color="primary" autoFocus>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}