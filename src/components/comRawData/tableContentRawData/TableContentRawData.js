import React, { Component } from "react";
class TableContentRawData extends Component {
  render() {
    return (
      <table id="tableData" className="table table-hover" width="100%">
        <thead>
          <tr className="tieude">
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Tên</th>
            <th>Số thẻ</th>
            <th>Mã cá</th>
            <th>Type</th>
            <th>Khối lượng</th>
            <th>Khu vực</th>
            <th>Cân</th>
            <th>Hình ảnh</th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
export default TableContentRawData;
