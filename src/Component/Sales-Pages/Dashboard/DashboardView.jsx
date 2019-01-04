import React from "react";
import {
    Table,
    Button,
    Modal,
    Input,
    InputNumber,
    Row,
    Col,
    message
} from "antd";
import _ from "lodash";
import request from "../../../redux/request";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: [],
            isVisible: false,
            selectedProduct: "",
            loading: false,
            qty: 1,
            clientName: "",
            hargaPerItem: 0
        };
        this.columns = [
            {
                title: "Nama Produk",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Distributor",
                dataIndex: "distributor",
                key: "distributor"
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
                    <Button
                        type="primary"
                        onClick={() => this.handleSell(dataIndex)}
                    >
                        Sell
                    </Button>
                ]
            }
        ];
        this.setDataProduk = this.setDataProduk.bind(this);
    }
    componentDidMount() {
        console.log("didMount");
        request.setToken(this.props.token);
        console.log("token : ", this.props.token);
        this.props.getListProduct();
        //if (this.props.)
    }

    handleSell(productId) {
        console.log(productId);
        this.setState({ selectedProduct: productId, isVisible: true });
    }

    setDataProduk() {
        const { listProduct } = this.props;
        let datas = [];

        listProduct.map(item => {
            let data = {
                name: item.name,
                distributor: item.distributor,
                hargaJual: item.hargaJual,
                stok: item.stok,
                productId: item._id
            };

            datas.push(data);
        });

        this.setState({ dataProduct: datas });
    }

    handleOk = id => {
        const data = {
            clientName: this.state.clientName,
            qty: this.state.qty,
            hargaPerItem: this.state.hargaPerItem
        };
        console.log("ini data :", id, data);
        request.product.sellProduct(this.state.selectedProduct, data);
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ isVisible: false, loading: false });
            message.success("Anda telah menjual barang");
            this.props.getListProduct();
        }, 1000);
    };

    handleCancel = () => {
        this.setState({ isVisible: false });
    };

    componentDidMount() {
        this.props.getListProduct();
    }

    onChangeForm = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("onchange :", e.target.value);
    };

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
            this.setDataProduk();
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Data Barang</h1>
                <Table
                    columns={this.columns}
                    dataSource={this.props.listProduct}
                />
                <Modal
                    visible={this.state.isVisible}
                    title="Sell Produk"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={this.state.loading}
                            onClick={this.handleOk}
                        >
                            Submit
                        </Button>
                    ]}
                >
                    <Row gutter={16}>
                        <Col span={6}>Nama Pembeli</Col>
                        <Col span={18}>
                            <Input
                                name="clientName"
                                onChange={this.onChangeForm}
                                value={this.state.clientName}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>Kuantitas</Col>
                        <Col span={18}>
                            <Input
                                name="qty"
                                min={1}
                                defaultValue={1}
                                value={this.state.qty}
                                onChange={this.onChangeForm}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>Harga Jual Per Item</Col>
                        <Col span={18}>
                            <Input
                                name="hargaPerItem"
                                min={1}
                                defaultValue={10000}
                                value={this.state.hargaPerItem}
                                onChange={this.onChangeForm}
                            />
                        </Col>
                    </Row>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Dashboard;
