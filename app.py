from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html.j2')

@app.route('/mantle')
def mantle():
    return render_template('mantle.html.j2')

@app.route('/hive-mind')
def hive_mind():
    return render_template('hivemind.html.j2')

@app.route('/stranded')
def stranded():
    return render_template('stranded.html.j2')

@app.route('/fishing-game')
def fishing_game():
    return render_template('fishing.html.j2')

@app.route('/the-lobby')
def lobby():
    return render_template('lobby.html.j2')

@app.route('/pulsefire')
def pulsefire():
    return render_template('pulsefire.html.j2')

@app.route('/punch-kick-block')
def pkb():
    return render_template('pkb.html.j2')

if __name__ == '__main__':
    app.run(debug=True)