import React from "react";
import { Table, Button, Tag } from "antd";
import _ from "lodash";
import moment from "moment";
import request from "../../../redux/request";

class RestockVal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataValidation: []
        };
        this.columns = [
            // {
            //     title: "Kode Produk",
            //     dataIndex: "kode",
            //     key: "kode"
            // },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: record => [
                    record === "Pending" ? (
                        <Tag color="orange">Pending</Tag>
                    ) : record === "Rejected" ? (
                        <Tag color="red">Rejected</Tag>
                    ) : (
                        <Tag color="green">Approved</Tag>
                    )
                ]
            },
            {
                title: "Tanggal Restock",
                dataIndex: "tglRes",
                key: "tglRes"
            },
            {
                title: "Nama Produk",
                dataIndex: "namaProd",
                key: "namaProd"
            },
            {
                title: "Jumlah Restock",
                dataIndex: "jmlRes",
                key: "jmlRes"
            },
            {
                title: "Penjaga Gudang",
                dataIndex: "gudang",
                key: "gudang"
            },
            {
                title: "Aksi",
                dataIndex: "",
                key: "aksi",
                render: record => [
                    record.status === "Pending" ? (
                        <div>
                            <Button
                                type="primary"
                                onClick={() =>
                                    this.handleAcc(record.logRestockId)
                                }
                            >
                                Approve
                            </Button>{" "}
                            <Button
                                type="danger"
                                onClick={() =>
                                    this.handleDec(record.logRestockId)
                                }
                            >
                                Reject
                            </Button>
                        </div>
                    ) : record.status === "Rejected" ? (
                        <Button type="primary" disabled>
                            Rejected
                        </Button>
                    ) : (
                        <Button type="primary" disabled>
                            Approved
                        </Button>
                    )
                ]
            }
        ];

        this.setDataValidation = this.setDataValidation.bind(this);
    }

    setDataValidation() {
        const { listLogRestock } = this.props;

        let datas = [];
        let kunci = 1;

        if (listLogRestock && listLogRestock.result) {
            listLogRestock.result.map(item => {
                let data = {
                    key: kunci++,
                    tglRes: moment(item.tgl)
                        .utcOffset("+0700")
                        .format("MMMM Do YYYY, h:mm:ss a"),
                    namaProd: item.product.name,
                    jmlRes: item.qty,
                    status:
                        item.status === "pending"
                            ? "Pending"
                            : item.status === "approved"
                            ? "Approved"
                            : "Rejected",
                    gudang: item.gudang.fullName,
                    product: item.product,
                    logRestockId: item._id
                };

                datas.push(data);
            });
            datas.reverse();
            this.setState({ dataValidation: datas });
        }
    }

    async handleAcc(logRestockId) {
        await request.log.logRestockValid(logRestockId, "approved");
        await setTimeout(() => {
            this.props.getListLogRestock();
        }, 1000);
    }

    async handleDec(logRestockId) {
        await request.log.logRestockValid(logRestockId, "rejected");
        await setTimeout(() => {
            this.props.getListLogRestock();
        }, 1000);
    }

    componentDidMount() {
        this.props.getListLogRestock();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
            this.setDataValidation();
        }
    }

    render() {
        console.log(this.props.listLogRestock);
        return (
            <React.Fragment>
                <Table
                    columns={this.columns}
                    dataSource={this.state.dataValidation}
                />
            </React.Fragment>
        );
    }
}

export default RestockVal;
