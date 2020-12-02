import * as Tone from 'tone'
import { Midi } from '@tonejs/midi'

let i = 0
export default class Player {
    setup() {
        Tone.start()
        this.sampler = new Tone.Sampler({
            urls: {
                "C1": "C1.mp3",
                "C2": "C2.mp3",
                "C3": "C3.mp3",
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
                "C5": "C5.mp3",
                "C6": "C6.mp3",
            },
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination()
    }

    async notesFromMidiFile(fileName) {
        const midi = await Midi.fromUrl("/" + fileName);
        console.log(midi)
        let notes = []
        let objTime = 0
        for (let track of midi.tracks) {
            for (let note of track.notes) {
                console.log('add note: ' + note.name)
                objTime += note.time;
                note.objTime = objTime;
                notes.push(note);
            }
        }

        
        return notes
    }
    async playMidiFile(fileName) {
        let notes = await this.notesFromMidiFile(fileName)
        for (let note of notes) {
            this.sampler.triggerAttackRelease([note.name], note.duration, note.time, note.velocity);
            console.log('play note: ' + note.name)
        }

    }
    
}