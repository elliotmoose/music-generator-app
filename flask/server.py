from flask import Flask
import flask
app = Flask(__name__)

@app.route('/initial')
def receive_user_initial():
    """
    should be array of dictionarys of length user input
    """

@app.route('/next')
def generate_next_chunk():
    """
    receive the last file -> generates the next chunk
    """

    return flask.send_file('./AbeautifulFriendship.mid', as_attachment=True, attachment_filename='generated.midi')

@app.route('/initial_results')
def generate_initial_results():
    """
    receive the last file -> generates the next chunk
    """

    return flask.send_file('./ABeautifulFriendship.mid', as_attachment=True, attachment_filename='generated.midi')
