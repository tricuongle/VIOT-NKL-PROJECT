import React, { Component } from "react";
class TableContentTongHop extends Component {
  render() {
    return (
      <table id="tableData" className="table table-hover">
        <thead>
          <tr className="tieude">
            <th>STT</th>
            <th>Công đoạn</th>
            <th>Mã cá</th>
            <th>Khối lượng đầu vào (KG)</th>
            <th>Khối lượng đầu ra (KG)</th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
export default TableContentTongHop;
