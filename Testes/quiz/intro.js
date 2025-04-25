
let nivel = 1;
let pontos = 0;
let vidas = 3;
const narrativa = document.getElementById("narrativa");
const respostas = document.getElementById("respostas");
const status = document.getElementById("status");
const feedback = document.getElementById("feedback");


const niveis = {
  1: { texto: "Qual é o grau do polinômio 3x² + 2x + 1?", opcoes: [
    { texto: "2", correto: true }, { texto: "3", correto: false }, { texto: "1", correto: false }] },
  2: { texto: "O que é um monômio?", opcoes: [
    { texto: "Um polinômio com um termo", correto: true }, { texto: "Um polinômio com dois termos", correto: false }] },
  3: { texto: "Qual é o coeficiente de x em 5x + 3?", opcoes: [
    { texto: "5", correto: true }, { texto: "3", correto: false }] },
  4: { texto: "O que é o termo independente de x² + 2x + 5?", opcoes: [
    { texto: "5", correto: true }, { texto: "2", correto: false }] },
  5: { texto: "Qual operação elimina o termo x de x - x?", opcoes: [
    { texto: "Subtração", correto: true }, { texto: "Divisão", correto: false }] },
  6: { texto: "Polinômios são sempre expressões com:", opcoes: [
    { texto: "Potências inteiras não negativas", correto: true }, { texto: "Números negativos", correto: false }] },
  7: { texto: "Qual é o polinômio reduzido de x + x + x?", opcoes: [
    { texto: "3x", correto: true }, { texto: "x³", correto: false }] }
};


function atualizarStatus() {
  status.innerHTML = `<p><strong>Nível:</strong> ${nivel} | <strong>Pontos:</strong> ${pontos} | <strong>Vidas:</strong> ${vidas}</p>`;
}
function carregarNivel() {
  atualizarStatus();
  respostas.innerHTML = "";
  feedback.innerHTML = "";
  if (vidas <= 0) {
    narrativa.innerHTML = `<p>💀 Game Over! Suas vidas acabaram.</p>`;
    return;
  }
  if (niveis[nivel]) {
    narrativa.innerHTML = `<p>${niveis[nivel].texto}</p>`;
    criarBotoes(niveis[nivel].opcoes);
  } else {
    narrativa.innerHTML = `<p>🎉 Parabéns! Você completou todos os desafios!</p>`;
  }
}
function criarBotoes(opcoes) {
  respostas.innerHTML = "";
  opcoes.forEach(opcao => {
    const btn = document.createElement("button");
    btn.textContent = opcao.texto;
    btn.onclick = () => verificarResposta(opcao.correto);
    respostas.appendChild(btn);
  });
}
function verificarResposta(correto) {
  if (correto) {
    pontos += 10;
    nivel += 1;
    feedback.innerHTML = "✅ Resposta correta! Muito bem!";
    carregarNivel();
  } else {
    vidas -= 1;
    feedback.innerHTML = "❌ Resposta incorreta. Tente novamente.";
    carregarNivel();
  }
}
carregarNivel();
