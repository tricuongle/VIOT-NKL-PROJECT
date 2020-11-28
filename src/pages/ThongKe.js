import React, { Component } from "react";
import TableContentThongKe from "../components/comThongKe/tableContentThongKe/TableContentThongKe";
import axios from "axios";
import * as Config from "../untils/Config";
import $, { event } from "jquery";
import TableItemThongKe from "../components/comThongKe/TableItemThongKe/TableItemThongKe";
var arrayRecode = [];
class ThongKe extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      valueRecode: [],
    };
  }
  componentDidMountt=()=> {
    console.log("get data ok");
    axios({
      method: "GET",
      url:
      `${Config.API_URL}`+'/api/data/Values?token='+`${Config.TOKEN}`+'&Classify=Recode',
      data: null,
    })
      .then((res) => {
        arrayRecode = [];
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          arrayRecode.push(contentItem);

        });
        this.setState({
          valueRecode: arrayRecode,
        });
        // sử dụng thư viện datatable
        $(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 7,
            processing: true,
            responsive: true,
            destroy: true,
            dom: 'Bfrtip',
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  render() {
    // sau 3 giây load lại table
    setTimeout(this.componentDidMountt, 3000);
    var { valueRecode } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Thống kê</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i>Trang chủ
              </a>
            </li>
            <li className="active">Thống kê</li>
          </ol>
        </section>

        <section className="content">
          <form id="dataTimKiem" className="filter-section form-inline">
            <div className="filter-input">
              <label className="labNgay" htmlFor="filter-dateq">
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
                <option value="0">Mã cá</option>
                <option value="1">EX1</option>
                <option value="2">EX2</option>
                <option value="3">EX3</option>
                <option value="4">EX4</option>
                <option value="5">EX5</option>
                <option value="6">EX6</option>
              </select>
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
            <div className=" filter-input">
              <select
                name=""
                id="input"
                className="form-control"
                required="required"
              >
                <option value="0">C.đoạn</option>
                <option value="1">EX1</option>
                <option value="2">EX2</option>
                <option value="3">EX3</option>
                <option value="4">EX4</option>
                <option value="5">EX5</option>
                <option value="6">EX6</option>
              </select>
            </div>
            <div className=" filter-input">
              <select
                name=""
                id="input"
                className="form-control"
                required="required"
              >
                <option value="0">Cân</option>
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
          <TableContentThongKe>
            {this.showContentItems(valueRecode)}
          </TableContentThongKe>
        </section>
      </div>
    );
  }
  
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemThongKe
            key={index}
            contentItem={contentItem}
            index={index}
          />
        );
      });
    }
    return result;
    
  }
  
}
export default ThongKe;
