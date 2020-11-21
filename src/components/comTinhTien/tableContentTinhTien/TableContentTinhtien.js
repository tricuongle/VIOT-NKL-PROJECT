import React, { Component } from "react";
import TableItemTinhTien from "../TableItemTinhTien/TableItemTinhTien";

class TableContentTinhTien extends Component {
  render() {
    return (
      <table id="tableData" className="table table-hover" width="100%">
        <thead>
          <tr className="tieude">
            <th>STT</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Số thẻ</th>
            <th>Khu vực</th>
            <th>Cá sạch</th>
            <th>Cá siêu sạch</th>
            <th>Cá nga</th>
            <th>Tổng tiền (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          <TableItemTinhTien />
        </tbody>
      </table>
    );
  }
}
export default TableContentTinhTien;
