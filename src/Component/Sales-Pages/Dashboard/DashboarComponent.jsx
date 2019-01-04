import React from "react";
import PropTypes from "prop-types";
import DashboardView from "./DashboardView";
import { connect } from "react-redux";
import { LIST_PRODUCT } from "../../../redux/action/types";
import request from "../../../redux/request";
import { NavigationBar } from "../../NavigationBar/NavigationBarComponent";

class Dashboard extends React.Component {
    render() {
        const { user, token, getListProduct, listProduct } = this.props;

        return (
            <React.Fragment>
                <NavigationBar />
                <DashboardView
                    user={user}
                    token={token}
                    getListProduct={getListProduct}
                    listProduct={listProduct}
                />
            </React.Fragment>
        );
    }
}

Dashboard.PropTypes = {
    user: PropTypes.any,
    token: PropTypes.string,
    listProduct: PropTypes.any
};

Dashboard.defaultProps = {
    user: {},
    token: "",
    listProduct: []
};

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
    listProduct: state.product.listProduct
});

const mapDispatchToProps = dispatch => ({
    getListProduct: () =>
        dispatch({
            type: LIST_PRODUCT,
            payload: request.product.getListProduct()
        })
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export { connected as DashboardSales };
