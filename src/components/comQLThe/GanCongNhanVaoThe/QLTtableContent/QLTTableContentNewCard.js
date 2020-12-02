import React, { Component } from "react";
import QLTSearchCongNhan from "../QLTcontrollerCN/QLTSearchCongNhan";
class QLTTableContentNewCard extends Component {
  render() {
    return (
      <div>
        {/*<QLTSearchCongNhan onSearch={this.props.onSearch} />*/}
        <table id="data" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>Số thứ tự thẻ RFID</th>
              <th>ID thẻ RFID</th>
              <th>Thêm thẻ RFID vào công nhân</th>
              <th>Xóa thẻ RFID</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default QLTTableContentNewCard;
