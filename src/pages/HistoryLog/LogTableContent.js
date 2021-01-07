import React, { Component } from "react";
class LogTableContent extends Component {
  render() {
    return (
      <div className= "employeeTable">
        <table id="ttableData" className="table table-hover">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th>Mã ID</th>
              <th>Ngày/giờ thay đổi</th>
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
export default LogTableContent;
