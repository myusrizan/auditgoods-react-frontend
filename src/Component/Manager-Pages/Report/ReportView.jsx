import React from "react";
import { Table, Button, Modal, Row, Col } from "antd";
import _ from "lodash";
import moment from "moment";

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLogReport: [],
            record: {},
            isVisible: false
        };
        this.columns = [
            // {
            //     title: "Kode Produk",
            //     dataIndex: "kode",
            //     key: "kode"
            // },
            {
                title: "Nama Produk",
                dataIndex: "namaProd",
                key: "namaProd"
            },
            {
                title: "Waktu Transaksi",
                dataIndex: "waktu",
                key: "waktu"
            },
            {
                title: "Nama Sales",
                dataIndex: "namaSal",
                key: "namaSal"
            },
            {
                title: "Aksi",
                dataIndex: "",
                key: "aksi",
                render: record => (
                    <Button
                        type="primary"
                        onClick={() => this.showModal(record)}
                    >
                        Detail
                    </Button>
                )
            }
        ];
        this.setDataLogReport = this.setDataLogReport.bind(this);
    }

    showModal(record) {
        this.setState({ isVisible: true, record: record });
    }

    handleCancel = () => {
        this.setState({ isVisible: false });
    };

    setDataLogReport() {
        const { listLogReport } = this.props;
        let datas = [];
        let kunci = 1;

        if (listLogReport && listLogReport.result) {
            listLogReport.result.map(item => {
                let data = {
                    key: kunci++,
                    namaProd: item.logSell.product.name,
                    waktu: moment(item.tglLog)
                        .utcOffset("+0700")
                        .format("MMMM Do YYYY, h:mm:ss a"),
                    namaSal: item.sales.fullName,
                    detail: item.logSell
                };

                datas.push(data);
            });
            this.setState({ dataLogReport: datas });
        }
    }

    componentDidMount() {
        this.props.getListLogReport();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props, prevProps)) {
            this.setDataLogReport();
        }
    }

    render() {
        const { user } = this.props;
        const { record } = this.state;
        console.log(this.state.record);
        return (
            <React.Fragment>
                <Table
                    columns={this.columns}
                    dataSource={this.state.dataLogReport}
                />
                <Modal
                    visible={this.state.isVisible}
                    title={`Detail Log ${record.namaProd} ${record.waktu}`}
                    onCancel={this.handleCancel}
                    footer={
                        <Button key="back" onClick={this.handleCancel}>
                            Kembali
                        </Button>
                    }
                >
                    <Row gutter={24}>
                        <Col span={8}>Nama Produk</Col>
                        <Col span={16}>: {record.namaProd}</Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>Nama Sales</Col>
                        <Col span={16}>: {record.namaSal}</Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>Tanggal Pembelian</Col>
                        <Col span={16}>: {record.waktu}</Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>Nama Pembeli</Col>
                        <Col span={16}>
                            : {record.detail ? record.detail.clientName : ""}
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>Harga Satuan</Col>
                        <Col span={16}>
                            : {record.detail ? record.detail.hargaPerItem : ""}
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>Jumlah</Col>
                        <Col span={16}>
                            : {record.detail ? record.detail.qty : ""}
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>Harga Total</Col>
                        <Col span={16}>
                            : {record.detail ? record.detail.hargaTotal : ""}
                        </Col>
                    </Row>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Report;
