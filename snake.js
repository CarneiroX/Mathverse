const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const TAM = 20;
const CELULA = 20;
let matriz, cobra, direcao, pontuacao, comida;
let intervalo = null;
let jogoIniciado = false;

function criarMatriz() {
  return Array.from({ length: TAM }, () => Array(TAM).fill(0));
}

function iniciarJogo() {
  if (!jogoIniciado) {
    jogoIniciado = true;
    document.getElementById("btn-iniciar").style.display = "none";
    document.getElementById("btn-reiniciar").style.display = "none"; 
    intervalo = setInterval(loopJogo, 200);
  }
}

function novaComida() {
  let i, j;
  do {
    i = Math.floor(Math.random() * TAM);
    j = Math.floor(Math.random() * TAM);
  } while (matriz[i][j] !== 0);
  matriz[i][j] = 9;
  comida = { x: j, y: i };
}

function resetarJogo() {
  matriz = criarMatriz();
  cobra = [{ x: 10, y: 10 }];
  direcao = { x: 1, y: 0 };
  pontuacao = 0;
  scoreEl.textContent = pontuacao;
  matriz[10][10] = 2;
  novaComida();
  clearInterval(intervalo);
  intervalo = null;
  jogoIniciado = false;
  document.getElementById("btn-iniciar").style.display = "inline-block";
  document.getElementById("btn-reiniciar").style.display = "none";
  desenhar(); 
}

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  for (let i = 0; i <= TAM; i++) {
    ctx.strokeStyle = "#111";
    ctx.beginPath();
    ctx.moveTo(0, i * CELULA);
    ctx.lineTo(TAM * CELULA, i * CELULA);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i * CELULA, 0);
    ctx.lineTo(i * CELULA, TAM * CELULA);
    ctx.stroke();
  }

  for (let i = 0; i < TAM; i++) {
    for (let j = 0; j < TAM; j++) {
      if (matriz[i][j] === 1) ctx.fillStyle = "green";
      else if (matriz[i][j] === 2) ctx.fillStyle = "red";
      else if (matriz[i][j] === 9) ctx.fillStyle = "yellow";
      else continue;
      ctx.fillRect(j * CELULA, i * CELULA, CELULA, CELULA);
    }
  }
}

function mover() {
  const cabeça = { ...cobra[0] };
  cabeça.x += direcao.x;
  cabeça.y += direcao.y;

  if (
    cabeça.x < 0 || cabeça.x >= TAM ||
    cabeça.y < 0 || cabeça.y >= TAM ||
    matriz[cabeça.y][cabeça.x] === 1
  ) {
    gameOver();
    return;
  }

  let comeu = matriz[cabeça.y][cabeça.x] === 9;
  cobra.unshift(cabeça);
  matriz[cabeça.y][cabeça.x] = 2;

  if (cobra.length > 1) {
    matriz[cobra[1].y][cobra[1].x] = 1;
  }

  if (!comeu) {
    const cauda = cobra.pop();
    matriz[cauda.y][cauda.x] = 0;
  } else {
    pontuacao++;
    scoreEl.textContent = pontuacao;
    novaComida();

    if (pontuacao % 5 === 0) {
      acelerar();
    }
  }
}

function acelerar() {
  let novoTempo = Math.max(50, 150 - pontuacao * 5);
  clearInterval(intervalo);
  intervalo = setInterval(loopJogo, novoTempo);
}

function loopJogo() {
  mover();
  desenhar();
}

function gameOver() {
  clearInterval(intervalo);
  alert("Game Over! Pontuação: " + pontuacao);
  jogoIniciado = false;
  document.getElementById("btn-reiniciar").style.display = "inline-block";
}

document.addEventListener("keydown", e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }
  const d = direcao;
  if ((e.key === "w" || e.key === "W") && d.y !== 1) direcao = { x: 0, y: -1 };
  else if ((e.key === "s" || e.key === "S") && d.y !== -1) direcao = { x: 0, y: 1 };
  else if ((e.key === "a" || e.key === "A") && d.x !== 1) direcao = { x: -1, y: 0 };
  else if ((e.key === "d" || e.key === "D") && d.x !== -1) direcao = { x: 1, y: 0 };
});

const btnInfo = document.getElementById("btn-info");
const tooltipContainer = document.querySelector(".tooltip-container");

btnInfo.addEventListener("click", () => {
  tooltipContainer.classList.toggle("active");
});
resetarJogo();