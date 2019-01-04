import React, { Component } from "react";
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from "bizcharts";

const data = [
    { genre: "Snack", sold: 275, income: 2300 },
    { genre: "Beverage", sold: 115, income: 667 },
    { genre: "Candy", sold: 120, income: 982 },
    { genre: "Biscuit", sold: 350, income: 5271 },
    { genre: "Other", sold: 150, income: 3710 }
];

const cols = {
    sold: { alias: "sold" },
    genre: { alias: "genre" }
};

class Statistik extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <div className="layout-content">
                    <Chart data={data} scale={cols} className="chart-position">
                        <Axis name="genre" />
                        <Axis name="sold" />
                        <Legend position="top" dy={-20} />
                        <Tooltip />
                        <Geom
                            type="interval"
                            position="genre*sold"
                            color="genre"
                        />
                    </Chart>
                </div>
            </React.Fragment>
        );
    }
}

export { Statistik };
