(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/game/entities/Snowflake.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Snowflake",
    ()=>Snowflake
]);
class Snowflake {
    x;
    y;
    vx = 0;
    vy = 0.5;
    size;
    radius;
    sizeType;
    constructor(x, y, sizeType = 'small'){
        this.x = x;
        this.y = y;
        this.sizeType = sizeType;
        switch(sizeType){
            case 'large':
                this.size = 3;
                this.radius = 5;
                this.vy = 0.3;
                break;
            case 'medium':
                this.size = 2;
                this.radius = 3;
                this.vy = 0.4;
                break;
            case 'small':
            default:
                this.size = 1;
                this.radius = 2;
                this.vy = 0.5;
        }
        // Add slight random horizontal drift
        this.vx = (Math.random() - 0.5) * 0.2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy *= 1.01; // Accelerate slightly (gravity)
    }
    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    getPoints() {
        switch(this.sizeType){
            case 'large':
                return 30;
            case 'medium':
                return 20;
            case 'small':
            default:
                return 10;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/entities/Snowball.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Snowball",
    ()=>Snowball
]);
class Snowball {
    x;
    y;
    vx;
    vy;
    radius = 4;
    speed = 8;
    trail = [];
    maxTrailLength = 5;
    constructor(startX, startY, targetX, targetY){
        this.x = startX;
        this.y = startY;
        // Calculate direction
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Normalize and apply speed
        this.vx = dx / distance * this.speed;
        this.vy = dy / distance * this.speed;
    }
    update() {
        // Add trail
        this.trail.push({
            x: this.x,
            y: this.y
        });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
        this.x += this.vx;
        this.y += this.vy;
    }
    render(ctx) {
        // Draw trail
        if (this.trail.length > 1) {
            ctx.strokeStyle = 'rgba(200, 200, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for(let i = 1; i < this.trail.length; i++){
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.stroke();
        }
        // Draw snowball
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        // Add slight shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x + 1, this.y + 1, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/entities/Cabin.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cabin",
    ()=>Cabin
]);
class Cabin {
    x;
    y;
    width = 60;
    height = 70;
    smokeParticles = [];
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    update(snowPilePercent) {
        // Update smoke particles
        for(let i = this.smokeParticles.length - 1; i >= 0; i--){
            const particle = this.smokeParticles[i];
            particle.y += particle.vy;
            particle.vy *= 0.98;
            particle.life -= 0.02;
            if (particle.life <= 0) {
                this.smokeParticles.splice(i, 1);
            }
        }
        // Spawn new smoke particles based on pile height
        const smokeIntensity = Math.max(0, 1 - snowPilePercent);
        if (Math.random() < smokeIntensity * 0.3) {
            this.smokeParticles.push({
                x: this.x + (Math.random() - 0.5) * 10,
                y: this.y - 40,
                vy: -(Math.random() * 0.5 + 0.5),
                life: 1
            });
        }
    }
    render(ctx, snowPilePercent) {
        // Calculate brightness based on snow pile
        const brightness = Math.max(0.3, 1 - snowPilePercent * 0.7);
        const lightIntensity = Math.max(0.2, 1 - snowPilePercent);
        // Draw cabin body
        ctx.fillStyle = `rgb(${139 * brightness}, ${69 * brightness}, ${19 * brightness})`;
        ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
        // Draw roof
        ctx.fillStyle = `rgb(${180 * brightness}, ${50 * brightness}, ${30 * brightness})`;
        ctx.beginPath();
        ctx.moveTo(this.x - this.width / 2 - 5, this.y);
        ctx.lineTo(this.x, this.y - 30);
        ctx.lineTo(this.x + this.width / 2 + 5, this.y);
        ctx.fill();
        // Draw windows with glow based on pile height
        const windowGlow = 255 * lightIntensity;
        ctx.fillStyle = `rgb(${255 * lightIntensity}, ${200 * lightIntensity}, ${100 * lightIntensity})`;
        // Left window
        ctx.fillRect(this.x - 25, this.y + 15, 15, 15);
        // Right window
        ctx.fillRect(this.x + 10, this.y + 15, 15, 15);
        // Window glow effect
        if (lightIntensity > 0.3) {
            ctx.shadowColor = `rgba(${windowGlow}, ${200 * lightIntensity}, ${100 * lightIntensity}, 0.5)`;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = `rgba(255, 200, 100, ${lightIntensity})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - 25, this.y + 15, 15, 15);
            ctx.strokeRect(this.x + 10, this.y + 15, 15, 15);
            ctx.shadowColor = 'transparent';
        }
        // Draw door
        ctx.fillStyle = `rgb(${80 * brightness}, ${40 * brightness}, ${20 * brightness})`;
        ctx.fillRect(this.x - 8, this.y + 35, 16, 30);
        // Draw chimney
        ctx.fillStyle = `rgb(${100 * brightness}, ${100 * brightness}, ${100 * brightness})`;
        ctx.fillRect(this.x + 20, this.y - 35, 12, 35);
        // Draw smoke
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = `rgba(200, 200, 200, ${lightIntensity * 0.8})`;
        for (const particle of this.smokeParticles){
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 5 * particle.life, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/collision.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkCollision",
    ()=>checkCollision
]);
function checkCollision(snowball, snowflake) {
    const dx = snowball.x - snowflake.x;
    const dy = snowball.y - snowflake.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < snowball.radius + snowflake.radius;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/audio/AudioManager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AudioManager",
    ()=>AudioManager
]);
class AudioManager {
    audioContext = null;
    isMuted = false;
    masterVolume = 0.3;
    fireLoopGain = null;
    fireOscillator = null;
    constructor(){
        this.initializeAudioContext();
        this.startFireAmbience();
    }
    initializeAudioContext() {
        if (("TURBOPACK compile-time value", "object") !== 'undefined' && !this.audioContext) {
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                this.audioContext = new AudioContextClass();
            } catch (e) {
                console.warn('Web Audio API not supported');
            }
        }
    }
    startFireAmbience() {
        if (!this.audioContext) return;
        try {
            const ctx = this.audioContext;
            // Create fire ambience using multiple oscillators
            this.fireLoopGain = ctx.createGain();
            this.fireLoopGain.connect(ctx.destination);
            this.fireLoopGain.gain.value = this.masterVolume * 0.2;
            // Main tone (crackling base)
            const osc1 = ctx.createOscillator();
            osc1.frequency.value = 150;
            osc1.type = 'sine';
            osc1.connect(this.fireLoopGain);
            osc1.start();
            // Modulation for crackling effect
            const modOsc = ctx.createOscillator();
            modOsc.frequency.value = 5;
            modOsc.type = 'sine';
            const modGain = ctx.createGain();
            modGain.gain.value = 50;
            modOsc.connect(modGain);
            modGain.connect(osc1.frequency);
            modOsc.start();
            this.fireOscillator = osc1;
        } catch (e) {
            console.warn('Could not start fire ambience:', e);
        }
    }
    playSoundEffect(type) {
        if (!this.audioContext || this.isMuted) return;
        try {
            const ctx = this.audioContext;
            const now = ctx.currentTime;
            const gainNode = ctx.createGain();
            gainNode.connect(ctx.destination);
            gainNode.gain.value = this.masterVolume;
            switch(type){
                case 'throw':
                    {
                        const osc = ctx.createOscillator();
                        osc.frequency.setValueAtTime(400, now);
                        osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
                        osc.connect(gainNode);
                        gainNode.gain.setValueAtTime(0.1, now);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                        osc.start(now);
                        osc.stop(now + 0.1);
                        break;
                    }
                case 'hit':
                    {
                        const osc = ctx.createOscillator();
                        osc.frequency.setValueAtTime(600, now);
                        osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
                        osc.connect(gainNode);
                        gainNode.gain.setValueAtTime(0.15, now);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                        osc.start(now);
                        osc.stop(now + 0.15);
                        break;
                    }
                case 'accumulate':
                    {
                        const osc = ctx.createOscillator();
                        osc.frequency.setValueAtTime(200, now);
                        osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
                        osc.connect(gainNode);
                        gainNode.gain.setValueAtTime(0.05, now);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                        osc.start(now);
                        osc.stop(now + 0.2);
                        break;
                    }
                case 'gameOver':
                    {
                        const osc = ctx.createOscillator();
                        osc.frequency.setValueAtTime(300, now);
                        osc.frequency.exponentialRampToValueAtTime(100, now + 0.5);
                        osc.connect(gainNode);
                        gainNode.gain.setValueAtTime(0.2, now);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                        osc.start(now);
                        osc.stop(now + 0.5);
                        break;
                    }
            }
        } catch (e) {
            console.warn('Could not play sound effect:', e);
        }
    }
    setFireVolume(volume) {
        if (this.fireLoopGain) {
            this.fireLoopGain.gain.value = Math.max(0, volume * this.masterVolume * 0.2);
        }
    }
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.fireLoopGain) {
            this.fireLoopGain.gain.value = this.isMuted ? 0 : this.masterVolume * 0.2;
        }
    }
    isMutedState() {
        return this.isMuted;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/game/GameEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameEngine",
    ()=>GameEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$entities$2f$Snowflake$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/entities/Snowflake.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$entities$2f$Snowball$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/entities/Snowball.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$entities$2f$Cabin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/entities/Cabin.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/collision.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audio$2f$AudioManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/audio/AudioManager.ts [app-client] (ecmascript)");
;
;
;
;
;
class GameEngine {
    canvas;
    ctx;
    snowflakes = [];
    snowballs = [];
    cabin;
    score = 0;
    snowPileHeight = 0;
    maxSnowPileHeight = 100;
    isGameOver = false;
    spawnTimer = 0;
    spawnInterval = 120 // frames between spawns
    ;
    gameTime = 0;
    audioManager;
    onGameOver;
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.cabin = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$entities$2f$Cabin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cabin"](canvas.width / 2, canvas.height - 100);
        this.audioManager = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$audio$2f$AudioManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AudioManager"]();
        this.setupInput();
    }
    setupInput() {
        // Mouse/Touch input
        const handlePointerDown = (e)=>{
            if (this.isGameOver) return;
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.shootSnowball(x, y);
        };
        this.canvas.addEventListener('pointerdown', handlePointerDown);
    }
    shootSnowball(targetX, targetY) {
        const snowball = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$entities$2f$Snowball$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Snowball"](this.cabin.x, this.cabin.y, targetX, targetY);
        this.snowballs.push(snowball);
        this.audioManager.playSoundEffect('throw');
    }
    update() {
        if (this.isGameOver) return;
        this.gameTime++;
        // Spawn snowflakes
        this.spawnTimer++;
        const difficultyMultiplier = Math.min(1 + this.gameTime / 10000, 2);
        if (this.spawnTimer > this.spawnInterval / difficultyMultiplier) {
            this.spawnSnowflake();
            this.spawnTimer = 0;
        }
        // Update snowflakes
        for(let i = this.snowflakes.length - 1; i >= 0; i--){
            const snowflake = this.snowflakes[i];
            snowflake.update();
            // Check if hit ground
            if (snowflake.y >= this.canvas.height - 50) {
                this.snowPileHeight += snowflake.size;
                this.snowflakes.splice(i, 1);
                this.audioManager.playSoundEffect('accumulate');
            }
        }
        // Update snowballs
        for(let i = this.snowballs.length - 1; i >= 0; i--){
            const snowball = this.snowballs[i];
            snowball.update();
            // Check if off-screen
            if (snowball.x < 0 || snowball.x > this.canvas.width || snowball.y < 0 || snowball.y > this.canvas.height) {
                this.snowballs.splice(i, 1);
                continue;
            }
            // Check collisions with snowflakes
            for(let j = this.snowflakes.length - 1; j >= 0; j--){
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$collision$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCollision"])(snowball, this.snowflakes[j])) {
                    const points = this.snowflakes[j].getPoints();
                    this.score += points;
                    this.snowflakes.splice(j, 1);
                    this.snowballs.splice(i, 1);
                    this.audioManager.playSoundEffect('hit');
                    break;
                }
            }
        }
        // Update cabin
        this.cabin.update(this.getSnowPilePercent());
        // Check lose condition
        if (this.snowPileHeight >= this.maxSnowPileHeight) {
            this.isGameOver = true;
            this.audioManager.playSoundEffect('gameOver');
            this.onGameOver?.();
        }
        // Update audio based on snow pile
        this.audioManager.setFireVolume(1 - this.snowPileHeight / this.maxSnowPileHeight);
    }
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#1e3a5f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Render background
        this.renderBackground();
        // Render snowflakes
        this.ctx.fillStyle = '#ffffff';
        for (const snowflake of this.snowflakes){
            snowflake.render(this.ctx);
        }
        // Render snowballs
        for (const snowball of this.snowballs){
            snowball.render(this.ctx);
        }
        // Render snow pile
        this.renderSnowPile();
        // Render cabin
        this.cabin.render(this.ctx, this.getSnowPilePercent());
    }
    renderBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        const coldness = this.snowPileHeight / this.maxSnowPileHeight;
        gradient.addColorStop(0, `rgb(${30 + coldness * 20}, ${58 - coldness * 30}, ${95 + coldness * 30})`);
        gradient.addColorStop(1, `rgb(${20 + coldness * 10}, ${40 - coldness * 20}, ${70 + coldness * 30})`);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    renderSnowPile() {
        const pileHeight = this.snowPileHeight / this.maxSnowPileHeight * (this.canvas.height / 3);
        this.ctx.fillStyle = '#f8f8ff';
        this.ctx.fillRect(0, this.canvas.height - pileHeight, this.canvas.width, pileHeight);
    }
    spawnSnowflake() {
        const x = Math.random() * this.canvas.width;
        const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
        const snowflake = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$entities$2f$Snowflake$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Snowflake"](x, -20, size);
        this.snowflakes.push(snowflake);
    }
    getScore() {
        return this.score;
    }
    getSnowPilePercent() {
        return Math.min(this.snowPileHeight / this.maxSnowPileHeight, 1);
    }
    toggleAudio() {
        this.audioManager.toggleMute();
    }
    isMuted() {
        return this.audioManager.isMutedState();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/GameHUD.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameHUD
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function GameHUD({ score, snowPilePercent, isMuted, onMuteToggle }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-start text-white pointer-events-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-black bg-opacity-50 rounded-lg p-4 pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-semibold text-gray-300",
                        children: "SCORE"
                    }, void 0, false, {
                        fileName: "[project]/components/GameHUD.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-4xl font-bold text-white",
                        children: Math.floor(score)
                    }, void 0, false, {
                        fileName: "[project]/components/GameHUD.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/GameHUD.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onMuteToggle,
                className: "bg-black bg-opacity-50 rounded-lg p-4 pointer-events-auto hover:bg-opacity-70 transition",
                title: isMuted ? 'Unmute' : 'Mute',
                children: isMuted ? '🔇' : '🔊'
            }, void 0, false, {
                fileName: "[project]/components/GameHUD.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 bg-black bg-opacity-50 rounded-lg p-4 pointer-events-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-semibold text-gray-300 mb-2",
                        children: "SNOW LEVEL"
                    }, void 0, false, {
                        fileName: "[project]/components/GameHUD.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-48 h-6 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-gradient-to-r from-blue-400 to-red-500 transition-all duration-200",
                            style: {
                                width: `${snowPilePercent * 100}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/GameHUD.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/GameHUD.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400 mt-1 text-right",
                        children: [
                            Math.floor(snowPilePercent * 100),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/GameHUD.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/GameHUD.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/GameHUD.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = GameHUD;
var _c;
__turbopack_context__.k.register(_c, "GameHUD");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/GameOver.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameOverScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function GameOverScreen({ score, onPlayAgain }) {
    _s();
    const [playerName, setPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [leaderboardScores, setLeaderboardScores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleSubmitScore = async (e)=>{
        e.preventDefault();
        if (!playerName.trim()) return;
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerName: playerName.substring(0, 10),
                    score
                })
            });
            if (response.ok) {
                setSubmitted(true);
                // Fetch updated leaderboard
                const leaderboardResponse = await fetch('/api/leaderboard');
                const data = await leaderboardResponse.json();
                setLeaderboardScores(data.scores);
            }
        } catch (error) {
            console.error('Failed to submit score:', error);
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-800 bg-opacity-90 rounded-2xl p-8 max-w-md w-full text-center border-2 border-red-500",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold text-white mb-6",
                    children: "Game Over"
                }, void 0, false, {
                    fileName: "[project]/components/GameOver.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-700 rounded-lg p-6 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-300 text-sm mb-2",
                            children: "Final Score"
                        }, void 0, false, {
                            fileName: "[project]/components/GameOver.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-5xl font-bold text-white",
                            children: Math.floor(score)
                        }, void 0, false, {
                            fileName: "[project]/components/GameOver.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/GameOver.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                !submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-300 mb-4",
                            children: "Great score! Make it to the leaderboard!"
                        }, void 0, false, {
                            fileName: "[project]/components/GameOver.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmitScore,
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: playerName,
                                    onChange: (e)=>setPlayerName(e.target.value.substring(0, 10)),
                                    placeholder: "Your name (max 10 chars)",
                                    maxLength: 10,
                                    className: "w-full px-4 py-3 rounded-lg mb-4 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500",
                                    disabled: isSubmitting
                                }, void 0, false, {
                                    fileName: "[project]/components/GameOver.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !playerName.trim() || isSubmitting,
                                    className: "w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-transform hover:scale-105",
                                    children: isSubmitting ? 'Submitting...' : 'Submit Score'
                                }, void 0, false, {
                                    fileName: "[project]/components/GameOver.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/GameOver.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-green-400 font-bold mb-4",
                            children: "✓ Score submitted!"
                        }, void 0, false, {
                            fileName: "[project]/components/GameOver.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-700 rounded-lg p-4 text-left max-h-48 overflow-y-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-white mb-3",
                                    children: "Leaderboard"
                                }, void 0, false, {
                                    fileName: "[project]/components/GameOver.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2 text-sm",
                                    children: leaderboardScores.map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex justify-between text-gray-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        idx + 1,
                                                        ". ",
                                                        entry.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/GameOver.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: entry.score
                                                }, void 0, false, {
                                                    fileName: "[project]/components/GameOver.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/components/GameOver.tsx",
                                            lineNumber: 82,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/GameOver.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/GameOver.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/GameOver.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onPlayAgain,
                    className: "w-full px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg transition-transform hover:scale-105",
                    children: "Play Again"
                }, void 0, false, {
                    fileName: "[project]/components/GameOver.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/GameOver.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/GameOver.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(GameOverScreen, "xH3dfV3JNWcd+/UgOMpTN7ZsfTY=");
_c = GameOverScreen;
var _c;
__turbopack_context__.k.register(_c, "GameOverScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/GameCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$GameEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/game/GameEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GameHUD$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GameHUD.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GameOver$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GameOver.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function GameCanvas({ onGameOver }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gameEngineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isGameOver, setIsGameOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [snowPilePercent, setSnowPilePercent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameCanvas.useEffect": ()=>{
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            // Set canvas size
            const setCanvasSize = {
                "GameCanvas.useEffect.setCanvasSize": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["GameCanvas.useEffect.setCanvasSize"];
            setCanvasSize();
            window.addEventListener('resize', setCanvasSize);
            // Initialize game engine
            const gameEngine = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$game$2f$GameEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameEngine"](canvas, ctx);
            gameEngineRef.current = gameEngine;
            // Handle game over
            const handleGameOver = {
                "GameCanvas.useEffect.handleGameOver": ()=>{
                    setIsGameOver(true);
                    setScore(gameEngine.getScore());
                }
            }["GameCanvas.useEffect.handleGameOver"];
            gameEngine.onGameOver = handleGameOver;
            // Game loop
            let animationFrameId;
            const gameLoop = {
                "GameCanvas.useEffect.gameLoop": ()=>{
                    gameEngine.update();
                    gameEngine.render();
                    setScore(gameEngine.getScore());
                    setSnowPilePercent(gameEngine.getSnowPilePercent());
                    animationFrameId = requestAnimationFrame(gameLoop);
                }
            }["GameCanvas.useEffect.gameLoop"];
            animationFrameId = requestAnimationFrame(gameLoop);
            return ({
                "GameCanvas.useEffect": ()=>{
                    window.removeEventListener('resize', setCanvasSize);
                    cancelAnimationFrame(animationFrameId);
                }
            })["GameCanvas.useEffect"];
        }
    }["GameCanvas.useEffect"], []);
    const handleMuteToggle = ()=>{
        setIsMuted(!isMuted);
        if (gameEngineRef.current) {
            gameEngineRef.current.toggleAudio();
        }
    };
    if (isGameOver) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GameOver$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            score: score,
            onPlayAgain: ()=>{
                setIsGameOver(false);
                onGameOver();
            }
        }, void 0, false, {
            fileName: "[project]/components/GameCanvas.tsx",
            lineNumber: 76,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-screen h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "block w-full h-full touch-none",
                onContextMenu: (e)=>e.preventDefault()
            }, void 0, false, {
                fileName: "[project]/components/GameCanvas.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GameHUD$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                score: score,
                snowPilePercent: snowPilePercent,
                isMuted: isMuted,
                onMuteToggle: handleMuteToggle
            }, void 0, false, {
                fileName: "[project]/components/GameCanvas.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/GameCanvas.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(GameCanvas, "/t3CnqogNYLIwEaWE6PlCHFAVy0=");
_c = GameCanvas;
var _c;
__turbopack_context__.k.register(_c, "GameCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Leaderboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Leaderboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function Leaderboard() {
    _s();
    const [scores, setScores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Leaderboard.useEffect": ()=>{
            const fetchLeaderboard = {
                "Leaderboard.useEffect.fetchLeaderboard": async ()=>{
                    try {
                        const response = await fetch('/api/leaderboard');
                        if (!response.ok) throw new Error('Failed to fetch leaderboard');
                        const data = await response.json();
                        setScores(data.scores || []);
                    } catch (err) {
                        setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
                    } finally{
                        setLoading(false);
                    }
                }
            }["Leaderboard.useEffect.fetchLeaderboard"];
            fetchLeaderboard();
        }
    }["Leaderboard.useEffect"], []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-gray-400 text-center py-4",
            children: "Loading leaderboard..."
        }, void 0, false, {
            fileName: "[project]/components/Leaderboard.tsx",
            lineNumber: 33,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-red-400 text-center py-4",
            children: error
        }, void 0, false, {
            fileName: "[project]/components/Leaderboard.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, this);
    }
    if (scores.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-gray-400 text-center py-4",
            children: "No scores yet. Be the first!"
        }, void 0, false, {
            fileName: "[project]/components/Leaderboard.tsx",
            lineNumber: 41,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-slate-600",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            children: scores.slice(0, 10).map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center p-2 rounded hover:bg-slate-600 hover:bg-opacity-30 transition",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold text-gray-400 w-6",
                                    children: idx + 1
                                }, void 0, false, {
                                    fileName: "[project]/components/Leaderboard.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-white font-semibold truncate",
                                    children: entry.name
                                }, void 0, false, {
                                    fileName: "[project]/components/Leaderboard.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Leaderboard.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-lg font-bold text-orange-400",
                            children: entry.score
                        }, void 0, false, {
                            fileName: "[project]/components/Leaderboard.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this)
                    ]
                }, idx, true, {
                    fileName: "[project]/components/Leaderboard.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/Leaderboard.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Leaderboard.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(Leaderboard, "8xdFAJHyjITTkENrSEQ/tkc91vQ=");
_c = Leaderboard;
var _c;
__turbopack_context__.k.register(_c, "Leaderboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/MainMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Leaderboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Leaderboard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MainMenu({ onStart }) {
    _s();
    const [weatherMessage, setWeatherMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MainMenu.useEffect": ()=>{
            // Fetch weather message
            const fetchWeather = {
                "MainMenu.useEffect.fetchWeather": async ()=>{
                    try {
                        const position = await new Promise({
                            "MainMenu.useEffect.fetchWeather": (resolve, reject)=>{
                                navigator.geolocation.getCurrentPosition({
                                    "MainMenu.useEffect.fetchWeather": (pos)=>resolve(pos.coords)
                                }["MainMenu.useEffect.fetchWeather"], {
                                    "MainMenu.useEffect.fetchWeather": ()=>reject('Location denied')
                                }["MainMenu.useEffect.fetchWeather"]);
                            }
                        }["MainMenu.useEffect.fetchWeather"]);
                        const response = await fetch(`/api/weather?lat=${position.latitude}&lon=${position.longitude}`);
                        const data = await response.json();
                        setWeatherMessage(data.message || '');
                    } catch (error) {
                        setWeatherMessage('🌨️ Let\'s defend against the snow!');
                    } finally{
                        setLoading(false);
                    }
                }
            }["MainMenu.useEffect.fetchWeather"];
            fetchWeather();
        }
    }["MainMenu.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-between w-full h-full bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 p-4 md:p-8 overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col items-center justify-center w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-6 md:mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg",
                                children: "Snowcrastination"
                            }, void 0, false, {
                                fileName: "[project]/components/MainMenu.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base md:text-xl text-blue-100 mb-4",
                                children: "Defend your cabin from the falling snow"
                            }, void 0, false, {
                                fileName: "[project]/components/MainMenu.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-blue-200 text-sm",
                                children: "Loading weather..."
                            }, void 0, false, {
                                fileName: "[project]/components/MainMenu.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this) : weatherMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-800 bg-opacity-50 rounded-lg p-3 md:p-4 mb-6 border-2 border-blue-400",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg md:text-xl text-white",
                                    children: weatherMessage
                                }, void 0, false, {
                                    fileName: "[project]/components/MainMenu.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MainMenu.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MainMenu.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onStart,
                        className: "px-6 md:px-8 py-3 md:py-4 mb-6 md:mb-8 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform active:scale-95",
                        children: "Start Game"
                    }, void 0, false, {
                        fileName: "[project]/components/MainMenu.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-md mb-6 md:mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 text-center",
                                children: "🏆 Top Players"
                            }, void 0, false, {
                                fileName: "[project]/components/MainMenu.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Leaderboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/components/MainMenu.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MainMenu.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MainMenu.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full text-center pt-4 md:pt-8 border-t border-slate-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://buymeacoffee.com",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-block px-6 py-2 md:py-3 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg shadow-md transform hover:scale-105 transition-transform active:scale-95",
                    children: "☕ Buy Me a Hot Chocolate"
                }, void 0, false, {
                    fileName: "[project]/components/MainMenu.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MainMenu.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MainMenu.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(MainMenu, "7TwgIh4Q5aO/x+3Rxq8KlXRNKCw=");
_c = MainMenu;
var _c;
__turbopack_context__.k.register(_c, "MainMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GameCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MainMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MainMenu.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Home() {
    _s();
    const [gameStarted, setGameStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Prevent scrolling and zoom on mobile
            const preventZoom = {
                "Home.useEffect.preventZoom": (e)=>{
                    if (e.touches.length > 1) {
                        e.preventDefault();
                    }
                }
            }["Home.useEffect.preventZoom"];
            const preventDefault = {
                "Home.useEffect.preventDefault": (e)=>{
                    e.preventDefault();
                }
            }["Home.useEffect.preventDefault"];
            document.addEventListener('touchmove', preventZoom, {
                passive: false
            });
            document.addEventListener('wheel', preventDefault, {
                passive: false
            });
            return ({
                "Home.useEffect": ()=>{
                    document.removeEventListener('touchmove', preventZoom);
                    document.removeEventListener('wheel', preventDefault);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-screen h-screen bg-slate-900 overflow-hidden",
        children: !gameStarted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MainMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onStart: ()=>setGameStarted(true)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 34,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GameCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onGameOver: ()=>setGameStarted(false)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 36,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(Home, "QpYlUCTy2gi1EYCl8i1Ptm35ARY=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_c37fb36d._.js.map