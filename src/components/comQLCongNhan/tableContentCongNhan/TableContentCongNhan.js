import React, { Component } from "react";
import SearchCongNhan from "../controllerCN/SearchCongNhan";

class TableContentCongNhan extends Component {
 
  render() {
    return (
      <div>
        <SearchCongNhan
          onSearch={this.props.onSearch}
          onFilter={this.props.onFilter}
        />
        <table id="tableData" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th>ID công nhân</th>
              <th>Họ Tên</th>
              <th>CMND</th>
              <th>Ngày sinh</th>
              <th>Tình trạng</th>
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
export default TableContentCongNhan;
