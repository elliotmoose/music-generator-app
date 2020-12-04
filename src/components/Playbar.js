import React from 'react'
// import { useMediaQuery } from 'react-responsive'
import '../App.css';
// import { useEffect, useState } from 'react'

export default function PlayBar(props){
    
    return(
        <div className="App-Playbar" style={{width:"30%"}}>
            <button onClick={props.onClickPlay} className="material-icons play-button">play_arrow</button>
            <button onClick={props.onClickPause} className="material-icons play-button" >pause</button>
            <button onClick={props.onClickStop} className="material-icons play-button">stop</button>
            <button onClick={props.onClickRecord} className="material-icons red play-button">fiber_manual_record</button>
        </div>
    );

}