// ==============================
// SCRATCH CARD
// Part 1 - Variables
// ==============================

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d", {
    willReadFrequently: true
});

const wrapper = document.querySelector(".scratch-wrapper");
const hiddenContent = document.getElementById("hiddenContent");

let isDrawing = false;
let revealed = false;
// ==============================
// Part 2 - Resize Canvas
// ==============================

function resizeCanvas() {

    const rect = wrapper.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

}

resizeCanvas();

window.addEventListener("resize", () => {

    resizeCanvas();
    drawCover();

});
// ==============================
// Part 3 - Draw Cover
// ==============================

function drawCover() {

    const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
    );

    gradient.addColorStop(0, "#7C3AED");
    gradient.addColorStop(0.5, "#EC4899");
    gradient.addColorStop(1, "#FBBF24");

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "rgba(255,255,255,.95)";

    ctx.font = "bold 30px Be Vietnam Pro";

    ctx.textAlign = "center";

    ctx.fillText(
        "CÀO THẺ NÀY",
        canvas.width / 2,
        canvas.height / 2 - 10
    );

    ctx.font = "20px Be Vietnam Pro";

    ctx.fillText(
        "ĐỂ NHẬN THÔNG ĐIỆP",
        canvas.width / 2,
        canvas.height / 2 + 35
    );

}

drawCover();
