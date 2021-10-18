if (localStorage.getItem('login') && localStorage.getItem('secret')) {
    axios.post('/api/login', {
        login: localStorage.getItem('login'),
        password: localStorage.getItem('secret'),
    }).then((res) => {
        console.log(res);
        if (res.data.error) {
            localStorage.setItem('login', '');
            localStorage.setItem('secret', '');
            document.getElementsByClassName('nabarLinks')[0].innerHTML += `<a href="/Auth">Auth</a>`;
            window.location.href = '/';
        } else {
            document.getElementsByClassName('nabarLinks')[0].innerHTML += `<a onclick="localStorage.clear();window.location.href = '/';">Logout</a>`;
        }
    });
} else {
    window.location.href = '/Auth';
}

if (localStorage.getItem('login') && localStorage.getItem('secret')) {
    axios.post('/api/login', {
        login: localStorage.getItem('login'),
        password: localStorage.getItem('secret'),
    }).then((res) => {
        if (res.data.error) {
            localStorage.setItem('login', '');
            localStorage.setItem('secret', '');
            window.location.href = '/Auth';
        } else {
            axios.post('/api/accountInfo', {
                login: localStorage.getItem('login'),
                password: localStorage.getItem('secret'),
            }).then(async (res) => {
                console.log(res.data);
                document.getElementById('nodeUrl').value = `https://${document.location.host}/NodeScrapper?id=${res.data.username}`;
                if (res.data.nodes != '') {
                    for (var node of res.data.nodes.split(';')) {
                        if (node != '') {
                            document.getElementsByClassName('nodes')[0].innerHTML += `<img src="${await getNode(node)}">`;
                        }
                    }
                }
            });
        }
    });
}

async function getNode(nodeId) {
    let res = await axios.post('/api/GetNode', {nodeId: nodeId,});
    if (res.data.error) {
        return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAwICAgICAwICAgMDAwMEBgQEBAQECAYGBQYJCAoKCQgJCQoMDwwKCw4LCQkNEQ0ODxAQERAKDBITEhATDxAQEP/bAEMBAwMDBAMECAQECBALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIAPABQAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==`;
    }
    return res.data.nodeData;
}

function copyNodeUrl(event) {
    event.preventDefault();
    document.getElementById('nodeUrl').select();
    navigator.clipboard.writeText(document.getElementById('nodeUrl').value);
}