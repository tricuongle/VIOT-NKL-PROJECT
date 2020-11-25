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
            <th>Chọn</th>
              <th>ID thẻ</th>
              <th>Tên công nhân</th>
              <th>Màu thẻ</th>
              <th>Công đoạn(mã cá)</th>
              <th>Khu vực</th>
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
