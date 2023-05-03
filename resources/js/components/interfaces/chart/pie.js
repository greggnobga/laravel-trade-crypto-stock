/** Vendor. */
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
    /** Define chart options. */
    const config = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: "right",
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
    return <Pie data={props.data} options={config} />;
};

export default PieChart;
