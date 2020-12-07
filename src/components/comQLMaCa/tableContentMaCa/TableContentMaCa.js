import React, { Component } from "react";
import SearchCongNhan from '../controllerMC/SearchMaCa'
class TableContentMaCa extends Component {
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
            <th>ID</th>
            <th>Ngày tạo</th>
            <th>Tên</th>
            <th>KL vào Min</th>
            <th>KL vào Max</th>
            <th>KL ra Min</th>
            <th>KL ra Max</th>
            <th>công đoạn</th>
            <th>Nhóm</th>
            <th>Classify</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
      </div>
      
    );
  }
}

export default TableContentMaCa;
