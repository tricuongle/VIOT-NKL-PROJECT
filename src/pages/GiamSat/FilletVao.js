import React, { Component } from "react";

class FilletVao extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>GIÁM SÁT</h1>
          <ol className="breadcrumb">
            <li>
              <a>
                <i className="fa fa-home" aria-hidden="true"></i> Giám sát
              </a>
            </li>
            <li className="active">Fillet-ra</li>
          </ol>
        </section>
        <section className="content">
          <form id="dataTimKiem" className="filter-section form-inline">
            
          </form>
          <table id="data" className="table table-hover">
            <thead>
              <tr className="tieude">
                <th>Mã scan</th>
                <th>Ngày</th>
                <th>Giờ</th>
                <th>Họ</th>
                <th>Tên</th>
                <th>Số thẻ</th>
                <th>Mã số thẻ</th>
                <th>Màu thẻ</th>
                <th>Mã cá</th>
                <th>Size</th>
                <th>Khối lượng</th>
                <th>Khu vực</th>
                <th>Công đoạn</th>
                <th>Thiết bị</th>
                <th>Hình ảnh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123</td>
                <td>1/1/2020</td>
                <td>12:12</td>
                <td>Nguyễn Văn</td>
                <td>Anh</td>
                <td>01</td>
                <td>123456</td>
                <td>Đỏ</td>
                <td>123</td>
                <td>BASA</td>
                <td>122</td>
                <td>Fillet</td>
                <td>Đầu vào</td>
                <td>Cân 1</td>
                <td>123.jpg</td>
              </tr>
              <tr>
                <td>123</td>
                <td>1/1/2020</td>
                <td>12:12</td>
                <td>Nguyễn Văn</td>
                <td>Anh</td>
                <td>01</td>
                <td>123456</td>
                <td>Đỏ</td>
                <td>123</td>
                <td>BASA</td>
                <td>122</td>
                <td>Fillet</td>
                <td>Đầu vào</td>
                <td>Cân 1</td>
                <td>123.jpg</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}
export default FilletVao;
