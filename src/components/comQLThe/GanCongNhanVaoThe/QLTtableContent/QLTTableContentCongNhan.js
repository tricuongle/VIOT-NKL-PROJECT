import React, { Component } from "react";
import QLTSearchCongNhan from "../QLTcontrollerCN/QLTSearchCongNhan";
class QLTTableContentCongNhan extends Component {
  render() {
    return (
      <div>
        <QLTSearchCongNhan onSearch={this.props.onSearch} />
        <table id="data" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>ID mã RFID thẻ</th>
              <th>Tên công nhân</th>
              <th>CMND</th>
              <th>Tình trạng</th>
              <th>Màu thẻ</th>
              <th>Công đoạn (mã cá)</th>
              <th>Thêm</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default QLTTableContentCongNhan;
