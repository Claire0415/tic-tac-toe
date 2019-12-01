import React, { Component } from 'react';
import { Table } from 'antd';

class RecordTable extends Component {
    render() {
        return (
            <Table 
            dataSource={this.props.data} 
            columns={this.props.column} 
            pagination={false}
            rowKey={(record, index)=>index}
            bordered={false}
            />
        )
    }
}
export default RecordTable;
