import React from "react";
import PropTypes from "prop-types";
import StatisticView from "./StatisticView";
import { connect } from "react-redux";
import { LOGREPORT_LIST } from "../../../redux/action/types";
import request from "../../../redux/request";
import { NavigationBar } from "../../componentIndex";

class Statistic extends React.Component {
    render() {
        const { user, token, getListReport, listReport } = this.props;

        return (
            <React.Fragment>
                <NavigationBar />
                <StatisticView
                    user={user}
                    token={token}
                    getListReport={getListReport}
                    listReport={listReport}
                />
            </React.Fragment>
        );
    }
}

Statistic.PropTypes = {
    user: PropTypes.any,
    token: PropTypes.string,
    listReport: PropTypes.any
};

Statistic.defaultProps = {
    user: {},
    token: "",
    listReport: []
};

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    listReport: state.log.listLogReport
});

const mapDispatchToProps = dispatch => ({
    getListReport: () =>
        dispatch({
            type: LOGREPORT_LIST,
            payload: request.log.logReport()
        })
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Statistic);

export { connected as Statistic };
