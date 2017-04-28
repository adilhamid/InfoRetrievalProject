from flask import Flask
from flask import Flask, render_template
from flask import Flask, request, send_from_directory
import os
app = Flask(__name__,static_folder='templates')
@app.route("/")
def main():
   	print os.getcwd()
   	return render_template('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('templates/js', path)

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('templates', path)

if __name__ == "__main__":
    app.run()