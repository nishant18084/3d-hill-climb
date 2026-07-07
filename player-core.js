let videoEngine;

function initPlayer() {
    videoEngine = videojs('mainHubPlayer', { fluid: true });
}

function loadVideo(title, url) {
    if (!videoEngine) return;
    document.getElementById('activeContentTitle').innerText = title;
    videoEngine.src({ src: url, type: 'application/x-mpegURL' });
    videoEngine.play().catch(e => console.log("User click required to play."));
}
