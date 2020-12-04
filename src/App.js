import './App.css';
import { useEffect, useState } from 'react'
import Player from './Player';
import * as Tone from 'tone'
import PlayBar from './components/Playbar'
import data from './public/data'


let interval;
function App() {
  let SampleChords = data.sampleChords
  const [play, setPlay] = useState(false)
  const [player, setPlayer] = useState(new Player());
  const [playerTwo, setPlayerTwo] = useState(new Player());
  const [notes, setNotes] = useState([]);
  const [playheadTime, setPlayheadTime] = useState(0);
  const [presentChords, setPresetChords] = useState([])

  useEffect(() => {
    (async ()=>{
      await player.setup();
      setPlayer(player);
      await playerTwo.setup();
      setPlayerTwo(playerTwo);
      
      setPresetChords(SampleChords)
      // console.log("set up")
      if (!interval) {
        setInterval(() => {
          setPlayheadTime(Tone.context.currentTime * DURATION_FACTOR)
        }, 10);
      }
    })()
  }, []); //on component mount

  useEffect(() => {
    if (play) {
      (async () => {
        // await player.setup();
        // setPlayer(player);
        setNotes(await player.notesFromMidiFile('ABeautifulFriendship.mid'));
        await player.playMidiFile('ABeautifulFriendship.mid');
      })()

      setPlay(false);
    }
  }, [play,player])

  const MAX_MIDI = 88
  const NOTE_HEIGHT = 8
  const DURATION_FACTOR = 100

  async function onChordButton(chord){
    // console.log(chord)
    await playerTwo.playChord(chord.array);
  }

  async function handleKeyDown(e){
    console.log(e.key);
    if(e.key === e.target.id){
      console.log(e.target.name)
      await playerTwo.playChord(e.target.value);
    }
  }



  return (
    <div className="App">
      <div className="App-header">
          <div style={{width:"20%",textTransform:"uppercase"}}>2.5K only<br></br> music generation <br></br> project</div>
          <PlayBar onClickPlay={() => setPlay(true)} onClickPause={() => player.pausePlayback()} onClickStop={async ()=>{
            await player.stopMidiFile();
            setNotes([]);
            setPlay(false);
          }}></PlayBar>
          <div style={{width:"20%"}}></div>

      </div>
      {/* <button onClick={() => setPlay(true)}>begin</button>    */}

      {/* <div style={{height: '100%', width: 4, position: 'absolute', left: playheadTime, top: 0, backgroundColor: 'black', transition: '0.2s', zIndex: 999}}/> */}
      {/* {notes.map((note, i) => {
        // const noteDescription = `${note.name} note: ${note.midi} dur:${note.duration} time:${note.time}`
        const noteDescription = `${note.name}`
        return <div
          key={`${i}`}
          style={{ position: 'absolute', left: note.time * DURATION_FACTOR - playheadTime, top: MAX_MIDI * NOTE_HEIGHT - note.midi * NOTE_HEIGHT, width: note.duration * DURATION_FACTOR, height: NOTE_HEIGHT, backgroundColor: 'tomato' }}
        >{noteDescription}</div>
      }
      )} */}
      <div className="App-piano">
        {notes.map((note, i) => {
          // const noteDescription = `${note.name} note: ${note.midi} dur:${note.duration} time:${note.time}`
          const noteDescription = `${note.name}`
          return <div
            key={`${i}`}
            style={{position:"absolute",left: note.time * DURATION_FACTOR - playheadTime, top: MAX_MIDI * NOTE_HEIGHT - note.midi * NOTE_HEIGHT, width: note.duration * DURATION_FACTOR, height: NOTE_HEIGHT, backgroundColor: '#7Ec291' }}
          ></div>
        }
        )}
      </div>
      {/* <div style={{backgroundColor:"yellow",position:"relative"}}> HELLO</div> */}
      <div className="App-preset-container">
        {presentChords.map((chord)=> {
          return <button className="App-preset" onClick={(e)=>onChordButton(chord)} id={`${chord.key}`} key={`${chord.key}`} name={`${chord.name}`} onKeyDown={handleKeyDown} >
            <div style={{paddingTop:"2.5vw",fontSize:"1.25vw"}}>{chord.name}</div>
            <div style={{paddingTop:"1.25vw",fontSize:"1vw",color:"#E37B7B"}}>{chord.key}</div>
          </button>
        })}
      </div>
    </div>
  );
}

export default App;
