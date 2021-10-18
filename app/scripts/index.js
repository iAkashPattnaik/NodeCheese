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
            document.getElementsByClassName('nabarLinks')[0].innerHTML += `<a href="/Profile">Profile</a>`;
            document.getElementsByClassName('nabarLinks')[0].innerHTML += `<a onclick="localStorage.clear();window.location.href = '/';">Logout</a>`;
        }
    });
} else {
    document.getElementsByClassName('nabarLinks')[0].innerHTML += `<a href="/Auth">Auth</a>`;
}