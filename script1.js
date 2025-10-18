function validate(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const age = document.getElementById('age').value;
    const msgBox = document.getElementById('message');

    let messages = '';
    if(email == '') {
        message = 'Please enter an email';
        msgBox.style.color = 'red';
    }
    else if(pass == '') {
        message = 'Enter a password';
    }
    else if(age == '') {
        message = 'Enter your age';
    }
    else {
        message = 'Login successful';
        msgBox.style.color = 'green';
    }
    msgBox.innerText = message;
}