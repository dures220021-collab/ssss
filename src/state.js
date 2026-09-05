export const state = {
    coins: 0,
    secLevel: 1,
    autoBots: 0,
    botCost: 50,
    timeBonus: 0,
    levelCost: 300,
    timeCost: 100,
};

export const gameState = {
    currentCode: "",
    maxTime: 10000,
    timeLeft: 10000,
    timerInterval: null,
    isPlaying: false,
};

export const servers = [
    "NEXUS-CORE",
    "OMNI-NET",
    "ZEUS-GRID",
    "CYBER-DYN",
    "NEON-BASTION",
];
