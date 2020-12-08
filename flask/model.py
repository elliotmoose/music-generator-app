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

def load_model():
    model = tf.keras.models.load_model('./model/')
    model.summary()
    print('== Model Loaded!')
    return model

def load_dictionaries(dir):
    combi_to_int = None
    int_to_combi = None
    vocab = None
    all_song_tokenised = None
    with open(dir + '/combi_to_int.pickle', 'rb') as f:
        combi_to_int = pickle.load(f)
    
    with open(dir + '/int_to_combi.pickle', 'rb') as f:
        int_to_combi = pickle.load(f)
        
    with open(dir + '/vocab.pickle', 'rb') as f:
        vocab = pickle.load(f)
        
    with open(dir + '/all_song_tokenised.pickle', 'rb') as f:
        all_song_tokenised = pickle.load(f)

    print('== Dictionaries Loaded!')

    return combi_to_int, int_to_combi, vocab, all_song_tokenised

def generateFromTokenSequence(model, token_sequence, num_note_to_gen):    
    tokens_generated = []

    while len(tokens_generated) <= num_note_to_gen:
        x = token_sequence[-sequence_length:]
        x = np.array([x])
        y, _ = model.predict(x)
        sample_token = helpers.sample_from(y[0][-1], 10)
        tokens_generated.append(sample_token)
        token_sequence.append(sample_token)
        print(f"generated {len(tokens_generated)} notes")

    return tokens_generated

def testStartPianoRoll():
    song_piano_roll = np.load('./encoded_SmallDay.npy').astype(np.int8)
    return song_piano_roll

combi_to_int, int_to_combi, vocab, all_song_tokenised = load_dictionaries('./dictionaries')
model = load_model()

song_piano_roll = testStartPianoRoll()
song_token_sequence = helpers.pianoRollToTokenSequence(song_piano_roll, combi_to_int)
start_tokens = song_token_sequence[:sequence_length]
helpers.tokenSequenceToMidi(start_tokens, int_to_combi, bpm).write('./outputs/gpt_original.mid')

generated_tokens = generateFromTokenSequence(model, start_tokens, 10)
generated_with_start = start_tokens + generated_tokens


helpers.tokenSequenceToMidi(generated_tokens, int_to_combi, bpm).write('./outputs/gpt_generated.mid')
helpers.tokenSequenceToMidi(generated_with_start, int_to_combi, bpm).write('./outputs/gpt_generated_w_start.mid')