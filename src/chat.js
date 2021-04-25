import { io } from 'socket.io-client';
import React, {useState, useRef, useEffect} from 'react';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import alertSound from './sounds/juntos-607.mp3';

const notify = new Audio(alertSound);

const useStyles = makeStyles({
    paper : {
        height : 300,
    },
    list : {
        height : '100%',
        boxSizing : 'border-box',
    },
    chatContainer : {
        position : 'relative',
        height : '95%',
        width : 300,
    },
    chatBox : {
        height : '82%',
        position : 'absolute',
        top : '8%',
        width : '100%',
        overflowY : 'auto',
    },
    msgForm : {
        width : '100%',
        padding : 10,
        position : 'absolute',
        bottom : 0,
        height : '6%',
        textAlign : 'center',
    },
    anchor : {
        top : 7,
    },
    badge : {
        background: '#007eff',
        color: 'white',
        fontSize: 13,
        padding: 3,
        position: 'absolute',
        bottom: '50%',
        textAlign: 'center',
        height: 13,
        width: 13,
        borderRadius: '50%',
        left: '68%',
    },
    noMsg : {
        position : 'absolute',
        top : '45%',
        color : 'gray',
        width : '100%',
        textAlign : 'center',
    },
});

let socket;

export default function Chat (props) { 
    const uuid = props.uuid;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [activeStatus, setActiveStatus] = useState('Offline');
    const [msgArr, setMsgArr] = useState([]);
    const chatBtnRef = useRef();
    const chatBoxRef = useRef();
    const msgInputRef = useRef();
    const [unreadMsgs, setUnreadMsgs] = useState(0);
    useEffect(() => {
        socket = io('http://127.1.1.1:4000');
        socket.emit('join', uuid);
        return () => {
            socket.disconnect();
        }
    }, [uuid]);

    useEffect(() => {
        socket.on('newMsg', msg => {
            setMsgArr(prevMsgArr => [ ...prevMsgArr, { type: 'received', msg }]);
            setTimeout(() => {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; 
            }, 50);
            if(!open) {
                notify.play();
                console.log(notify);
                setUnreadMsgs(prevCount => prevCount + 1);
            }
        });
        if(props.isReceiver) {
            socket.emit('isReceiverOnline', uuid);
            socket.on('isSenderOnline', () => {
                if(activeStatus !== "Online") socket.emit('isReceiverOnline', uuid);
                setActiveStatus('Online');
            });
        } else {
            socket.emit('isSenderOnline', uuid);
            socket.on('isReceiverOnline', () => {
                if(activeStatus !== "Online") socket.emit('isSenderOnline', uuid);
                setActiveStatus('Online');
            });
        }
        socket.on("isOffline", () => {
            setActiveStatus('Offline');
        });
        return () => {
            socket.off('isOffline');
            socket.off('newMsg');
            socket.off('isReceiverOnline');
            socket.off('isSenderOnline');
        }
    }, [open, activeStatus, props.isReceiver, uuid]);

    useEffect(() => {
        if(!unreadMsgs) document.title = "NepalShares | नेपाली बाट नेपाली कै लागि";
        else document.title = `${unreadMsgs} New Messages | NepalShares`;
    }, [unreadMsgs])

    const handleMsgSend = e => {
        e.preventDefault();
        let msg = msgInputRef.current.value;
        setMsgArr([ ...msgArr, { type: 'sent', msg }]);
        e.currentTarget.reset();
        socket.emit('newMsg', {uuid,  msg});
        setTimeout(() => chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight, 50);
    }

    const toggleChat = () => {
        if(open) setOpen(false);
        else {
            setOpen(true);
            setUnreadMsgs(0);
        }
    }
    return (
        <>
        <Tooltip title={ `${activeStatus}` }>
            <IconButton>
                <FiberManualRecordIcon style={{ height : 14, width : 14, fill : (activeStatus === "Offline")? '#efeeee82' : 'rgb(136 210 130)'}}/>
            </IconButton>
        </Tooltip>
        <Tooltip title={ unreadMsgs? `${unreadMsgs}  unread msgs` : 'No new msgs' }>
            <IconButton ref={chatBtnRef} onClick={ toggleChat }>
                { unreadMsgs !== 0 && <div className={classes.badge}>{unreadMsgs}</div> }
                <MailIcon style={{ fill:'white' }}/>
            </IconButton>    
        </Tooltip>
        <Menu
            classes={{ paper : classes.paper, list : classes.list}}
            anchorEl={chatBtnRef.current}
            keepMounted
            open={ open }
        >   
            <div style={{ position : 'relative', zIndex : '1', height : '5%', textAlign:'right'}}>
                <IconButton onClick={ toggleChat }>
                    <CloseIcon />
                </IconButton>
            </div>
            { !msgArr.length && (
                <div className={classes.noMsg}>No messages. Say 'Hello'.</div>
            )}
            <div className={classes.chatContainer}>
                <div ref={ chatBoxRef } className={ classes.chatBox }>
                    {
                        msgArr.map((msgObj, index) => {
                            return (
                                <div key={index} className={`msg-container ${(msgObj.type === 'sent')? 'myMsg' : 'hisMsg'}`}>
                                    <span className='msg'>
                                        { msgObj.msg }
                                    </span>
                                </div>
                            )
                        })
                    }                     
                </div>
                <form className={ classes.msgForm } onSubmit={ handleMsgSend }>
                    <input
                        style ={{
                            padding : 3,
                            fontSize : 14,
                            borderRadius : 3,
                            width : 250
                        }}
                        spellCheck={false}
                        ref={msgInputRef} type="text" 
                        className={classes.msgInput} 
                        placeholder="Type your Msg here."/>
                </form>
                <p style={{fontSize:10, position:'absolute', top:-20, padding:5, color : 'gray'}}>Notification sound from <a href="https://notificationsounds.com/">Notification Sounds</a></p>
            </div>
      </Menu>
      </>
    );
}