import React, { Component } from "react";
import TableItemChonMaCa from "../tableItemChonMaCa/TableItemChonMaCa";
class TableContentChonMaCa extends Component {
  render() {
    return (
      <div>
        <table id="data" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th>Công đoạn</th>
              <th>Chọn mã cá</th>
              <th>Chọn</th>
              <th>Mã cá đang làm</th>
            </tr>
          </thead>
          <tbody>
            <TableItemChonMaCa />
          </tbody>
        </table>
      </div>
    );
  }
}
export default TableContentChonMaCa;
