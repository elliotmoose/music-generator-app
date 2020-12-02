import './App.css';
import { useEffect, useState } from 'react'
import Player from './Player';
import * as Tone from 'tone'
let interval;
function App() {
  const [play, setPlay] = useState(false)
  const [player, setPlayer] = useState(new Player());
  const [notes, setNotes] = useState([]);
  const [playheadTime, setPlayheadTime] = useState(0);

  useEffect(() => {
    player.setup();
    setPlayer(player);
    
    if (!interval) {
      setInterval(() => {
        setPlayheadTime(Tone.context.currentTime * DURATION_FACTOR)
      }, 10);
    }
  }, []);

  useEffect(() => {
    if (play) {

      (async () => {
        setNotes(await player.notesFromMidiFile('ABeautifulFriendship.mid'));
        await player.playMidiFile('ABeautifulFriendship.mid');
      })()

      setPlay(false);
    }
  }, [play])

  const MAX_MIDI = 91
  const NOTE_HEIGHT = 20
  const DURATION_FACTOR = 100



  return (
    <div className="App">
      <button onClick={() => setPlay(true)}>begin</button>
      {/* <div style={{height: '100%', width: 4, position: 'absolute', left: playheadTime, top: 0, backgroundColor: 'black', transition: '0.2s', zIndex: 999}}/> */}
      {notes.map((note, i) => {
        // const noteDescription = `${note.name} note: ${note.midi} dur:${note.duration} time:${note.time}`
        const noteDescription = `${note.name}`
        return <div
          key={`${i}`}
          style={{ position: 'absolute', left: note.time * DURATION_FACTOR - playheadTime, top: MAX_MIDI * NOTE_HEIGHT - note.midi * NOTE_HEIGHT, width: note.duration * DURATION_FACTOR, height: NOTE_HEIGHT, backgroundColor: 'tomato' }}
        >{noteDescription}</div>
      }
      )}
    </div>
  );
}

export default App;
