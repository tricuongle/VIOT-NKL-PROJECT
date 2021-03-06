import React, { Component } from "react";
import SearchDinhMuc from '../comDinhMuc/SearchDinhMuc'
//import SearchKhuVuc from "../controllerKV/SearchKhuVuc";
class TableContentDinhMuc extends Component {
  render() {
    return (
      <div>
        <SearchDinhMuc onSearch={this.props.onSearch} />
        <table id="tableData" className="table table-hover" width="100%">
          <thead>
            <tr className="tieude">
            <th>STT</th>
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
