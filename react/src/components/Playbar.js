import React from 'react'
// import { useMediaQuery } from 'react-responsive'
import '../App.css';
// import { useEffect, useState } from 'react'

export default function PlayBar(props){
    
    return(
        <div className="App-Playbar" style={{width:"30%"}}>
            <button disabled={props.recordingState} onClick={props.onClickPlay} className="material-icons play-button">play_arrow</button>
            <button disabled={props.recordingState} onClick={props.onClickPause} className="material-icons play-button" >pause</button>
            <button disabled={props.recordingState} onClick={props.onClickStop} className="material-icons play-button">stop</button>
            {!props.recordingState && <button onClick={props.onClickRecord} className="material-icons red play-button">fiber_manual_record</button>}
            {props.recordingState && <button onClick={props.onClickRecordStop} className="material-icons redder play-button">fiber_manual_record</button>}
        </div>
    );

}
