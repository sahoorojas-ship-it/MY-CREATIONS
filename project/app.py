from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "HELLO IT IS WORKING"

app.run(debug=False, port=5000)