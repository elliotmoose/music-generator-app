import { Midi } from '@tonejs/midi';
import axios from 'axios';

const server = 'http://localhost:5000'

export default class Model {

    async generateFromUserInput(recorded_result) {

        //send initials
        console.log('making request to send results...')

        let url = server + '/generate_from_user_input'

        let response = await axios({            
            url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer',
            data: {
                recorded_result
            }
        })
        
        if(response.status == 200 && response.data) {
            let midiFile = new Midi(response.data)
            this.lastMidiChunk = midiFile;
            return midiFile;
        }

        console.error('invalid response from server');
        return null;
    }
    
    async generateNextChunk() {

        if(!this.lastMidiChunk) {
            console.error("Can't generate next chunk because no last chunk")
            return null;
        }

        //send initials
        console.log('making request to generate next chunk...')
    
        let url = server + '/generate_next_chunk'
    
        let response = await axios({            
            url,
            method: 'POST',
            responseType: 'arraybuffer',
            data: {
                lastChunk: this.lastMidiChunk.toArray()
            }
        })
        
        if(response.status == 200 && response.data) {
            let midiFile = new Midi(response.data)
            this.lastMidiChunk = midiFile;
            return midiFile;
        }
    
        console.error('invalid response from server');
        return null;
    }
}