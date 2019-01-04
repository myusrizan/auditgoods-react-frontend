import React from "react";
import PropTypes from "prop-types";
import RestockValView from "./RestockValView";
import { connect } from "react-redux";
import { LOGRESTOCK_LIST } from "../../../redux/action/types";
import request from "../../../redux/request";
import { NavigationBar } from "../../componentIndex";

class RestockVal extends React.Component {
    render() {
        const { user, token, getListLogRestock, listLogRestock } = this.props;

        return (
            <React.Fragment>
                <NavigationBar />
                <RestockValView
                    user={user}
                    token={token}
                    getListLogRestock={getListLogRestock}
                    listLogRestock={listLogRestock}
                />
            </React.Fragment>
        );
    }
}

RestockVal.PropTypes = {
    user: PropTypes.any,
    token: PropTypes.string,
    listLogRestock: PropTypes.any
};

RestockVal.defaultProps = {
    user: {},
    token: "",
    listLogRestock: []
};

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    listLogRestock: state.log.listLogRestock
});

const mapDispatchToProps = dispatch => ({
    getListLogRestock: () =>
        dispatch({
            type: LOGRESTOCK_LIST,
            payload: request.log.logRestock()
        })
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(RestockVal);

export { connected as RestockVal };
