import React, { Component } from "react";
class ManghinhSX01SuaCa extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>KHU SỬA CÁ</h1>
         
        </section>
        <section className="content">
          <form className="filter-section form-inline"></form>
          <table id="tableManghinhHT" className="table table-hover">
            <thead>
              <tr className="TableKhu">
                <th>Khu:</th>
                <th colSpan="2">Đang làm:
                </th>
                <th colSpan="2">Sắp làm: </th>
              </tr>
              <tr className="">
                <th>Ngày:</th>
                <th>Time:</th>
                <th>Số thẻ:</th>
                <th colSpan="2">Mã thẻ:</th>
              </tr>
              <tr className="">
                <th colSpan="3" id="TablenameNV" >Trần Thị Thúy Nga</th>
                <th>Khối <br/>Lượng:</th>
              </tr>
              <tr className="">
                <th>Mã cá:</th>
                <th colSpan="2">Công Đoạn:</th>
                <th colSpan="2">Tổ:</th>
              </tr>
              <tr className="=" id="titleTableMH">
                <th id="titleMaca">Mã cá</th>
                <th colSpan="2" id="titleDauvao">Đầu vào (KG)</th>
                <th colSpan="2" id="titleDaura">Đầu ra(KG)</th>
              </tr>
              <tr className="">
                <th>Cá tươi</th>
                <th colSpan="2">100</th>
                <th colSpan="2">30</th>
              </tr>
              <tr className="">
                <th>Cá tươi</th>
                <th colSpan="2">100</th>
                <th colSpan="2">30</th>
              </tr>
              <tr className="">
                <th>Cá siêu sạch</th>
                <th colSpan="2">100</th>
                <th colSpan="2">30</th>
              </tr>
              <tr className="">
                <th>Cá nga</th>
                <th colSpan="2">100</th>
                <th colSpan="2">30</th>
              </tr>
              
            </thead>
          </table>
        </section>
      </div>
    );
  }
}
export default ManghinhSX01SuaCa;
