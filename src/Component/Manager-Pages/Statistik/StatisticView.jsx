import React from "react";
import _ from "lodash";

class Statistic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSell: []
        };
        this.setDataSell = this.setDataSell.bind(this);
    }

    setDataSell() {
        const { listReport } = this.props;
    }

    componentDidMount() {
        this.props.getListReport();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
        }
    }

    render() {
        console.log(this.props.listReport);
        return <React.Fragment />;
    }
}

export default Statistic;
