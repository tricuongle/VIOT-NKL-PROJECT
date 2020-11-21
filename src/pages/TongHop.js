import React, { Component } from "react";
import TableContentTongHop from '../components/comTongHop/tableContentTongHop/TableContentTongHop'
class TongHop extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>TỔNG HỢP</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Tổng hợp</li>
          </ol>
        </section>
        <section className="content">
          <form className="filter-section form-inline">
            {/*<div className="filter-input">
              <label className="labNgay" htmlFor="filter-dateq">
                Ngày
              </label>
              <input
                type="date"
                className="form-control form-group"
                name="filter-date"
                id="filter-date"
              />
            </div>
            <div className="filter-input">
              <label className="labNgay" htmlFor="filter-date">
                Ngày
              </label>
              <input
                type="date"
                className="form-control form-group"
                name="filter-date"
                id="filter-date1"
              />
            </div>
            <div>
              <button
                id="btnLoc"
                type="button"
                className="form-control form-group btn btn-primary"
              >
                Lọc tìm kiếm
              </button>
            </div>*/}
          </form>
         <TableContentTongHop/>
        </section>
      </div>
    );
  }
}
export default TongHop;
