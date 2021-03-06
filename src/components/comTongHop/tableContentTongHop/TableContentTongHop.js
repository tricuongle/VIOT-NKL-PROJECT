import React, { Component } from "react";
class TableContentTongHop extends Component {
  render() {
    return (
      <div>
        <table id="tableData" className="table table-hover">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th> Mã cá</th>
              <th>Công đoạn</th>
              <th>Khối lượng đầu vào (KG)</th>
              <th>Khối lượng đầu ra (KG)</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default TableContentTongHop;
