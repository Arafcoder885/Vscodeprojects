@app.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        mydb = mysql.connector.connect(
            host="remotemysql.com",
            user="u9n2mXo7s5",
            password="0n2mXo7s5",
            database="u9n2mXo7s5"
        )
        mycursor = mydb.cursor()
        print(username)
        mycursor.execute('SELECT * FROM LoginDetails WHERE Name = %s AND Email_id = %s', (username, email))
        account = mycursor.fetchone()
        print(account)
        if account:
            msg = 'Account already exists!'
        elif not username or not password or not email:
            msg = 'Kindly fill the details!'
        elif not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
            msg = 'Invalid email address!'
        elif not re.match(r'^[A-Za-z0-9]+$', username):
            msg = 'Username must contain only characters and numbers!'
        else:
            mycursor.execute('INSERT INTO LoginDetails VALUES (NULL, %s, %s, %s)', (username, password, email))
            mydb.commit()
            msg = 'You have successfully registered!'
            name = username
            return render_template('register.html', msg=msg, name=name)
    elif request.method == 'POST':
        msg = 'Kindly fill the details!'
    return render_template('register.html', msg=msg)
        
