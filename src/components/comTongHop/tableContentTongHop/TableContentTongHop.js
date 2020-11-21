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
            <th>Thiết bị cân</th>
            <th>Mã cá</th>
            <th>Khối lượng (KG)</th>
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
