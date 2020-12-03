import React, { Component } from "react";
import TableItemThongKe from "../TableItemThongKe/TableItemThongKe";
class TableContentThongKe extends Component {
  render() {
    return (
      <table id="tableData" className="table table-hover" width="100%">
        <thead>
          <tr className="tieude">
            <th>Mã scan</th>
            <th>Ngày</th>
            <th>Tên công nhân</th>
            <th>CNMD</th>
            <th>Tên thẻ</th>
            <th>Số thẻ</th>
            <th>Màu thẻ</th>
            <th>Mã cá</th>
            <th>Loại</th>
            <th>Weight</th>
            <th>Khu vực</th>
            <th>Công đoạn</th>
            <th>Cân</th>
            <th>Ảnh</th>   {/*14 cột */}
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
export default TableContentThongKe;
