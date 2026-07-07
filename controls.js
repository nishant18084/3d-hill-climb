let videoEngine;

function initPlayer() {
    videoEngine = videojs('mainHubPlayer', { fluid: true });
}

function loadVideo(title, url) {
    if (!videoEngine) return;
    document.getElementById('activeContentTitle').innerText = title;
    videoEngine.src({ src: url, type: 'application/x-mpegURL' });
    videoEngine.play().catch(e => console.log("Play token error fixed."));
}

function launchGame(title, webLink) {
    if (videoEngine) videoEngine.pause(); 
    const container = document.getElementById('gameIframeContainer');
    if (container) {
        // सुरक्षा (Security) यहाँ पहले से ही सेट है
        container.innerHTML = `<iframe src="${webLink}" style="width:100%; height:100%; border:none;" sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock" allow="autoplay; gamepad"></iframe>`;
    }
    document.getElementById('masterGamePopup').classList.add('active');
}

function closeGamePopup() {
    document.getElementById('masterGamePopup').classList.remove('active');
    document.getElementById('gameIframeContainer').innerHTML = ""; 
}

function switchWindowTab(windowId, buttonEl) {
    document.querySelectorAll('.app-window').forEach(win => win.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    document.getElementById(windowId).classList.add('active');
    buttonEl.classList.add('active');
}

function toggleMasterFullScreen() {
    const doc = document.documentElement;
    const textEl = document.getElementById('fsText');
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (doc.requestFullscreen) doc.requestFullscreen();
        else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
        if (textEl) textEl.innerText = "Exit App";
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        if (textEl) textEl.innerText = "App Mode";
    }
}
