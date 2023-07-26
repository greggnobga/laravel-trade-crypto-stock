/** Vendor. */
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
    /** Define chart options. */
    const config = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        scales: {
            y: {
                max: 160000,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };
    /** Return something. */
    return <Bar data={props.data} options={config} />;
};

export default BarChart;
