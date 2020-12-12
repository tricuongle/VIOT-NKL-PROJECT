import React, { Component } from "react";
import TableContentTongHop from "../components/comTongHop/tableContentTongHop/TableContentTongHop";
import TableItemTongHop from "../components/comTongHop/TableItemTongHop/TableItemTongHop";
import axios from "axios";
import linq, { Enumerable } from "linq";

import * as Config from "../untils/Config";
import $, { event } from "jquery";
var arrayRecode = [];
var load = [];

var countScan = 0;
let scanDataTable;
let scanDataTableOff = 0;
class TongHop extends Component {
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
        "&Classify=Record-Out",
      data: null,
    })
      .then((res) => {
        arrayRecode = [];
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          arrayRecode.push(contentItem);
        });
        arrayRecode.sort().reverse();
        this.setState({
          valueRecode: arrayRecode,
        });
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: false,
          scrollY: 450,
          paging: false,
        });

        //----------------
        var linq = Enumerable.From(this.state.valueRecode);
        var result = linq
          .GroupBy(function (x) {
            return x.ProcessId;
          })
          .Select(function (x) {
            return {
              ProcessId: x.Key(),
              DeviceId: x.Key(),
              CardId: x.Key(),
              Model: x.Key(),
              Classify: x.Key(),
              EmployeeId: x.Key(),
              Weight: x.Sum(function (y) {
                return y.Value | 0;
              }),
            };
          })
          .ToArray();
        console.table(result);
        //alert(JSON.stringify(result));

        /*let women = this.state.valueRecode.filter((person) => person.Model === 'MC-NKL-010');
        console.table(women);*/
        //console.table(this.state.valueRecode);

        /* jinqJs().from(this.state.valueRecode).groupBy('ProcessId').sum('Weight').select();
        var ageLess20 = this.state.valueRecode.filter(function (valueRecode) {
          return (valueRecode.Classify= "LON") ;
        });
        console.log(ageLess20);*/

        /*var obj = this.state.valueRecode.reduce((acc, cur) => {
          acc[cur.Model] = parseFloat(cur.Weight || 0);
          return acc;
        }, {});
        console.log(obj);
        var array = Object.entries(obj).map((entry) => {
          return { Model: entry[0], Weight: entry[1] };
        });
        console.log(array);*/
        //jinqJs().from(this.state.valueRecode).groupBy('date').sum('impressions').select();
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
    var { valueRecode } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>TỔNG HỢP CÔNG ĐOẠN</h1>
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
            <div className="input-group inputSeach">
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
            </div>
          </form>
          <TableContentTongHop>
            {this.showContentItems(valueRecode)}
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
