fetch("game_trends.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("chartContainer");

    Object.entries(data).forEach(([game, trendData], index) => {
      const card = document.createElement("div");
      card.className = "card";
      
      const canvas = document.createElement("canvas");
      canvas.id = `chart${index}`;
      card.appendChild(canvas);
      container.appendChild(card);

      const ctx = canvas.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: trendData.length }, (_, i) => `Day ${i + 1}`),
          datasets: [{
            label: game,
            data: trendData,
            borderColor: `hsl(${(index * 47) % 360}, 80%, 60%)`,
            backgroundColor: 'transparent',
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#222',
              titleColor: '#fff',
              bodyColor: '#ccc'
            }
          },
          scales: {
            x: {
              ticks: { color: '#888' },
              grid: { color: '#222' }
            },
            y: {
              ticks: { color: '#888' },
              grid: { color: '#222' },
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }
      });
    });
  });
