import React, { Component } from "react";
import TableItemThongKe from "../TableItemThongKe/TableItemThongKe";
class TableContentThongKe extends Component {
  render() {
    return (
      <table id="data" className="table table-hover" width="100%">
        <thead>
          <tr className="tieude">
            <th>Mã scan</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Số thẻ</th>
            <th>Mã số thẻ</th>
            <th>Màu thẻ</th>
            <th>Mã cá</th>
            <th>Size</th>
            <th>Khối lượng</th>
            <th>Khu vực</th>
            <th>Công đoạn</th>
            <th>Thiết bị</th>
            <th>Hình ảnh</th>
          </tr>
        </thead>
        <tbody>
          <TableItemThongKe />
        </tbody>
      </table>
    );
  }
}
export default TableContentThongKe;
