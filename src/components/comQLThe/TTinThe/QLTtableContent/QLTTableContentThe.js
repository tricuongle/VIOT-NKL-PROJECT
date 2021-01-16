import React, { Component } from "react";
import SearchThe from "../QLTcontroller/SearchThe";

class QLTTableContentThe extends Component {
  render() {
    return (
      <div>
        <SearchThe onSearch={this.props.onSearch} />
        <table id="tableData" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
            <th>STT</th>
            <th>Ngày giờ tạo</th>
              <th>ID RFID thẻ</th>
              <th>Tên thẻ</th>
              <th>Tên công nhân</th>
              <th>Màu thẻ</th>
              <th>Công đoạn</th>
              <th>Loại</th>
              <th>Chỉnh sửa </th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default QLTTableContentThe;
