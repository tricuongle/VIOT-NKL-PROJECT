import React, { Component } from "react";

class TableContentTramCan extends Component {
 
  render() {
    return (
      <table id="tableData" className="table table-hover" width="100%">
            <thead>
              <tr className="tieude">
                <th>STT</th>
                <th>ID</th>
                <th>Tên thiết bị</th>
                <th>Type</th>
                <th>Công đoạn</th>
                <th>Khu vực</th>
                <th>Chỉnh sửa trạm cân</th> 
              </tr>
            </thead>
            <tbody>
               {this.props.children}
            </tbody>
          </table>
    );
  }
}

export default TableContentTramCan;
