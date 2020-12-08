import helpers
import tensorflow as tf
from tensorflow import keras
import pickle
import numpy as np
import random
import pretty_midi
import glob
from sklearn.preprocessing import MultiLabelBinarizer

sequence_length = 300
bpm = 140

class Model:
    def __init__(self):
        self.load_model('./model/')
        self.load_dictionaries('./dictionaries')

    def load_model(self, dir):
        self.model = tf.keras.models.load_model(dir)
        self.model.summary()
        print('== Model Loaded!')

    def load_dictionaries(self, dir):
        with open(dir + '/combi_to_int.pickle', 'rb') as f:
            self.combi_to_int = pickle.load(f)
        
        with open(dir + '/int_to_combi.pickle', 'rb') as f:
            self.int_to_combi = pickle.load(f)
            
        with open(dir + '/vocab.pickle', 'rb') as f:
            self.vocab = pickle.load(f)
            
        with open(dir + '/all_song_tokenised.pickle', 'rb') as f:
            self.all_song_tokenised = pickle.load(f)

        print('== Dictionaries Loaded!')

    def generateMidiFromPianoRollSequence(self, piano_roll_sequence, num_note_to_gen):    
        token_sequence = helpers.pianoRollToTokenSequence(piano_roll_sequence, self.combi_to_int)
        return self.generateMidiFromTokenSequence(token_sequence, num_note_to_gen)

    def generateMidiFromTokenSequence(self, token_sequence, num_note_to_gen):    
        """
        @return in midi file bytes
        """
        tokens_generated = []

        while len(tokens_generated) <= num_note_to_gen:
            x = token_sequence[-sequence_length:]
            x = np.array([x])
            y, _ = self.model.predict(x)
            sample_token = helpers.sample_from(y[0][-1], 10)
            tokens_generated.append(sample_token)
            token_sequence.append(sample_token)
            print(f"generated {len(tokens_generated)} notes")

        # return tokens_generated
        pretty_midi_file = helpers.tokenSequenceToMidi(tokens_generated, self.int_to_combi, bpm)
        return helpers.prettyMidiToMidiBytes(pretty_midi_file)

# model = Model()
# song_piano_roll = np.load('./encoded_SmallDay.npy').astype(np.int8)
# with open('./outputs/test.mid', 'wb') as out:
#     output = model.generateMidiFromPianoRollSequence(song_piano_roll[:sequence_length], 5)
#     out.write(output)
