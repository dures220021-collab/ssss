// Game State
        import { state, gameState, servers } from "./state.js";

const { } = gameState;

let currentCode = gameState.currentCode;
let maxTime = gameState.maxTime;
let timeLeft = gameState.timeLeft;
let timerInterval = gameState.timerInterval;
let isPlaying = gameState.isPlaying;

        // DOM Elements
        const coinsEl = document.getElementById("stat-coins");
        const levelEl = document.getElementById("stat-level");
        const botsEl = document.getElementById("stat-bots");
        const logsEl = document.getElementById("terminal-logs");
        const codeDisplayEl = document.getElementById("target-code-display");
        const timerBarEl = document.getElementById("timer-bar");
        const hackInputEl = document.getElementById("hack-input");
        const targetNameEl = document.getElementById("target-target-name");

        const botCostEl = document.getElementById("bot-cost-1");
        const timeCostEl = document.getElementById("time-cost");
        const levelCostEl = document.getElementById("level-cost");

        function addLog(text, type = "system") {
            const div = document.createElement("div");
            div.className = `log-entry log-${type}`;
            div.innerText = text;
            logsEl.appendChild(div);
            logsEl.scrollTop = logsEl.scrollHeight;
        }

        function generateCode() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let code = "";
            let length = 4 + Math.floor(state.secLevel / 3); // Level이 오를수록 코드 길이 증가 가능
            if (length > 6) length = 6;
            for (let i = 0; i < length; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }

        function startNewPuzzle() {
            currentCode = generateCode();
            codeDisplayEl.innerText = currentCode;
            
            const randomServer = servers[Math.floor(Math.random() * servers.length)];
            targetNameEl.innerText = `SERVER: ${randomServer}`;

            maxTime = Math.max(5000, 10000 + (state.timeBonus * 1000) - (state.secLevel * 200));
            timeLeft = maxTime;
            isPlaying = true;
            hackInputEl.value = "";
            hackInputEl.focus();

            if (timerInterval) clearInterval(timerInterval);

            let startTime = Date.now();
            timerInterval = setInterval(() => {
                let elapsed = Date.now() - startTime;
                let currentRemaining = maxTime - elapsed;
                let percent = (currentRemaining / maxTime) * 100;
                
                if (percent <= 0) {
                    percent = 0;
                    clearInterval(timerInterval);
                    onHackFail();
                }
                timerBarEl.style.width = percent + "%";
            }, 50);
        }

        function onHackFail() {
            isPlaying = false;
            addLog(`[FAIL] 시간 초과! 보안 ICE가 접속을 차단했습니다. (-10 코인 패널티)`, "error");
            state.coins = Math.max(0, state.coins - 10);
            updateUI();
            setTimeout(startNewPuzzle, 1000);
        }

        function handleHackSubmit(e) {
            e.preventDefault();
            if (!isPlaying) return;

            let userInput = hackInputEl.value.trim().toUpperCase();

            if (userInput === currentCode) {
                clearInterval(timerInterval);
                isPlaying = false;
                let reward = state.secLevel * 15;
                state.coins += reward;
                addLog(`[SUCCESS] 해킹 성공! +${reward} Data-Coin 획득 [서버 침투 완료]`, "success");
                updateUI();
                setTimeout(startNewPuzzle, 500);
            } else {
                addLog(`[ERROR] 잘못된 코드 입력: "${userInput}". 다시 시도하세요.`, "error");
                hackInputEl.value = "";
            }
        }

        function updateUI() {
            coinsEl.innerText = state.coins;
            levelEl.innerText = state.secLevel;
            botsEl.innerText = state.autoBots;

            botCostEl.innerText = state.botCost + " DC";
            timeCostEl.innerText = state.timeCost + " DC";
            levelCostEl.innerText = state.levelCost + " DC";

            // Button states
            document.getElementById("btn-buy-bot-1").disabled = state.coins < state.botCost;
            document.getElementById("btn-buy-time").disabled = state.coins < state.timeCost;
            document.getElementById("btn-buy-level").disabled = state.coins < state.levelCost;
        }

        // Shop Functions
        function buyAutoBot(id, cost) {
            if (state.coins >= cost) {
                state.coins -= cost;
                state.autoBots += 1;
                state.botCost = Math.floor(state.botCost * 1.5);
                addLog(`[MARKET] 크롤러 봇 구매 완료. (총 ${state.autoBots}대)`, "warning");
                updateUI();
            }
        }

        function buyTimeUpgrade() {
            if (state.coins >= state.timeCost) {
                state.coins -= state.timeCost;
                state.timeBonus += 1;
                state.timeCost = Math.floor(state.timeCost * 1.8);
                addLog(`[MARKET] 터미널 오버클럭(시간 연장) 완료.`, "warning");
                updateUI();
            }
        }

        function buyLevelUpgrade() {
            if (state.coins >= state.levelCost) {
                state.coins -= state.levelCost;
                state.secLevel += 1;
                state.levelCost = Math.floor(state.levelCost * 2.2);
                addLog(`[MARKET] 보안 등급 승급 완료! 현재 레벨: ${state.secLevel}`, "warning");
                updateUI();
            }
        }

        // Auto Bot Passive Income Loop (1초마다)
        setInterval(() => {
            if (state.autoBots > 0) {
                state.coins += state.autoBots;
                updateUI();
            }
        }, 1000);

        // Initial Start
        updateUI();
        startNewPuzzle();

// Component event bindings
document.getElementById("hack-form").addEventListener("submit", handleHackSubmit);
document.getElementById("btn-buy-bot-1").addEventListener("click", () => buyAutoBot(1, state.botCost));
document.getElementById("btn-buy-time").addEventListener("click", buyTimeUpgrade);
document.getElementById("btn-buy-level").addEventListener("click", buyLevelUpgrade);

