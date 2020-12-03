import * as Tone from 'tone'
import { Midi } from '@tonejs/midi'

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

    setupTwo(){
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
                //console.log('add note: ' + note.name)
                objTime += note.time;
                note.objTime = objTime;
                notes.push(note);
            }
        }

        
        return notes
    }
    async playMidiFile(fileName) {
        let notes = await this.notesFromMidiFile(fileName)
        console.log(notes[0].name)
        console.log(notes[1].name)
        console.log(notes[2].name)
        for (let note of notes) {
            this.sampler.triggerAttackRelease([note.name], note.duration, note.time, note.velocity);
            // console.log('play note: ' + note.name)
        }

    }
    // async pauseMidiFile(fileName) {
    //     let notes = []
    //     for (let note of notes) {
    //         this.sampler.triggerAttackRelease([note.name], note.duration, note.time, note.velocity);
    //         console.log('play note: ' + note.name)
    //     }

    // }
    async stopMidiFile() {
        console.log("cut music")
        await this.sampler.disconnect();
        //await this.sampler.dispose();
    }
    
    async playChord(notes){
        // console.log(notes); 
        this.sampler.triggerAttackRelease(notes,2);
    }
}