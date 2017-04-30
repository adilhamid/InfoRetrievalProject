from flask import Flask
from flask import Flask, render_template, json
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
    data = algorithm_wrapper.triviaAlgorithm(_entity)
    data = [element[0] for element in data]
    return render_template('entity.html',data = json.dumps(data),entity =_entity)


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('templates/js', path)

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('templates', path)

if __name__ == "__main__":
    app.run()