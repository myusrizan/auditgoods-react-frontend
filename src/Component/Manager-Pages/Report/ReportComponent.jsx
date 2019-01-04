import React from "react";
import PropTypes from "prop-types";
import ReportView from "./ReportView";
import { connect } from "react-redux";
import { LOGREPORT_LIST } from "../../../redux/action/types";
import request from "../../../redux/request";
import { NavigationBar } from "../../componentIndex";

class Report extends React.Component {
    render() {
        const { user, token, getListLogReport, listLogReport } = this.props;

        return (
            <React.Fragment>
                <NavigationBar />
                <ReportView
                    user={user}
                    token={token}
                    getListLogReport={getListLogReport}
                    listLogReport={listLogReport}
                />
            </React.Fragment>
        );
    }
}

Report.PropTypes = {
    user: PropTypes.any,
    token: PropTypes.string,
    listLogReport: PropTypes.any
};

Report.defaultProps = {
    user: {},
    token: "",
    listLogReport: []
};

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    listLogReport: state.log.listLogReport
});

const mapDispatchToProps = dispatch => ({
    getListLogReport: () =>
        dispatch({
            type: LOGREPORT_LIST,
            payload: request.log.logReport()
        })
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Report);

export { connected as Report };
