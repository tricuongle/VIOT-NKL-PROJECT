import React, { Component } from "react";
import SearchThongKe from "../controllerThongKe/SearchThongKe";
class TableContentThongKe extends Component {
  render() {
    return (
      <div>
        <SearchThongKe onSearch={this.props.onSearch} />
        <div className="employeeTable">
          <table id="ttableData" className="table table-hover" width="100%">
            <thead>
              <tr className="tieude">
                <th>STT</th>
                <th>Ngày</th>
                <th>Tên C.nhân</th>
                <th>Số CN</th>
                <th>Thẻ RFID</th>
                <th>Màu thẻ</th>
                <th>Mã cá</th>
                <th>Loại cá</th>
                <th>C.đoạn</th>
                <th>Cân vào</th>
                <th>Cân ra</th>
                <th>KL vào</th>
                <th>KL ra</th>
                <th>Giờ vào</th>
                <th>Giờ ra</th>
                <th>Định mức</th>
                <th>Khu vực</th>
                <th>Ảnh Vào/Ra</th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default TableContentThongKe;
