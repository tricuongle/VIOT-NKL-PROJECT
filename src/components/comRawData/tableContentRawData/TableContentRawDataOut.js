import React, { Component } from "react";
class TableContentRawDataOut extends Component {
  render() {
    return (
      <div className="column">
        <h4>CÂN ĐẦU RA</h4>
        <table id="tableDataOut" className="table table-hover" width="100%">
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
export default TableContentRawDataOut;
