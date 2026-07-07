document.addEventListener("DOMContentLoaded", () => {
    // प्लेयर चालू करें
    if (typeof initPlayer === 'function') initPlayer();

    // मूवीज लिस्ट रेंडर करना
    const movieBox = document.getElementById('moviesContainer');
    if (movieBox && typeof movieStreams !== 'undefined') {
        movieStreams.forEach(item => {
            const card = document.createElement('div');
            card.className = 'content-card';
            card.onclick = () => loadVideo(item.name, item.url);
            card.innerHTML = `<div class="card-icon-box"><i class="fas ${item.icon}"></i></div><div class="card-title">${item.name}</div>`;
            movieBox.appendChild(card);
        });
    }

    // गेम्स गैलेक्सी लिस्ट रेंडर करना
    const gameBox = document.getElementById('gamesContainer');
    if (gameBox && typeof gamesList !== 'undefined') {
        gamesList.forEach(game => {
            const card = document.createElement('div');
            card.className = 'content-card';
            card.onclick = () => launchGame(game.name, game.link);
            card.innerHTML = `<div class="card-icon-box" style="color: #00875a;"><i class="fas ${game.icon || 'fa-gamepad'}"></i></div><div class="card-title">${game.name}</div>`;
            gameBox.appendChild(card);
        });
    }
});
