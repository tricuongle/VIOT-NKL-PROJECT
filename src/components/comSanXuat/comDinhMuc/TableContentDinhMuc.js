import React, { Component } from "react";
//import SearchKhuVuc from "../controllerKV/SearchKhuVuc";
class TableContentDinhMuc extends Component {
  render() {
    return (
      <div>
        {/*<SearchKhuVuc onSearch={this.props.onSearch} />*/}
        <table id="tableData" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
              <th>ID định mức giá</th>
              <th >Tên mã cá</th>
              <th >Tên định mức</th>
              <th>Khối lượng (KG)</th>
              <th>Đơn giá</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    );
  }
}
export default TableContentDinhMuc;
