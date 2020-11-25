import React, { Component } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import QuanLyThongTinThe from '../../components/comQLThe/TTinThe/QLTtableContent/QuanLyThongTinThe'
class QuanLyThe extends Component {
  render() {
    return (
      <div className="content-wrapper">
         <section className="content-header">
          <h1>QUẢN LÝ THẺ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Quản lý thẻ</li>
          </ol>
        </section>
        <QuanLyThongTinThe/>
      </div>
    );
  }
}
export default QuanLyThe;
