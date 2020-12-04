import React, { Component } from "react";
import SearchCongDoann from "../controllerKV/SearchCongDoann";
class TableContentCongDoann extends Component {
  render() {
    return (
      <div>
        <SearchCongDoann onSearch={this.props.onSearch} />
        <table id="tableData" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th>ID công đoạn</th>
              <th>Tên công đoạn</th>
              <th>Mô tả</th>
              <th>Sửa công đoạn</th>
              <th>Xóa công đoạn</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default TableContentCongDoann;
