from flask import Flask
from flask import Flask, render_template
from flask import Flask, request, send_from_directory
import os
import algorithm_wrapper
app = Flask(__name__,static_folder='templates')
@app.route("/")
def main():
   	print os.getcwd()
   	return render_template('index.html')

@app.route("/entity", methods=['POST'])
def entity():
    _entity = request.form['searchfield']
    answer = algorithm_wrapper.triviaAlgorithm(_entity)
    for key in answer:
        return key


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('templates/js', path)

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('templates', path)

if __name__ == "__main__":
    app.run()