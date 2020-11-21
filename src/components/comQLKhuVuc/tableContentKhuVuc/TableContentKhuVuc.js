import React, { Component } from "react";
import SearchKhuVuc from "../controllerKV/SearchKhuVuc";
class TableContentKhuVuc extends Component {
  render() {
    return (
      <div>
        <SearchKhuVuc onSearch={this.props.onSearch} />
        <table id="tableData" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th>ID</th>
              <th>Tên khu vực</th>
              <th>Mô tả</th>
              <th>Sửa khu vực</th>
              <th>Xóa khu vực</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default TableContentKhuVuc;
