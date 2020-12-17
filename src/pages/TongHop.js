import React, { Component } from "react";
import TableContentTongHop from "../components/comTongHop/tableContentTongHop/TableContentTongHop";
import TableItemTongHop from "../components/comTongHop/TableItemTongHop/TableItemTongHop";
import axios from "axios";
import * as Enumerable from "linq";

import * as Config from "../untils/Config";
import $, { event } from "jquery";
var arrayRecode = [];
var load = [];
var RecordGroup = [];
var valueReWeight = [];

var dayToDay2 ='---';
var countScan = 0;
let scanDataTable;
let scanDataTableOff = 0;
class TongHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecode: [],
      valueRecordGroup: [],
    };
  }
  convertData = (data) => {
    const date = new Date(data * 1000);
    var dateFormat = require("dateformat");
    var dateNew = dateFormat(date, "dd/mm/yyyy");
    return dateNew;
  };
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
        var date = new Date();
        dayToDay2 =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);

          var dayRawData = this.convertData(contentItem.ReadTime); // lấy thời gian trong record

          if (dayRawData == dayToDay2) {
            arrayRecode.push(contentItem);
          }
          //arrayRecode.push(contentItem);
        });
        arrayRecode.sort().reverse(); // sort đảo mảng
        this.setState({
          valueRecode: arrayRecode,
        });
        if (this.state.valueRecode == "") {
          alert("Thông báo, chưa có dữ liệu mới trong ngày...");
        }

        //----------------
        valueReWeight = this.state.valueRecode;
        for (var k in valueReWeight) {
          valueReWeight[k].Weight = parseFloat(valueReWeight[k].Weight);
        }
        RecordGroup = Enumerable.from(valueReWeight)
          .groupBy(
            "{ PL1: $.ProcessName , PL2: $.ModelName }",
            "$.Weight || 0",
            "{ ProcessName: $.PL1,ModelName: $.PL2, Weight : $$.sum()}",
            "'' + $.PL1 + ' ' + $.PL2"
          )
          .toArray();
        this.setState({
          valueRecordGroup: RecordGroup,
        });
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: false,
          scrollY: 350,
          paging: false,
        });
        console.log(this.state.valueRecordGroup);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // --------------------load dữ liệu lại-------------------------
  dataTableLoad = () => {
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
      })
      .catch((err) => {
        console.log(err);
      });
    if (scanDataTableOff == 1) {
      countScan = 0;
      clearTimeout(setTimeout(this.dataTableLoad, 3000));
      document.getElementById("btnStopScan").disabled = true;
      document.getElementById("btnScan").disabled = false;
      document.getElementById("btnScan").innerHTML =
        "Bật quét dữ liệu " + countScan;
      scanDataTableOff = 0;
    } else {
      countScan += 1;
      document.getElementById("btnStopScan").disabled = false;
      document.getElementById("btnScan").disabled = true;
      document.getElementById("btnScan").innerHTML = "Lần quét: " + countScan;
      setTimeout(this.dataTableLoad, 2000);
      console.log("<--Lần quét table tổng hợp");
    }
  };
  LoadData = () => {
    this.setState({
      valueRecode: load,
    });
    this.dataTableLoad();
  };
  OffScan = () => {
    scanDataTableOff = 1;
  };
  /*------------------------------------- */
  render() {
    var { valueRecordGroup } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>TỔNG HỢP CÔNG ĐOẠN TRONG NGÀY {dayToDay2}</h1>
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
            {/* <div className="input-group inputSeach">
              <button
                type="button"
                id="btnScan"
                className="btn btn-success"
                onClick={this.dataTableLoad}
              >
                Bật quét dữ liệu {countScan}
              </button>
            </div>
            <div className="input-group inputSeach">
              <button
                type="button"
                id="btnStopScan"
                className="btn btn-primary"
                onClick={this.OffScan}
              >
                Tắt quét dữ liệu
              </button>
    </div>*/}
          </form>

          <TableContentTongHop>
            {this.showContentItems(valueRecordGroup)}
          </TableContentTongHop>
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemTongHop
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
export default TongHop;
