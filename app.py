from flask import Flask, render_template,redirect, url_for, request, jsonify

app = Flask(__name__, static_folder='static',static_url_path='/')



@app.route("/") 
def home():
    return redirect(url_for('Problems'))

@app.route("/problem_list") 
def Problems():
    return render_template('problem_list.html')  

@app.route("/code_judge") 
def Code():
    return render_template('code_judge.html')  

@app.route("/judge_list") 
def Code_Judge():
    return render_template('judge_list.html')  