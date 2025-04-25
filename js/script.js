function atualizarGrafico() {
    const valoresX = document.getElementById("valoresX").value.split(',').map(Number);
    const valoresY = document.getElementById("valoresY").value.split(',').map(Number);
    const valoresY2 = document.getElementById("valoresY2").value.split(',').map(Number);
    const tipo = document.getElementById("tipoGrafico").value;
    const cor1 = document.getElementById("cor1").value;
    const cor2 = document.getElementById("cor2").value;
    const nomeEixoX = document.getElementById("nomeEixoX").value || "X";
    const nomeEixoY = document.getElementById("nomeEixoY").value || "Y";
  
    if (grafico) grafico.destroy();
  
    const ctx = document.getElementById('meuGrafico').getContext('2d');
  
    const datasets = [];
  
    datasets.push({
      label: 'Série 1',
      data: tipo === 'scatter' ? valoresX.map((x, i) => ({ x, y: valoresY[i] })) : valoresY,
      backgroundColor: cor1 + '88',
      borderColor: cor1,
      borderWidth: 2,
      fill: false,
      tension: 0.3
    });
  
    if (valoresY2.length > 0 && valoresY2.every(x => !isNaN(x))) {
      datasets.push({
        label: 'Série 2',
        data: tipo === 'scatter' ? valoresX.map((x, i) => ({ x, y: valoresY2[i] })) : valoresY2,
        backgroundColor: cor2 + '88',
        borderColor: cor2,
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
            text: 'Seu Gráfico Interativo'
          }
        },
        scales: tipo === 'scatter' ? {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: nomeEixoX
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: nomeEixoY
            }
          }
        } : {
          x: {
            title: {
              display: true,
              text: nomeEixoX
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: nomeEixoY
            }
          }
        }
      }
    });
  }
  