// ट्रेलर प्ले करने के लिए फंक्शन
function playTrailer(embedUrl) {
    const container = document.getElementById('player-container');
    const iframe = document.getElementById('trailer-player');
    
    iframe.src = embedUrl;
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

// होम बटन के लिए फंक्शन
function goHome() {
    const container = document.getElementById('player-container');
    const iframe = document.getElementById('trailer-player');
    const searchInput = document.getElementById('movieSearch');
    const cards = document.getElementsByClassName('movie-card');
    
    iframe.src = "";
    container.style.display = 'none';
    searchInput.value = "";
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "block";
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// मूवी लाइव सर्च (फिल्टर) करने के लिए फंक्शन
function searchMovie() {
    let input = document.getElementById('movieSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('movie-card');
    
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (title.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}
