import React, { Component } from "react";
import TableItemTinhTien from "../TableItemTinhTien/TableItemTinhTien";
import $, { event } from "jquery";

class TableContentTinhTien extends Component {
  render() {

    var { data } = this.props;
    if (data != 0) {                          
 
      for (var k in data) {
        var row = document.getElementById("idRow");
        var x = row.insertCell(2);
        x.innerHTML = data[k].ModelName.bold();
      }
    }

    return (
      <table id="tableData" className="table table-hover" width="100%">
        <thead>
          <tr className="tieude" id="idRow">
            <th>STT</th>
            <th>Họ tên</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
export default TableContentTinhTien;
