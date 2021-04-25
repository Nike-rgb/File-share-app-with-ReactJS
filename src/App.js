import Header from './header';
import UploadBox from './uploadBox';
import DownloadLinkBox from './downloadLinkBox.js';
import DownloadPage from './downloadPage';
import { useState } from 'react';
import {Switch as RouterSwitch, Route} from 'react-router-dom';
import UploadToast from './uploadToast';
import Sidebar from './sidebar';
import QrScan from './Qrscan'
import { makeStyles } from '@material-ui/core/styles';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

const useStyles = makeStyles((theme) => ({
  body : {
    background : theme.palette.secondary.paper,
    height : '100%',
    position : 'absolute',
    width : '100%',
  },
  instruction : {
    position : 'absolute',
    bottom : 0,
    left : 0,
    padding : 15,
    boxSizing : 'border-box',
    width : '100%',
    color : theme.palette.secondary.text,
    fontSize : 15,
  },
}));

const localDb = window.localStorage;

function App(props) {
  const classes = useStyles();
  const [openToast, setOpenToast] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const dataFromDb = JSON.parse(localDb.getItem('upload'));
  const [uploaded, setUploaded] = useState(dataFromDb? dataFromDb.status : false);
  const [data, setData] = useState(dataFromDb? dataFromDb.data : {});

  return (
    <div className={classes.body}>
      { openToast && <UploadToast status={ (openToast === "Upload Failed")?'error' : 'success' } msg={ openToast } />}
      <RouterSwitch>
        <Route exact path='/'>
          <Header setGoBack={setGoBack} setScannerOpen={setScannerOpen} uploaded={uploaded} dark={props.dark} changeTheme={props.changeTheme} uuid={ data.uuid } showChat={uploaded} />
          { !uploaded && (<UploadBox setOpenToast={setOpenToast} setData={setData} setUploaded={setUploaded}/>) }
          { uploaded && (<DownloadLinkBox goBack={goBack} setGoBack={setGoBack} setUploaded={setUploaded} data={data}/>) }
          {( uploaded ) && <Sidebar data={data} /> }
        </Route>
        <Route exact path="/files/:uuid">
          <Header dark={props.dark} changeTheme={props.changeTheme} data={ data } isReceiver={true} showChat={true} />
          <DownloadPage />
        </Route>
      </RouterSwitch>
      { !uploaded && (
        <div className={classes.instruction}>
          Have a QR code from the sender? Click on <SettingsOverscanIcon style={{display:'inline-block', position:'relative', top:6, padding:'0 3px',}} /> icon on top.
        </div>
      )}
      { scannerOpen && <QrScan setScannerOpen={setScannerOpen} /> }
    </div> 
  );
}

export default App;
