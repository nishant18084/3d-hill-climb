function renderComponents() {
    // 1. Top Navbar
    document.getElementById('navbar-placeholder').innerHTML = `
        <div class="navbar">
            <a href="#" class="brand">Race<span>Drive</span> Hub</a>
            <button class="web-fs-btn" onclick="toggleMasterFullScreen()">
                <i id="fsIcon" class="fas fa-expand"></i> <span id="fsText">App Mode</span>
            </button>
        </div>
    `;

    // 2. Game Popup Structure
    document.getElementById('game-popup-placeholder').innerHTML = `
        <div class="game-popup" id="masterGamePopup">
            <div class="popup-content">
                <button class="close-popup-btn" onclick="closeGamePopup()">Close Game</button>
                <div id="gameIframeContainer" style="width: 100%; height: 100%;"></div>
            </div>
        </div>
    `;

    // 3. Bottom Navigation Bar
    document.getElementById('bottom-nav-placeholder').innerHTML = `
        <div class="bottom-nav">
            <button class="nav-item active" onclick="switchWindowTab('homeWindow', this)"><i class="fas fa-film"></i>Movies</button>
            <button class="nav-item" onclick="switchWindowTab('gamesWindow', this)"><i class="fas fa-gamepad"></i>Games Galaxy</button>
        </div>
    `;
}
