import React, { Component } from "react";
import TableContentTongHop from "../components/comTongHop/tableContentTongHop/TableContentTongHop";
import TableItemTongHop from "../components/comTongHop/TableItemTongHop/TableItemTongHop";
import axios from "axios";
import * as Enumerable from "linq";

import * as Config from "../untils/Config";
import $, { event } from "jquery";
var arrayRecode = [];
var arrayRecodeIn = [];
var load = [];
var RecordGroup = [];

var sumOut = 0;
var temp;
var dayToDay2 = "---";
var countScan = 0;
let scanDataTableOff = 0;
class TongHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecode: [],
      valueRecodeIn: [],
      valueRecordGroup: [],
      valueRecordInGroup: [],
      sumWeightOut: "0.00", // tổng weight Out
      sumWeightIn: "0.00", // tổng weight Out
    };
  }
  // --- hàm lấy ngày /tháng /năm
  convertData = (data) => {
    const date = new Date(data * 1000);
    var dateFormat = require("dateformat");
    var dateNew = dateFormat(date, "dd/mm/yyyy");
    return dateNew;
  };
  //-------- hàm group by record In-----------------
  groupByRecordIn = (valueReWeight) => {
    for (var k in valueReWeight) {
      valueReWeight[k].Weight = parseFloat(valueReWeight[k].Weight); // convert khối lượng sang float
    }
    // linq
    RecordGroup = Enumerable.from(valueReWeight) // tính tổng đầu vào theo mã cá group by
      .groupBy(
        "{ PL1: $.ProcessName , PL2: $.ModelName }",
        "$.Weight || 0",
        "{ ProcessName: $.PL1,ModelName: $.PL2, WeightIn : $$.sum()}",
        "'' + $.PL1 + ' ' + $.PL2"
      )
      .toArray();

    return RecordGroup;
  };
  //-------- hàm group by record Out-----------------
  groupByRecordOut = (valueReWeight) => {
    for (var k in valueReWeight) {
      valueReWeight[k].Weight = parseFloat(valueReWeight[k].Weight); // convert khối lượng sang float
    }
    // linq
    RecordGroup = Enumerable.from(valueReWeight) // tính tổng đầu vào theo mã cá group by
      .groupBy(
        "{ PL1: $.ProcessName , PL2: $.ModelName }",
        "$.Weight || 0",
        "{ ProcessName: $.PL1,ModelName: $.PL2,WeightIn :0, WeightOut : $$.sum()}",
        "'' + $.PL1 + ' ' + $.PL2"
      )
      .toArray();

    return RecordGroup;
  };
  //--- tính tổng khối lượng record Out
  sumWeightRecordGroupOut = (valueRecordGroup) => {
    sumOut = 0;
    for (var w in valueRecordGroup) {
      sumOut += valueRecordGroup[w].WeightOut;
    }
    return sumOut;
  };
  //--- tính tổng khối lượng record Out
  sumWeightRecordGroupIn = (valueRecordGroup) => {
    sumOut = 0;
    for (var w in valueRecordGroup) {
      sumOut += valueRecordGroup[w].WeightIn;
    }
    return sumOut;
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
        var dateGetTimeNow = date.getTime() + " ";
        var dateGetTimeNowSubString = dateGetTimeNow.substring(0, 10);
        dayToDay2 =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          var dayRawData = this.convertData(contentItem.ReadTime); // lấy thời gian trong record
          var dayToDay = this.convertData(dateGetTimeNowSubString); // lấy thời gian trong record
          // so sánh ngày
          if (dayRawData == dayToDay) {
            arrayRecode.push(contentItem);
          }
        });
        arrayRecode.sort().reverse(); // sort đảo mảng
        //--- lấy record In bỏ vào mảng
        for (var i in arrayRecode) {
          if (
            arrayRecode[i].RecordIn != "" &&
            arrayRecode[i].RecordIn != undefined
          ) {
            axios({
              method: "GET",
              url:
                `${Config.API_URL}` +
                "/api/data/valuekey?token=" +
                `${Config.TOKEN}` +
                "&Classify=Record-In&key=" +
                arrayRecode[i].RecordIn,
              data: null,
            }).then((res) => {
              temp = JSON.parse(res.data);
              arrayRecodeIn.push(temp);
              this.setState({
                valueRecodeIn: arrayRecodeIn,
              });
              // gọi hàm group by Record và đưa giá trị record out vào
              var RecordInGroup = this.groupByRecordIn(
                this.state.valueRecodeIn
              );
              this.setState({
                valueRecordInGroup: RecordInGroup,
              });
              var { valueRecordInGroup, valueRecordGroup } = this.state;
              // tính tổng khối lượng
              var sumInWeight = this.sumWeightRecordGroupIn(valueRecordInGroup);
              this.setState({
                sumWeightIn: sumInWeight.toFixed(2),
              });
              // --- loop tìm mã cá tương ứng với record In và Out
              var ObjectGroupRecord;
              for (var k in valueRecordGroup) {
                for (var j in valueRecordInGroup) {
                  if (
                    valueRecordGroup[k].ModelName ==
                      valueRecordInGroup[j].ModelName &&
                    valueRecordGroup[k].ProcessName ==
                      valueRecordInGroup[j].ProcessName
                  ) {
                    // gộp Object với nhau
                    ObjectGroupRecord = Object.assign(
                      {},
                      valueRecordGroup[k],
                      valueRecordInGroup[j]
                    );
                    valueRecordGroup[k] = ObjectGroupRecord;
                  }
                }
              }
              // thay đổi lại giá trị valueRecordGroup trong state
              this.setState({ valueRecordGroup: valueRecordGroup });
            });
          }
        }
        this.setState({
          valueRecode: arrayRecode,
        });
        if (this.state.valueRecode == "") {
          alert("Thông báo, chưa có dữ liệu mới trong ngày " + dayToDay2);
        }
        // gọi hàm group by Record và đưa giá trị record out vào
        var RecordOutGroup = this.groupByRecordOut(this.state.valueRecode);

        this.setState({
          valueRecordGroup: RecordOutGroup,
        });
        var { valueRecordGroup } = this.state;
        // tính tổng khối lượng
        var sumOutWeight = this.sumWeightRecordGroupOut(valueRecordGroup);
        this.setState({
          sumWeightOut: sumOutWeight.toFixed(2),
        });
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: false,
          scrollY: 350,
          paging: false,
        });
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
  showPage = () => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  };
  render() {
    var { valueRecordGroup, sumWeightOut, sumWeightIn } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            TỔNG HỢP CÔNG ĐOẠN TRONG NGÀY <b>{dayToDay2}</b>
          </h1>
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
            <h4 id="idWeight">
              Tổng khối lượng Vào: <b>{sumWeightIn}</b> Kg
              <br />
              Tổng khối lượng Ra: <b>{sumWeightOut}</b> Kg
            </h4>
            <h4></h4>
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
