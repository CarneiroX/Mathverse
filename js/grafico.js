let grafico;

function atualizarGrafico() {
  const valoresX = document.getElementById("valoresX").value.split(',').map(Number);
  const valoresY = document.getElementById("valoresY").value.split(',').map(Number);
  const valoresY2 = document.getElementById("valoresY2").value.split(',').map(Number);
  const tipo = document.getElementById("tipoGrafico").value;
  const nomeEixoX = document.getElementById("nomeEixoX").value || 'X';
  const nomeEixoY = document.getElementById("nomeEixoY").value || 'Y';

  if (grafico) grafico.destroy();

  const ctx = document.getElementById('meuGrafico').getContext('2d');

  const datasets = [];

  datasets.push({
    label: 'Série 1',
    data: tipo === 'scatter' ? valoresX.map((x, i) => ({ x, y: valoresY[i] })) : valoresY,
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    borderWidth: 2,
    fill: false,
    tension: 0.3
  });

  if (valoresY2.length > 0 && valoresY2.every(x => !isNaN(x))) {
    datasets.push({
      label: 'Série 2',
      data: tipo === 'scatter' ? valoresX.map((x, i) => ({ x, y: valoresY2[i] })) : valoresY2,
      backgroundColor: '#FFC107',
      borderColor: '#FFC107',
      borderWidth: 2,
      fill: false,
      tension: 0.3
    });
  }

  grafico = new Chart(ctx, {
    type: tipo,
    data: {
      labels: tipo === 'scatter' ? undefined : valoresX,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Gráfico Interativo'
        }
      },
      scales: tipo === 'scatter' ? {
        x: { type: 'linear', position: 'bottom', title: { display: true, text: nomeEixoX } },
        y: { beginAtZero: true, title: { display: true, text: nomeEixoY } }
      } : {
        x: { title: { display: true, text: nomeEixoX } },
        y: { beginAtZero: true, title: { display: true, text: nomeEixoY } }
      }
    }
  });
}

function salvarImagem() {
  const link = document.createElement('a');
  link.download = 'grafico.png';
  link.href = document.getElementById('meuGrafico').toDataURL('image/png');
  link.click();
}

function exportarCSV() {
  const x = document.getElementById("valoresX").value.split(',');
  const y = document.getElementById("valoresY").value.split(',');
  const y2 = document.getElementById("valoresY2").value.split(',');
  let csv = 'X,Série 1,Série 2\n';
  for (let i = 0; i < x.length; i++) {
    csv += `${x[i]},${y[i] || ''},${y2[i] || ''}\n`;
  }
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "dados.csv";
  link.click();
}
