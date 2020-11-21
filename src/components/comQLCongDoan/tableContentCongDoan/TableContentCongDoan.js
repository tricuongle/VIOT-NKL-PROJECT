import React, { Component } from "react";
class TableContentCongDoan extends Component {
  render() {
    return (
      <table id="tableData" className="table table-hover" width="100%">
        <thead>
          <tr className="tieude">
            <th>STT</th>
            <th>Mã công đoạn</th>
            <th>Tên công đoạn</th>
            <th>Khu vực</th>
            <th>Ngày tạo</th>
            <th>Sửa công đoạn</th>
            <th>Xóa công đoạn</th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}

export default TableContentCongDoan;
