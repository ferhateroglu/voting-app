import hashlib
from flask import Flask, jsonify

app=Flask(__name__)

@app.route('/')
def index():
    return ('server acıldı')


@app.route("/sifrele/sha256/<string:text>", methods=['GET'])
def hash(text):
    cipher_text = hashlib.sha256(text.encode())
    return jsonify({'cipher_text' : cipher_text.hexdigest()})

app.run(debug=True)