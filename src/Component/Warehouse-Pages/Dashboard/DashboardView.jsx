import React from "react";
import { Table, Button, Modal, InputNumber, Row, Col, message } from "antd";
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
            qty: 1
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
                title: "Harga Modal",
                dataIndex: "hargaBeli",
                key: "hargaBeli"
            },
            {
                title: "Stok",
                dataIndex: "stok",
                key: "stok"
            },
            {
                title: "Aksi",
                dataIndex: "",
                key: "aksi",
                render: record => [
                    <Button
                        type="primary"
                        onClick={() => this.handleRestock(record.productId)}
                    >
                        Restok
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

    handleRestock(productId) {
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
                hargaBeli: item.hargaBeli,
                stok: item.stok,
                productId: item._id
            };

            datas.push(data);
        });

        this.setState({ dataProduct: datas });
    }

    handleOk = () => {
        request.product.restockProduct(this.state.selectedProduct, {
            qty: this.state.qty
        });
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ isVisible: false, loading: false });
            message.success("Anda telah berhasil melakukan restok barang");
        }, 1000);
    };

    handleCancel = () => {
        this.setState({ isVisible: false });
    };

    componentDidMount() {
        this.props.getListProduct();
    }

    onChangeForm = value => {
        this.setState({ qty: value });
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
                    title="Restok Produk"
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
                        <Col span={6}>Kuantitas</Col>
                        <Col span={18}>
                            <InputNumber
                                min={1}
                                defaultValue={1}
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
