import React, { Component } from "react";
import { Table } from "antd";
const columns = [
    {
        title: "Kode Barang",
        dataIndex: "id",
        filters: [
            {
                text: "London",
                value: "London"
            },
            {
                text: "New York",
                value: "New York"
            }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length
    },
    {
        title: "Nama Barang",
        dataIndex: "name",
        filters: [
            {
                text: "Joe",
                value: "Joe"
            },
            {
                text: "Jim",
                value: "Jim"
            },
            {
                text: "Submenu",
                value: "Submenu",
                children: [
                    {
                        text: "Green",
                        value: "Green"
                    },
                    {
                        text: "Black",
                        value: "Black"
                    }
                ]
            }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length
    },
    {
        title: "Distributor",
        dataIndex: "distributor",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.age - b.age
    },
    {
        title: "Modal",
        dataIndex: "modal",
        filters: [
            {
                text: "London",
                value: "London"
            },
            {
                text: "New York",
                value: "New York"
            }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length
    },
    {
        title: "Harga",
        dataIndex: "harga",
        filters: [
            {
                text: "London",
                value: "London"
            },
            {
                text: "New York",
                value: "New York"
            }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length
    },
    {
        title: "Stock",
        dataIndex: "stock",
        filters: [
            {
                text: "London",
                value: "London"
            },
            {
                text: "New York",
                value: "New York"
            }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length
    }
];

const data = [
    {
        id: "XA1FDS0",
        name: "Pulpy orange",
        distributor: "Minute Maid",
        stock: 30,
        modal: 30000,
        harga: 50000
    },
    {
        id: "XA1FDS0",
        name: "Pulpy orange",
        distributor: "Minute Maid",
        stock: 30,
        modal: 30000,
        harga: 50000
    },
    {
        id: "XA1FDS0",
        name: "Pulpy orange",
        distributor: "Minute Maid",
        stock: 30,
        modal: 30000,
        harga: 50000
    },
    {
        id: "XA1FDS0",
        name: "Pulpy orange",
        distributor: "Minute Maid",
        stock: 30,
        modal: 30000,
        harga: 50000
    },
    {
        id: "XA1FDS0",
        name: "Pulpy orange",
        distributor: "Minute Maid",
        stock: 30,
        modal: 30000,
        harga: 50000
    }
];

function onChange(pagination, filters, sorter) {
    console.log("params", pagination, filters, sorter);
}

class Report extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <div className="page-height">
                    <div className="layout-content">
                        <h1 className="mb-3">Data penjualan</h1>
                        <Table
                            columns={columns}
                            dataSource={data}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export { Report };
