import React, { Component } from "react";
import TableItemTaoMaCa from "../tableItemTaoMaCa/TableItemTaoMaCa";
class TableContentTaoMaCa extends Component {
  render() {
    return (
      <div>
        <table id="tableData" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th>ID</th>
              <th>Tên mã cá</th>
              <th>Sửa mã cá</th>
              <th>Xóa mã cá</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default TableContentTaoMaCa;
