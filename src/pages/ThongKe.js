import React, { Component } from "react";
import TableContentThongKe from "../components/comThongKe/tableContentThongKe/TableContentThongKe";
import axios from "axios";
import * as Config from "../untils/Config";
import $, { event } from "jquery";
import TableItemThongKe from "../components/comThongKe/TableItemThongKe/TableItemThongKe";
var arrayRecode = [];
var checkTable = 0;
var load = [];
var lengthRE = null;
class ThongKe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecode: [],
      valueRecode1: [],
      valueRecodeDate: [],
      valuetemp: [],
      dateIn: "",
      dateOut: "",
    };
  }
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Record-Out",
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
          valuetemp: arrayRecode,
        });
        lengthRE = this.state.valueRecode.length;
        var table = $(document).ready(function () {
          $("#tableData").DataTable({
            searching: false,
            ordering: false,
            //dom: "Bfrtip",
            //pageLength: 10,
            fixedHeader: true,
            scrollY: 500,
            scrollX: true,
          });
        });

        /*$(document).ready(function () {
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
        });*/
      })

      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  LoadData = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Record-Out",
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
          $("#tableData").DataTable({
            searching: false,
            ordering: false,
            dom: "Bfrtip",
            pageLength: 10,
            fixedHeader: true,
            scrollY: 500,
            scrollX: true,
            destroy: true,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  LoadDataButton = () => {
    console.log("yes");
    $("#tableData").dataTable({
      clear: true,
      draw: function () {
        console.log("Redraw occurred at: " + new Date().getTime());
      },
    });
  };
  // lọc ngày
  FilterDate = () => {
    var { valueRecode, dateIn, dateOut } = this.state;
    if (valueRecode.length != lengthRE) {
      console.log("relo");
      this.LoadData();
    }
    var arrayRecodeToDate = [];
    var dateFormat = require("dateformat");
    for (var k in valueRecode) {
      const unixTime = valueRecode[k].ReadTime;
      const date = new Date(unixTime * 1000);
      var getTimeRecord = dateFormat(date, "yyyy-mm-dd");
      if (date >= new Date(dateIn) && date <= new Date(dateOut)) {
        arrayRecodeToDate.push(valueRecode[k]);
      }
    }

    this.setState({
      valueRecode: arrayRecodeToDate,
    });
  };
  render() {
    var { valueRecode, dateIn, dateOut, valueRecode1 } = this.state;
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
                name="dateIn"
                id="filter-dateIn"
                value={dateIn}
                onChange={this.onChange}
              />
            </div>
            <div className="filter-input">
              <label className="labNgay" htmlFor="filter-date">
                Đến Ngày:
              </label>
              <input
                type="date"
                className="form-control form-group"
                name="dateOut"
                id="filter-dateOut"
                value={dateOut}
                onChange={this.onChange}
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
                onClick={this.FilterDate}
              >
                Lọc tìm kiếm
              </button>
            </div>
            <div>
              <button
                id="btnLoc"
                type="button"
                className="form-control btn-success"
                onClick={this.LoadDataButton}
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
            IdRecordIn={contentItem.RecordIn}
            index={index}
          />
        );
      });
    }
    return result;
  }
}
export default ThongKe;
