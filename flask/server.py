from flask import Flask
import flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__)

@app.route('/generate_from_user_input', methods=['POST'])
@cross_origin()
def generate_from_user_input():
    """
    should be array of dictionarys of user input slices
    """

    return flask.send_file('./AbeautifulFriendship.mid', as_attachment=True, attachment_filename='generated.mid')


@app.route('/generate_next_chunk', methods=['POST'])
@cross_origin()
def generate_next_chunk():
    """
    receive the last midi chunk file -> generates the next chunk
    """

    return flask.send_file('./AbeautifulFriendship.mid', as_attachment=True, attachment_filename='generated.mid')
