const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const wrapper = document.getElementById("scratch-wrapper");
const joinBtn = document.getElementById("joinBtn");

const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");

let drawing = false;
let unlocked = false;

let particles = [];

function resizeCanvas() {

    const rect = wrapper.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = 230;

    if (window.innerWidth < 420) {
        canvas.height = 180;
    } else if (window.innerWidth < 768) {
        canvas.height = 200;
    }

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

}
function drawCover() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
    );

    gradient.addColorStop(0, "#8E2DE2");
    gradient.addColorStop(.5, "#FF4FA3");
    gradient.addColorStop(1, "#FFC94A");

    ctx.fillStyle = gradient;
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "rgba(255,255,255,.18)";

    for (let i = 0; i < 70; i++) {

        ctx.beginPath();

        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 3 + 1,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

    ctx.fillStyle = "#fff";

    ctx.textAlign = "center";

    ctx.font = "700 34px sans-serif";

    ctx.fillText(
        "✨",
        canvas.width / 2,
        canvas.height / 2 - 35
    );

    ctx.font = "700 24px sans-serif";

    ctx.fillText(
        "CÀO THẺ NÀY",
        canvas.width / 2,
        canvas.height / 2 + 5
    );

    ctx.font = "600 18px sans-serif";

    ctx.fillText(
        "ĐỂ NHẬN THÔNG ĐIỆP",
        canvas.width / 2,
        canvas.height / 2 + 42
    );

    ctx.globalCompositeOperation = "destination-out";

}
function scratch(x, y) {

    if (unlocked) return;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        22,
        0,
        Math.PI * 2
    );

    ctx.fill();

}
function getPosition(event) {

    const rect = canvas.getBoundingClientRect();

    let clientX;
    let clientY;

    if (event.touches && event.touches.length) {

        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;

    } else {

        clientX = event.clientX;
        clientY = event.clientY;

    }

    return {

        x: (clientX - rect.left) * (canvas.width / rect.width),

        y: (clientY - rect.top) * (canvas.height / rect.height)

    };

}
function checkScratchPercent() {

    if (unlocked) return;

    const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const pixels = imageData.data;

    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {

        if (pixels[i] === 0) {

            transparent++;

        }

    }

    const percent = transparent / (canvas.width * canvas.height);

    if (percent > 0.60) {

        unlockReward();

    }

}
function unlockReward() {

    if (unlocked) return;

    unlocked = true;

    canvas.style.display = "none";

    joinBtn.classList.remove("hidden");

    launchConfetti();

}
function launchConfetti() {

    particles = [];

    for (let i = 0; i < 180; i++) {

        particles.push({

            x: Math.random() * confettiCanvas.width,

            y: -Math.random() * confettiCanvas.height,

            size: Math.random() * 8 + 4,

            speed: Math.random() * 4 + 2,

            angle: Math.random() * Math.PI * 2,

            rotate: Math.random() * 0.2 - 0.1,

            color: [
                "#FFD93D",
                "#FF6B6B",
                "#6BCBFF",
                "#B983FF",
                "#FFFFFF"
            ][Math.floor(Math.random() * 5)]

        });

    }

    animateConfetti();

}
function animateConfetti() {

    confettiCtx.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );

    particles.forEach(p => {

        p.y += p.speed;
        p.angle += p.rotate;

        confettiCtx.save();

        confettiCtx.translate(
            p.x,
            p.y
        );

        confettiCtx.rotate(p.angle);

        confettiCtx.fillStyle = p.color;

        confettiCtx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size * 0.6
        );

        confettiCtx.restore();

    });

    particles = particles.filter(
        p => p.y < confettiCanvas.height + 30
    );

    if (particles.length > 0) {

        requestAnimationFrame(
            animateConfetti
        );

    }

}
resizeCanvas();
drawCover();

window.addEventListener("resize", () => {

    if (unlocked) return;

    resizeCanvas();
    drawCover();

});

canvas.addEventListener("mousedown", e => {

    drawing = true;

    const p = getPosition(e);

    scratch(p.x, p.y);

});

canvas.addEventListener("mousemove", e => {

    if (!drawing) return;

    const p = getPosition(e);

    scratch(p.x, p.y);

    checkScratchPercent();

});

window.addEventListener("mouseup", () => {

    drawing = false;

});

canvas.addEventListener("touchstart", e => {

    drawing = true;

    const p = getPosition(e);

    scratch(p.x, p.y);

});

canvas.addEventListener("touchmove", e => {

    e.preventDefault();

    if (!drawing) return;

    const p = getPosition(e);

    scratch(p.x, p.y);

    checkScratchPercent();

}, { passive: false });

window.addEventListener("touchend", () => {

    drawing = false;

});

joinBtn.addEventListener("click", () => {

    joinBtn.style.pointerEvents = "none";

});
