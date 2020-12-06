import React, { Component } from "react";
import SearchCongNhan from "../controllerCN/SearchCongNhan";

class TableContentCongNhan extends Component {
  render() {
    return (
      <div>
         {/*-----gọi hàm tìm kiếm và filter------ */}
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
              <th>Giới tính</th>
              <th>Mã số công nhân</th>
              <th>CMND</th>
              <th>Ngày sinh</th>
              <th>Tình trạng</th>
              <th>Chỉnh sửa </th>
              <th>Xóa</th>
            </tr>
          </thead>
          {/*--------truyền đối tượng con-------- */}
          <tbody>{this.props.children}</tbody> 
        </table>
      </div>
    );
  }
}
export default TableContentCongNhan;
