import React from "react";
import DashboardManagerView from "./DashboardManagerView";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import request from "../../../redux/request";
import {
    LIST_PRODUCT,
    NEW_PRODUCT,
    GET_PRODUCT,
    AUTH_LOGOUT,
    UPDATE_PRODUCT
} from "../../../redux/action/types";
import { NavigationBar } from "../../componentIndex";

class DashboardManager extends React.Component {
    render() {
        const {
            getListProduct,
            addProduct,
            loginStatus,
            token,
            tryLogout,
            listProduct,
            statusCode,
            getProduct,
            product,
            updateProduct
        } = this.props;
        return (
            <React.Fragment>
                <NavigationBar />
                <DashboardManagerView
                    loginStatus={loginStatus}
                    getListProduct={getListProduct}
                    token={token}
                    addProduct={addProduct}
                    tryLogout={tryLogout}
                    listProduct={listProduct}
                    statusCode={statusCode}
                    getProduct={getProduct}
                    product={product}
                    updateProduct={updateProduct}
                />
            </React.Fragment>
        );
    }
}

DashboardManager.propTypes = {
    loginStatus: PropTypes.bool,
    listProduct: PropTypes.any,
    getProduct: PropTypes.func,
    addProduct: PropTypes.any,
    token: PropTypes.string,
    tryLogin: PropTypes.any,
    statusCode: PropTypes.any,
    item: PropTypes.any
};

DashboardManager.defaultProps = {
    listProduct: [],
    token: "",
    statusCode: "",
    product: {}
};

const mapStateToProps = state => ({
    listProduct: state.product.listProduct,
    token: state.auth.token,
    loginStatus: state.auth.loginStatus,
    product: state.product.product
});

const mapDispatchToProps = dispatch => ({
    getListProduct: () =>
        dispatch({
            type: LIST_PRODUCT,
            payload: request.product.getListProduct()
        }),
    addProduct: data =>
        dispatch({
            type: NEW_PRODUCT,
            payload: request.product.addProduct(data)
        }),
    tryLogout: () =>
        dispatch({
            type: AUTH_LOGOUT
        }),
    getProduct: id =>
        dispatch({
            type: GET_PRODUCT,
            payload: request.product.getProduct(id)
        }),
    updateProduct: (id, data) =>
        dispatch({
            type: UPDATE_PRODUCT,
            payload: request.product.updateProduct(id, data)
        })
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardManager);

export { connected as DashboardManager };
