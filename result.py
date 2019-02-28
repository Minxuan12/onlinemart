import sqlite3
import json
from flask import Flask, redirect, url_for, request, render_template, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)

CORS(app)

@app.route('/login',methods = ['POST', 'GET'])
def login():
      name = request.form['nm']
      price = request.form['price']
      qty = request.form['qty']
      conn = sqlite3.connect('/Users/DSKT/Desktop/my_db.sqlite')
      c = conn.cursor()
      print ("Opened database successfully");

      conn.execute("INSERT INTO mart (name,price,qty) VALUES (?,?,?)",(name,price,qty))
      conn.commit()
      print ("Item inserted");

      return redirect("http://localhost:3000")
      #user = request.args.get('nm') for GET
      #return "fail"

@app.route('/DB',methods = ['POST', 'GET'])
def db():

	conn = sqlite3.connect('/Users/DSKT/Desktop/my_db.sqlite')
	c = conn.cursor()
	print ("Opened database successfully");
	c.execute('SELECT * FROM mart')
	exist = bool(c.fetchone())
	if (exist==False) :
		c.execute('CREATE TABLE mart (name TEXT, price TEXT, qty TEXT)')
		print ("Table created successfully");
	
	else :
		print ("Table already created");
	
	conn.commit()
	conn.close()
	return "success"

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@app.route('/livelist',methods = ['POST', 'GET'])
def livelist():
	conn = sqlite3.connect('/Users/DSKT/Desktop/my_db.sqlite')
	print ("Opened database successfully");
	conn.row_factory = dict_factory #need for converting result to json
	cur = conn.cursor()
	cur.execute('SELECT * FROM mart')
	rows = cur.fetchall(); 
	conn.commit()
	conn.close()
	#print(jsonify(rows))
	return jsonify(rows)
	#return render_template("list.html",rows = rows)

@app.route('/list',methods = ['POST', 'GET'])
def list():
	conn = sqlite3.connect('/Users/DSKT/Desktop/my_db.sqlite')
	print ("Opened database successfully");
	conn.row_factory = dict_factory #need for converting result to json
	cur = conn.cursor()
	cur.execute('SELECT * FROM mart')
	rows = cur.fetchall(); 
	conn.commit()
	conn.close()
	return render_template("list.html",rows = rows)

@app.route('/search',methods = ['POST', 'GET'])
def search():
	name = request.args.get('name')
	conn = sqlite3.connect('/Users/DSKT/Desktop/my_db.sqlite')
	print ("Opened database successfully");
	conn.row_factory = dict_factory #need for converting result to json
	cur = conn.cursor()
	cur.execute('SELECT * FROM mart WHERE name=?',(name,))
	rows = cur.fetchall(); 
	conn.commit()
	conn.close()
	print(rows)
	return jsonify(rows)


@app.route('/remove',methods = ['POST'])
def remove():
	name = request.form['nm']
	conn = sqlite3.connect('/Users/DSKT/Desktop/my_db.sqlite')
	print ("Opened database successfully");
	cur = conn.cursor()
	cur.execute('SELECT * FROM mart WHERE name = (?)', (name,))
	exist = bool(cur.fetchone())
	if exist:
		cur.execute('DELETE FROM mart WHERE name= (?)', (name,))
		conn.commit()
		conn.close()
		return render_template("remove.html",msg = "Item deleted!")
	else :
		conn.commit()
		conn.close()
		return render_template("remove.html",msg = "Item not found!")

@app.route('/update',methods = ['POST'])
def update():
	name = request.form['nm']
	price = request.form['price']
	qty = request.form['qty']
	conn = sqlite3.connect('/Users/DSKT/Desktop/my_db.sqlite')
	print ("Opened database successfully");
	cur = conn.cursor()
	cur.execute('SELECT * FROM mart WHERE name = (?)', (name,))
	exist = bool(cur.fetchone())
	if exist:
		cur.execute('UPDATE mart SET price =?, qty =? WHERE name = ?', (price,qty,name))
		conn.commit()
		conn.close()
		return render_template("update.html",msg = "Item updated!")
	else :
		conn.commit()
		conn.close()
		return render_template("update.html",msg = "Item not found!")

if __name__ == '__main__':
   app.run(debug = True)