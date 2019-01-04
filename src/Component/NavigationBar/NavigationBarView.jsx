import React, { Component } from "react";
import { Avatar } from "antd";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

class NavigationBarView extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleCollapse = this.toggle.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.state = {
            isOpen: false,
            isCollapsed: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleCollapse() {
        this.state({
            isCollapsed: !this.state.isCollapsed
        });
    }
    getHideStyle() {
        let styles = "styles.";
        styles += this.state.isOpen === 0 ? "hide" : "nhide";
        return styles;
    }

    onClickLogout() {
        console.log("logout clicked");
        this.props.tryLogout();
        console.log("proses logout finished");
    }

    render() {
        const styles = {
            tinggi: {
                height: "auto"
            },
            hide: {
                visibility: "hidden"
            },
            nHide: {
                visibility: "visible"
            }
        };

        return (
            <React.Fragment>
                <Navbar className="bg-cl-bl mobile-nav" dark expand="md">
                    <span className="border-right-op">
                        <NavbarBrand className="navBarTitle" href="/">
                            AuditGoods
                        </NavbarBrand>
                    </span>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-2 ml-auto mt-2 " navbar>
                            <NavItem>
                                <NavLink href="/owner/statistik">
                                    STATISTIC
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/owner/validation">
                                    PERMISSION
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/owner/report" className="mr-2">
                                    REPORT
                                </NavLink>
                            </NavItem>

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <Avatar />
                                    &nbsp;&nbsp;User&nbsp;
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.onClickLogout}>
                                        LOGOUT
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default NavigationBarView;
