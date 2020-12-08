from flask import Flask, request
import flask
from flask_cors import CORS, cross_origin
from model import Model
import numpy as np

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__)

# ======================================== 
#           MODEL INITIALIZATION
# ========================================
model = Model()
chunk_duration = 300 #300 slices per chunk. user input must be 300, generated will be 300

@app.route('/generate_from_user_input', methods=['GET', 'POST'])
@cross_origin()
def generate_from_user_input():    
    """
    should be array of dictionarys of user input slices
    """

    combiSequence = request.json['recorded_result']
    if combiSequence == None:
        return "invalid input"
    if len(combiSequence) > chunk_duration:
        combiSequence = combiSequence[:chunk_duration]
    
    if len(combiSequence) < chunk_duration:
        #pad sequences
        print(f"sequence has length {len(combiSequence)}. adding padding...")
        while len(combiSequence) < chunk_duration:
            combiSequence.insert(0, [])
    
    #convert 2d list into (list, tuple)
    combiSequence = [tuple(combi) for combi in combiSequence]
    
    # song_piano_roll = np.load('./encoded_SmallDay.npy').astype(np.int8)
    # input_piano_roll = song_piano_roll[:chunk_duration]    
    midiBytesIO = model.generateMidiBytesFromCombiSequence(combiSequence, chunk_duration)
    midiBytesIO.seek(0)
    return flask.send_file(midiBytesIO, as_attachment=True, attachment_filename='generated.mid')


@app.route('/generate_next_chunk', methods=['POST'])
@cross_origin()
def generate_next_chunk():
    """
    receive the last midi chunk file -> generates the next chunk
    """

    return flask.send_file('./AbeautifulFriendship.mid', as_attachment=True, attachment_filename='generated.mid')



if __name__ == '__main__':
    app.run()