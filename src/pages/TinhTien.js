import React, { Component } from "react";
import TableContentTinhtien from "../components/comTinhTien/tableContentTinhTien/TableContentTinhtien";
class TinhTien extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div w3-include-html="../_Layout.html"></div>
        <section className="content-header">
          <h1>TÍNH TIỀN CÔNG NHÂN</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Tính tiền</li>
          </ol>
        </section>
        <section className="content">
          <form id="dataTimKiem" className="filter-section form-inline">
            <div className="filter-input">
              <label className="labNgay" htmlFor="filter-dateq">
                {" "}
                Từ Ngày:
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
                Đến Ngày:
              </label>
              <input
                type="date"
                className="form-control form-group"
                name="filter-date"
                id="filter-date1"
              />
            </div>
            <div className=" filter-input">
              <select
                name=""
                id="input"
                className="form-control"
                required="required"
              >
                <option value="0">khu vực</option>
                <option value="1">EX1</option>
                <option value="2">EX2</option>
                <option value="3">EX3</option>
                <option value="4">EX4</option>
                <option value="5">EX5</option>
                <option value="6">EX6</option>
              </select>
            </div>
            <div>
              <button
                id="btnLoc"
                type="button"
                className="form-control form-group btn btn-primary"
              >
                Lọc tìm kiếm
              </button>
            </div>
          </form>
          <TableContentTinhtien />
        </section>
      </div>
    );
  }
}
export default TinhTien;
