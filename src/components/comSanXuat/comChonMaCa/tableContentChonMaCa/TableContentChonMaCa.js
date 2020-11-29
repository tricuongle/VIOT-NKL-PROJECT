import React, { Component } from "react";
import TableItemChonMaCa from "../tableItemChonMaCa/TableItemChonMaCa";
import $ from "jquery";
class TableContentChonMaCa extends Component {
  render() {
    return (
      <div>
        <table id="tableData" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>STT</th>
              <th>khu vực</th>
              <th>Mã cá đang làm</th>
            </tr>
          </thead>
          <tbody>
          {this.props.children}
          </tbody>
        </table>
      </div>
    );
  }
}
export default TableContentChonMaCa;
