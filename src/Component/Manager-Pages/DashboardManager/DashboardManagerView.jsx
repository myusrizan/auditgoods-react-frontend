import React, { Component } from "react";
import {
    Table,
    Button,
    Layout,
    Modal,
    Input,
    InputNumber,
    Row,
    Col
} from "antd";
import request from "../../../redux/request";
import _ from "lodash";

const { Content } = Layout;
const confirm = Modal.confirm;

class DashboardManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            token: "",
            product: {},
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            data: {},
            item: {},
            confirmLoading: false
        };

        this.columns = [
            {
                title: "Nama Produk",
                dataIndex: "name",
                key: "name"
                //render: (record) => [record === "Pending" ? <Tag color="orange" >Pending</Tag> : record === "Rejected" ? <Tag color="red" >Rejected</Tag> : <Tag color="green" >Approved</Tag>]
            },
            {
                title: "Distributor",
                dataIndex: "distributor",
                key: "distributor"
            },
            {
                title: "Modal",
                dataIndex: "hargaModal",
                key: "hargaModal"
            },
            {
                title: "Harga Jual",
                dataIndex: "hargaJual",
                key: "hargaJual"
            },
            {
                title: "Stok",
                dataIndex: "stok",
                key: "stok"
            },
            {
                title: "Aksi",
                dataIndex: "_id",
                key: "aksi",
                render: dataIndex => [
                    <div>
                        <Button
                            type="primary"
                            onClick={() => this.handleAcc(dataIndex)}
                        >
                            Edit
                        </Button>
                        <Modal
                            title="Edit"
                            style={{ top: 20, padding: "20px" }}
                            visible={this.state.modal2Visible}
                            //onOk={() => this.setModal1Visible(false)}
                            onOk={() => this.handleEdit(dataIndex)}
                            onCancel={() => this.setModal2Visible(false)}
                        >
                            <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Kode Barang:</Col>
                                <Col span={16}>
                                    <Input
                                        placeholder="Basic usage"
                                        name="kodeBarang"
                                        defaultValue="test"
                                        value={this.state.kodeBarang}
                                        onChange={this.onChange}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Nama Barang:</Col>
                                <Col span={16}>
                                    <Input
                                        placeholder={this.props.product.name}
                                        name="name1"
                                        value={this.state.name1}
                                        onChange={this.onChange}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Asal Barang:</Col>
                                <Col span={16}>
                                    <Input
                                        placeholder={
                                            this.props.product.distributor
                                        }
                                        name="distributor1"
                                        value={this.state.distributor1}
                                        onChange={this.onChange}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Modal:</Col>
                                <Col span={16}>
                                    <Input
                                        name="hargaModal1"
                                        placeholder={
                                            this.props.product.hargaModal
                                        }
                                        onChange={this.onChange}
                                        value={this.state.hargaModal1}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Harga:</Col>
                                <Col span={16}>
                                    <Input
                                        name="hargaJual1"
                                        placeholder={
                                            this.props.product.hargaJual
                                        }
                                        onChange={this.onChange}
                                        value={this.state.hargaJual1}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Stock:</Col>
                                <Col span={16}>
                                    <Input
                                        name="stok1"
                                        onChange={this.onChange}
                                        value={this.state.stok1}
                                        placeholder={this.props.product.stok}
                                    />
                                </Col>
                            </Row>
                        </Modal>

                        <Button
                            type="danger"
                            onClick={() => this.showDeleteConfirm(dataIndex)}
                        >
                            Delete
                        </Button>
                    </div>
                ]
            }
        ];

        this.onSubmitModal = this.onSubmitModal.bind(this);
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    }
    showDeleteConfirm() {
        confirm({
            title: "Are you sure delete this task?",
            content: "Some descriptions",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    async handleEdit(id) {
        const data = {
            name: this.state.name1,
            distributor: this.state.distributor1,
            hargaJual: this.state.hargaJual1,
            hargaModal: this.state.hargaModal1,
            stok: this.state.stok1
        };
        this.setState({
            confirmLoading: true
        });
        console.log("isi : : ", id, data);
        await setTimeout(() => {
            request.product.updateProduct(id, data);
            this.props.getListProduct();

            this.setState({
                confirmLoading: false
            });
        }, 1000);
        await this.setModal2Visible(false);
    }

    handleAcc(id) {
        console.log("isi edit", id);
        this.props.getProduct(id);

        setTimeout(() => {
            this.setModal2Visible(true);

            console.log("isi props :", this.props.product);
            console.log("isi name : ", this.props.product.name);
        }, 1000);
    }

    async handleDel(id) {
        await request.product.deleteProduct(id);

        await setTimeout(() => {
            this.props.getListProduct();
        }, 1000);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("onchange : ", e.target.value);
    };
    onInput = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("onchange : ", [e.target.value]);
    };
    onChangeNumber = e => {
        this.setState({ [e.target.name]: e.target.value.replace(/\D/, "") });
    };

    async onSubmitModal() {
        console.log("test", this.state.kodeBarang);
        const data = {
            name: this.state.name,
            distributor: this.state.distributor,
            hargaJual: this.state.hargaJual,
            hargaModal: this.state.hargaModal,
            stok: this.state.stok
        };
        this.props.addProduct(data);
        await setTimeout(() => {
            this.props.getListProduct();
            this.setModal1Visible(false);
        }, 1000);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
        }
    }

    componentDidMount() {
        console.log("didMount");
        request.setToken(this.props.token);
        console.log("token : ", this.props.token);
        this.props.getListProduct();
        //if (this.props.)
    }

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    render() {
        const product = this.props.product;
        return (
            <React.Fragment>
                <Layout>
                    <Content>
                        <h1 className="mobile-head mb-3">Data Barang</h1>
                        <div className="mobile-ml">
                            <Button
                                icon="plus-circle"
                                onClick={() => this.setModal1Visible(true)}
                            >
                                Tambah Data
                            </Button>
                            <Modal
                                title="Tambah Data"
                                style={{ top: 20, padding: "20px" }}
                                visible={this.state.modal1Visible}
                                //onOk={() => this.setModal1Visible(false)}
                                onOk={this.onSubmitModal}
                                onCancel={() => this.setModal1Visible(false)}
                            >
                                <Row style={{ padding: "10px 20px" }}>
                                    <Col span={8}>Kode Barang:</Col>
                                    <Col span={16}>
                                        <Input
                                            placeholder="Basic usage"
                                            name="kodeBarang"
                                            defaultValue="test"
                                            value={this.state.kodeBarang}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 20px" }}>
                                    <Col span={8}>Nama Barang:</Col>
                                    <Col span={16}>
                                        <Input
                                            placeholder="Basic usage"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 20px" }}>
                                    <Col span={8}>Asal Barang:</Col>
                                    <Col span={16}>
                                        <Input
                                            placeholder="Basic usage"
                                            name="distributor"
                                            value={this.state.distributor}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 20px" }}>
                                    <Col span={8}>Modal:</Col>
                                    <Col span={16}>
                                        <Input
                                            name="hargaModal"
                                            placeholder="Rp.10.000"
                                            onChange={this.onChange}
                                            value={this.state.hargaModal}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 20px" }}>
                                    <Col span={8}>Harga:</Col>
                                    <Col span={16}>
                                        <Input
                                            name="hargaJual"
                                            placeholder="Rp.10.000"
                                            onChange={this.onChange}
                                            value={this.state.hargaJual}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{ padding: "10px 20px" }}>
                                    <Col span={8}>Stock:</Col>
                                    <Col span={16}>
                                        <Input
                                            name="stok"
                                            onChange={this.onChange}
                                            value={this.state.stok}
                                            placeholder="0"
                                        />
                                    </Col>
                                </Row>
                            </Modal>
                        </div>
                        <br />
                        <Table
                            className="mobile-table"
                            columns={this.columns}
                            dataSource={this.props.listProduct}
                            onChange={this.onChange}
                            scroll={{ x: "100%" }}
                        />
                    </Content>
                </Layout>
            </React.Fragment>
        );
    }
}

export default DashboardManager;
