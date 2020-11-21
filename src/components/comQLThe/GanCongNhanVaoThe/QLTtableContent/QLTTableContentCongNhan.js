import React, { Component } from "react";
import QLTSearchCongNhan from "../QLTcontrollerCN/QLTSearchCongNhan";
class QLTTableContentCongNhan extends Component {
  render() {
    return (
      <div>
        <QLTSearchCongNhan
          onSearch={this.props.onSearch}
        />
        <table id="data" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
            <th>Chọn</th>
              <th>ID công nhân</th>
              <th>Họ Tên</th>
              <th>CMND</th>
              <th>Ngày sinh</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default QLTTableContentCongNhan;
