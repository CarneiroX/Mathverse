
let nivel = 1;
let pontos = 0;
let vidas = 3;
const narrativa = document.getElementById("narrativa");
const respostas = document.getElementById("respostas");
const status = document.getElementById("status");
const feedback = document.getElementById("feedback");


const niveis = {
  1: { texto: "Qual é o grau do polinômio 3x² + 2x + 1?", opcoes: [
    { texto: "2", correto: true }, { texto: "3", correto: false }] },
  2: { texto: "Polinômios são expressões com:", opcoes: [
    { texto: "Potências inteiras não negativas", correto: true }, { texto: "Números negativos", correto: false }] },
  3: { texto: "Resolva: (x + 2)(x - 3)", opcoes: [
    { texto: "x² - x - 6", correto: true }, { texto: "x² + x - 6", correto: false }] },
  4: { texto: "Coeficiente de x em 5x + 3 é:", opcoes: [
    { texto: "5", correto: true }, { texto: "3", correto: false }] },
  5: { texto: "Produto de (x - 1)(x + 1):", opcoes: [
    { texto: "x² - 1", correto: true }, { texto: "x² + 1", correto: false }] },
  6: { texto: "Se P(x) = x² + 2x + 1, P(-1) é:", opcoes: [
    { texto: "0", correto: true }, { texto: "1", correto: false }] },
  7: { texto: "Termo independente de x² + 2x + 5:", opcoes: [
    { texto: "5", correto: true }, { texto: "2", correto: false }] }
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
