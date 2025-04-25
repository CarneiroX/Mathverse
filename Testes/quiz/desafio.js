
let nivel = 1;
let pontos = 0;
let vidas = 3;
const narrativa = document.getElementById("narrativa");
const respostas = document.getElementById("respostas");
const status = document.getElementById("status");
const feedback = document.getElementById("feedback");


const niveis = {
  1: { texto: "Resolva: (x + 2)(x - 3)", opcoes: [
    { texto: "x² - x - 6", correto: true }, { texto: "x² + x - 6", correto: false }] },
  2: { texto: "Qual é o resto da divisão de x² - 1 por x - 1?", opcoes: [
    { texto: "0", correto: true }, { texto: "1", correto: false }] },
  3: { texto: "O que é um polinômio completo?", opcoes: [
    { texto: "Contém todos os graus até seu maior grau", correto: true }, { texto: "Só tem termos pares", correto: false }] },
  4: { texto: "Se P(x) = x² + 2x + 1, então P(-1) =", opcoes: [
    { texto: "0", correto: true }, { texto: "1", correto: false }] },
  5: { texto: "Coeficientes de 2x³ - x² + 0x + 7 são:", opcoes: [
    { texto: "2, -1, 0, 7", correto: true }, { texto: "2, 1, 7", correto: false }] },
  6: { texto: "O produto notável de (x+3)² é:", opcoes: [
    { texto: "x² + 6x + 9", correto: true }, { texto: "x² + 9", correto: false }] },
  7: { texto: "Qual a soma de (x² + 1) e (2x² + 3)?", opcoes: [
    { texto: "3x² + 4", correto: true }, { texto: "2x² + 3", correto: false }] },
  8: { texto: "A equação x² + 4x + 4 = 0 tem como raiz:", opcoes: [
    { texto: "-2", correto: true }, { texto: "2", correto: false }] },
  9: { texto: "Reduza: 2x - 3x + 4", opcoes: [
    { texto: "-x + 4", correto: true }, { texto: "-x - 4", correto: false }] },
  10: { texto: "Polinômio nulo é aquele que:", opcoes: [
    { texto: "Todos os coeficientes são zero", correto: true }, { texto: "Não tem grau", correto: false }] },
  11: { texto: "Divisão de x³ por x resulta em:", opcoes: [
    { texto: "x²", correto: true }, { texto: "x", correto: false }] },
  12: { texto: "Produto de (x - 1)(x + 1):", opcoes: [
    { texto: "x² - 1", correto: true }, { texto: "x² + 1", correto: false }] }
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
