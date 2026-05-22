@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        mydb = mysql.connector.connect(
            host="remotemysql.com",
            user="u9n2m8s1",
            password="b9s1m8s1",
            database="u9n2m8s1"
        )
        mycursor = mydb.cursor()
        mycursor.execute('SELECT * FROM accounts WHERE username = %s AND password = %s', (username, password))
        account = mycursor.fetchone()
        if account:
            print("Logged in successfully!")
            name = account[1]
            id = account[0]
            msg = 'Logged in successfully!'
            print('login successfull!')
            return render_template('login.html', name=name, id=id)
        else:
            msg = 'incorrect credentials, kindly try again'
            return render_template('login.html', msg=msg)
    else:
        return render_template('login.html', msg=msg)
    