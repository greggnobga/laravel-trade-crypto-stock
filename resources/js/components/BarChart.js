import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ items }) => {
  /** Use state. */
  const [exist, setExist] = useState(null);

  /** Use ref. */
  const container = useRef();

  /** Use effect. */
  useEffect(() => {
    if (!exist) {
      /** Return if no data. */
      if (items.length === 0) return;

      /** Declare config. */
      const config = {
        type: 'bar',
        data: {
          labels: items && items.map((item) => item.month),
          datasets: [
            {
              label: 'Capital Monthly Allocation',
              data: items && items.map((item) => item.capital),
              barPercentage: 0.75,
              barThickness: 10,
              maxBarThickness: 20,
              minBarLength: 2,
              axis: 'y',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              type: 'linear',
              beginAtZero: true,
            },
            x: {
              grid: {
                offset: true,
              },
            },
          },
        },
      };

      /** Declare canvas. */
      const canvas = container.current.getContext('2d');

      /** Create the canvas. */
      const chart = new Chart(canvas, config);

      /** Store the chart instance in state */
      setExist(chart);
    }
  }, [items, exist]);

  return (
    <div className='w-11/12 h-fit mx-auto'>
      <canvas ref={container} className='w-full h-full' />
    </div>
  );
};

export default BarChart;
