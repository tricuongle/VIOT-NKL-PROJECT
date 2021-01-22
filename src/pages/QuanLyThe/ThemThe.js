import React, { Component } from "react";
import QuanLyThongTinCongNhan from '../../components/comQLThe/GanCongNhanVaoThe/QLTtableContent/QuanLyThongTinCongNhan'
class ThemThe extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>TRA CỨU VÀ THÊM THẺ MỚI</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Tra cứu và thêm thẻ mới</li>
          </ol>
        </section>
        <section className="content">
          <form className="filter-section form-inline"></form>
          
          {<QuanLyThongTinCongNhan/>}
        </section>
      </div>
    );
  }
}
export default ThemThe;
