import React, { Component } from "react";
import QuanLyThongTinCongNhan from '../../components/comQLThe/GanCongNhanVaoThe/QLTtableContent/QuanLyThongTinCongNhan'
class ThemThe extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>THÊM THẺ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Thêm thẻ</li>
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
