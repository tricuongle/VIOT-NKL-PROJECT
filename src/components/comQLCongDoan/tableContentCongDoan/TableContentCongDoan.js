import React, { Component } from "react";
class TableContentCongDoan extends Component {
  render() {
    return (
      <table id="tableData" className="table table-hover" width="100%">
        <thead>
          <tr className="tieude">
            <th>STT</th>
            <th>ID</th>
            <th>Tên</th>
            <th>KL vào Min</th>
            <th>KL vào Max</th>
            <th>KL ra Min</th>
            <th>KL ra Max</th>
            <th>Nhóm</th>
            <th>Classify</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}

export default TableContentCongDoan;
