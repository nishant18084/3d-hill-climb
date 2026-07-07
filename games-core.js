function launchGame(title, webLink) {
    if (videoEngine) videoEngine.pause(); 
    const container = document.getElementById('gameIframeContainer');
    if (container) {
        container.innerHTML = `<iframe src="${webLink}" style="width:100%; height:100%; border:none;" allow="autoplay; gamepad"></iframe>`;
    }
    const popup = document.getElementById('masterGamePopup');
    if (popup) popup.classList.add('active');
}

function closeGamePopup() {
    const popup = document.getElementById('masterGamePopup');
    if (popup) popup.classList.remove('active');
    const container = document.getElementById('gameIframeContainer');
    if (container) container.innerHTML = ""; 
}
