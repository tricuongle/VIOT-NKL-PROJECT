import React, { Component } from "react";
import $, { event } from "jquery";
class TableContentRawDataIn extends Component {
  
  render() {

    return (
        
        <div className="column">
          <h4>CÂN ĐẦU VÀO</h4>
          <table id="tableDataIn" className="table table-hover" width="100%">
            <thead>
              <tr className="tieude">
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Tên</th>
                <th>S.thẻ</th>
                <th>Mã cá</th>
                <th>Type</th>
                <th>K.lượng</th>
                <th>K.vực</th>
                <th>Cân</th>
                <th>H.ảnh</th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
    );
  }
}
export default TableContentRawDataIn;
