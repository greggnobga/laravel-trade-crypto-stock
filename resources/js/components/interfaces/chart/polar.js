/** Vendor. */
import { PolarArea } from "react-chartjs-2";

const PolarChart = (props) => {
    /** Define chart options. */
    const config = {
        responsive: true,
        maintainAspectRatio: true,
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
                    usePointStyle: true,
                    pointStyle: "rect",
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };
    /** Return something. */
    return <PolarArea data={props.data} options={config} />;
};

export default PolarChart;
