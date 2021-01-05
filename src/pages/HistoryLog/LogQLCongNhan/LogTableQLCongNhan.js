import React, { Component } from "react";
class LogTableQLCongNhan extends Component {
  render() {
    return (
      <div>
        <table id="tableData" className="table table-hover">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th>Mã ID</th>
              <th>Ngày thay đổi</th>
              <th>Giờ thay đổi</th>
              <th>Thông tin mới</th>
              <th>Thông tin cũ</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default LogTableQLCongNhan;
