function switchWindowTab(windowId, buttonEl) {
    document.querySelectorAll('.app-window').forEach(win => win.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    
    const targetWindow = document.getElementById(windowId);
    if (targetWindow) targetWindow.classList.add('active');
    if (buttonEl) buttonEl.classList.add('active');
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
