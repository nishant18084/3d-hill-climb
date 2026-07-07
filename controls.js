let videoEngine;
let currentInterval = null;
let animationFrameId = null;

function initPlayer() {
    videoEngine = videojs('mainHubPlayer', { fluid: true });
}

function loadVideo(title, url) {
    if (!videoEngine) return;
    document.getElementById('activeContentTitle').innerText = title;
    videoEngine.src({ src: url, type: 'application/x-mpegURL' });
    videoEngine.play().catch(e => console.log("Play token verified."));
}

function launchGame(title, webLink) {
    if (videoEngine) videoEngine.pause(); 
    closeArcadeGame();
    const container = document.getElementById('gameIframeContainer');
    if (container) {
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
    if(windowId !== 'gamesWindow') closeArcadeGame();
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

// ================= 🕹️ ARCADE IN-BUILT GAMES ENGINE =================
function startArcadeGame(gameType) {
    if (videoEngine) videoEngine.pause();
    stopAllArcadeTimers();
    document.getElementById('gamesMenuSection').style.display = 'none';
    document.querySelectorAll('.arcade-container').forEach(div => div.style.display = 'none');
    
    const targetContainer = document.getElementById(`arcade-${gameType}`);
    if(targetContainer) targetContainer.style.display = 'block';

    if(gameType === 'snake') startSnakeLogic();
    if(gameType === 'ttt') startTTTLogic();
    if(gameType === 'pong') startPongLogic();
    if(gameType === 'subway') startSubwayLogic();
}

function closeArcadeGame() {
    stopAllArcadeTimers();
    document.querySelectorAll('.arcade-container').forEach(div => div.style.display = 'none');
    const menu = document.getElementById('gamesMenuSection');
    if(menu) menu.style.display = 'block';
}

function stopAllArcadeTimers() {
    if(currentInterval) clearInterval(currentInterval);
    if(animationFrameId) cancelAnimationFrame(animationFrameId);
    window.removeEventListener("keydown", snakeControl);
    window.removeEventListener("keydown", pongControl);
    window.removeEventListener("keydown", subwayControl);
}

// 1. SNAKE LOGIC
let snake, snakeDir, snakeFood, snakeScoreVal;
const box = 20;
function startSnakeLogic() {
    const canvas = document.getElementById("snakeCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    snake = [{ x: 10 * box, y: 10 * box }]; snakeDir = "RIGHT"; snakeScoreVal = 0;
    document.getElementById("snakeScore").innerText = "स्कोर: 0";
    snakeFood = { x: Math.floor(Math.random()*19)*box, y: Math.floor(Math.random()*19)*box };
    window.addEventListener("keydown", snakeControl);
    currentInterval = setInterval(() => {
        ctx.fillStyle = "#111"; ctx.fillRect(0,0,400,400);
        for(let i=0; i<snake.length; i++){
            ctx.fillStyle = (i==0) ? "#4CAF50" : "#81C784";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
        ctx.fillStyle = "#FF5722"; ctx.fillRect(snakeFood.x, snakeFood.y, box, box);
        let sX = snake[0].x, sY = snake[0].y;
        if(snakeDir == "LEFT") sX -= box; if(snakeDir == "UP") sY -= box;
        if(snakeDir == "RIGHT") sX += box; if(snakeDir == "DOWN") sY += box;
        if(sX == snakeFood.x && sY == snakeFood.y){
            snakeScoreVal++; document.getElementById("snakeScore").innerText = "स्कोर: " + snakeScoreVal;
            snakeFood = { x: Math.floor(Math.random()*19)*box, y: Math.floor(Math.random()*19)*box };
        } else { snake.pop(); }
        let newHead = {x:sX, y:sY};
        if(sX<0 || sX>=400 || sY<0 || sY>=400 || snake.some(h=>h.x==newHead.x && h.y==newHead.y)){
            clearInterval(currentInterval); alert("गेम ओवर! स्कोर: " + snakeScoreVal); startSnakeLogic(); return;
        }
        snake.unshift(newHead);
    }, 100);
}
function snakeControl(e) {
    if (e.keyCode == 37 && snakeDir != "RIGHT") snakeDir = "LEFT";
    else if (e.keyCode == 38 && snakeDir != "DOWN") snakeDir = "UP";
    else if (e.keyCode == 39 && snakeDir != "LEFT") snakeDir = "RIGHT";
    else if (e.keyCode == 40 && snakeDir != "UP") snakeDir = "DOWN";
}

// 2. TIC TAC TOE LOGIC
let tttPlayer, tttState, tttActive;
function startTTTLogic() {
    tttPlayer = "X"; tttState = ["","","","","","","","",""]; tttActive = true;
    document.getElementById("tttStatus").innerText = "खिलाड़ी X की बारी";
    const cells = document.querySelectorAll(".cell");
    cells.forEach(c => { c.innerText = ""; c.className = "cell"; c.replaceWith(c.cloneNode(true)); });
    document.querySelectorAll(".cell").forEach(c => c.addEventListener("click", (e) => {
        let idx = parseInt(e.target.getAttribute("data-index"));
        if(tttState[idx] !== "" || !tttActive) return;
        tttState[idx] = tttPlayer; e.target.innerText = tttPlayer; e.target.classList.add(tttPlayer);
        let win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(w => tttState[w[0]] && tttState[w[0]]==tttState[w[1]] && tttState[w[1]]==tttState[w[2]]);
        if(win) { document.getElementById("tttStatus").innerText = `🎉 खिलाड़ी ${tttPlayer} जीता!`; tttActive = false; return; }
        if(!tttState.includes("")) { document.getElementById("tttStatus").innerText = "🤝 ड्रा हो गया!"; tttActive = false; return; }
        tttPlayer = tttPlayer === "X" ? "O" : "X"; document.getElementById("tttStatus").innerText = `खिलाड़ी ${tttPlayer} की बारी`;
    }));
}

// 3. PONG LOGIC
let pBall, pUser, pCom;
function startPongLogic() {
    const canvas = document.getElementById("pongCanvas"); if(!canvas) return;
    const ctx = canvas.getContext("2d");
    pBall = {x:250, y:175, r:8, speed:5, vX:5, vY:5};
    pUser = {x:0, y:125, w:10, h:80, score:0}; pCom = {x:490, y:125, w:10, h:80, score:0};
    window.addEventListener("keydown", pongControl);
    currentInterval = setInterval(() => {
        pBall.x += pBall.vX; pBall.y += pBall.vY; pCom.y += (pBall.y - (pCom.y + 40)) * 0.1;
        if(pBall.y+8>350 || pBall.y-8<0) pBall.vY = -pBall.vY;
        let p = (pBall.x < 250) ? pUser : pCom;
        if(pBall.x+8>p.x && pBall.x-8<p.x+10 && pBall.y+8>p.y && pBall.y-8<p.y+80) { pBall.vX = -pBall.vX; }
        if(pBall.x<0) { pCom.score++; pBall={x:250, y:175, r:8, speed:5, vX:5, vY:5}; }
        if(pBall.x>500) { pUser.score++; pBall={x:250, y:175, r:8, speed:5, vX:-5, vY:5}; }
        ctx.fillStyle="#000"; ctx.fillRect(0,0,500,350);
        ctx.fillStyle="#FFF"; ctx.font="20px Arial"; ctx.fillText(pUser.score, 120, 40); ctx.fillText(pCom.score, 360, 40);
        ctx.fillRect(pUser.x, pUser.y, pUser.w, pUser.h); ctx.fillRect(pCom.x, pCom.y, pCom.w, pCom.h);
        ctx.fillStyle="#05ff00"; ctx.beginPath(); ctx.arc(pBall.x, pBall.y, pBall.r, 0, Math.PI*2); ctx.fill();
    }, 1000/40);
}
function pongControl(e) {
    if(e.key === "ArrowUp" && pUser.y > 0) pUser.y -= 20;
    if(e.key === "ArrowDown" && pUser.y < 270) pUser.y += 20;
}

// 4. SUBWAY RUNNER LOGIC
let subPlayer, subObs, subTimer, subScore, subActive;
function startSubwayLogic() {
    const canvas = document.getElementById("subwayCanvas"); if(!canvas) return;
    const ctx = canvas.getContext("2d");
    subPlayer = {x:40, y:180, w:25, h:35, jumping:false, vY:0, g:1.2};
    subObs = []; subTimer = 0; subScore = 0; subActive = true;
    document.getElementById("subwayScore").innerText = "स्कोर: 0";
    window.addEventListener("keydown", subwayControl);
    function loop() {
        if(!subActive) return;
        subPlayer.y += subPlayer.vY; subPlayer.vY += subPlayer.g;
        if(subPlayer.y >= 180) { subPlayer.y = 180; subPlayer.vY = 0; subPlayer.jumping = false; }
        subTimer++; if(subTimer % 80 === 0) { subObs.push({x:500, y:185, w:20, h:30, speed:5+(subScore/10)}); }
        for(let i=subObs.length-1; i>=0; i--) {
            subObs[i].x -= subObs[i].speed;
            if(subPlayer.x<subObs[i].x+20 && subPlayer.x+25>subObs[i].x && subPlayer.y<subObs[i].y+30 && subPlayer.y+35>subObs[i].y) {
                subActive = false; alert("गेम ओवर! स्कोर: " + subScore); startSubwayLogic(); return;
            }
            if(subObs[i].x+20 < subPlayer.x && !subObs[i].p) { subScore++; document.getElementById("subwayScore").innerText = "स्कोर: " + subScore; subObs[i].p = true; }
            if(subObs[i].x+20 < 0) subObs.splice(i,1);
        }
        ctx.clearRect(0,0,500,250); ctx.fillStyle="#555"; ctx.fillRect(0,215,500,35);
        ctx.fillStyle="#ff0055"; ctx.fillRect(subPlayer.x, subPlayer.y, subPlayer.w, subPlayer.h);
        ctx.fillStyle="#f1c40f"; subObs.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}
function subwayControl(e) {
    if((e.key==="ArrowUp" || e.key===" ") && !subPlayer.jumping && subActive) { subPlayer.vY = -15; subPlayer.jumping = true; }
    }
