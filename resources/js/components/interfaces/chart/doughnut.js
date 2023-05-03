/** Vendor. */
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
    /** Define chart options. */
    const config = {
        responsive: true,
        maintainAspectRatio: true,
        cutout: 70,
        circumference: 360,
        radius: "85%",
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };
    /** Return something. */
    return <Doughnut data={props.data} options={config} />;
};

export default DoughnutChart;
