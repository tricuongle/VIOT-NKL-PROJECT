import React, { Component } from "react";
import TableItemTongHop from '../TableItemTongHop/TableItemTongHop'
class TableContentTongHop extends Component {
  render() {
    return (
      <table id="data" className="table table-hover">
        <thead>
          <tr className="tieude">
            <th>STT</th>
            <th>Khu vực</th>
            <th>Công đoạn</th>
            <th>Khối lượng đầu vào (KG)</th>
            <th>Khối lượng đầu ra (KG)</th>
          </tr>
        </thead>
        <tbody>
          <TableItemTongHop/>
        </tbody>
      </table>
    );
  }
}
export default TableContentTongHop;
