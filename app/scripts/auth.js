if (localStorage.getItem('login') && localStorage.getItem('secret')) {
    axios.post('/api/login', {
        login: localStorage.getItem('login'),
        password: localStorage.getItem('secret'),
    }).then((res) => {
        console.log(res);
        if (res.data.error) {
            localStorage.setItem('login', '');
            localStorage.setItem('secret', '');
        } else {
            window.location.href = '/Profile';
        }
    });
}

document.getElementById('loginButton').addEventListener('click', (event) => {
    event.preventDefault();
    let userName = document.getElementById('loginUsername').value;
    let userPassword = document.getElementById('loginPassword').value;
    if ((!userName || userName == '') || (!userPassword || userPassword == '')) {
        return alert('Please Fill in your details !');
    }
    axios.post('/api/login', {
        login: userName,
        password: userPassword,
    }).then((res) => {
        console.log(res);
        if (res.data.error) {
            return alert('Invaild Login');
        } else {
            localStorage.setItem('login', userName);
            localStorage.setItem('secret', userPassword);
            window.location.href = '/Profile';
        }
    });
});

document.getElementById('signupButton').addEventListener('click', (event) => {
    event.preventDefault();
    userName = document.getElementById('username').value;
    password = document.getElementById('password').value;
    if ((!password || password == '') || (!userName || userName == '')) {
        return alert('Please Fill in your details !');
    }
    axios.post('/api/signup', {
        login: userName,
        password: password,
    }).then((res) => {
        console.log(res);
        if (res.error) {
            return alert('User Already Exists !');
        } else {
            alert('User Creation Successful !');
            localStorage.setItem('login', userName);
            localStorage.setItem('secret', password);
            window.location.href = '/Profile';
        }
    });
});