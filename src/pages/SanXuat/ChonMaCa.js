import React, { Component } from "react";
import TableContentChonMaCa from '../../components/comSanXuat/comChonMaCa/tableContentChonMaCa/TableContentChonMaCa'
class ChonMaCa extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>CHỌN MÃ CÁ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Chọn mã cá</li>
          </ol>
        </section>
        <section className="content">
          <form className="filter-section form-inline"></form>
          <TableContentChonMaCa/>
        </section>
      </div>
    );
  }
}
export default ChonMaCa;
