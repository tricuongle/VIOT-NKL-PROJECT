import React, { Component } from "react";
import TableContentThongKe from "../components/comThongKe/tableContentThongKe/TableContentThongKe";
import axios from "axios";
import * as Config from "../untils/Config";
import $, { event } from "jquery";
import TableItemThongKe from "../components/comThongKe/TableItemThongKe/TableItemThongKe";
var arrayRecode = [];
var checkTable = 0;
class ThongKe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecode: [],
    };
  }
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Record-In",
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
        $(document).ready(function () {
          // Setup - add a text input to each footer cell
          $("#tableData thead tr").clone(true).appendTo("#tableData thead");
          $("#tableData thead tr:eq(1) th").each(function (i) {
            var title = $(this).text();
            $(this).html(
              '<input type="text" placeholder="Search ' + title + '" />'
            );

            $("input", this).on("keyup change", function () {
              if (table.column(i).search() !== this.value) {
                table.column(i).search(this.value).draw();
              }
            });
          });
          var table = $("#tableData").DataTable({
            lengthMenu: [
              [10, 25, 50, -1],
              [10, 25, 50, "All"],
            ],
            orderCellsTop: true,
            fixedHeader: true,
            scrollX: true,
            scrollY: 200,

            // dom: "Bfrtip",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMountt = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Recode",
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
          // Setup - add a text input to each footer cell
          $("#tableData thead tr").clone(true).appendTo("#tableData thead");
          $("#tableData thead tr:eq(1) th").each(function (i) {
            /*--------------*/
            $("input", this).on("keyup change", function () {
              if (table.column(i).search() !== this.value) {
                table.column(i).search(this.value).draw();
              }
            });
          });
          var table = $("#tableData").DataTable({
            lengthMenu: [
              [10, 25, 50, -1],
              [10, 25, 50, "All"],
            ],
            orderCellsTop: true,
            fixedHeader: true,
            scrollX: true,
            scrollY: 350, 

            // dom: "Bfrtip",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var { valueRecode } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>THỐNG KÊ</h1>
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
              <label className="labNgay" htmlFor="filter-date">
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
            {/*<div className=" filter-input">
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
            </div>*/}
            <div>
              <button
                id="btnLoc"
                type="button"
                className="form-control form-group btn btn-primary"
              >
                Lọc tìm kiếm
              </button>
            </div>
            <div>
              <button
                id="btnLoc"
                type="button"
                className="form-control btn-success"
                onClick={this.componentDidMountt}
              >
                Làm mới dữ liệu
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
