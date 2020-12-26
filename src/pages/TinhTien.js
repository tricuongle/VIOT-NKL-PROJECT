import React, { Component } from "react";
import TableContentTinhtien from "../components/comTinhTien/tableContentTinhTien/TableContentTinhtien";
import axios from "axios";
import * as Config from "../untils/Config";
import $, { event } from "jquery";
import TableItemTinhTien from "../components/comTinhTien/TableItemTinhTien/TableItemTinhTien";
import TableContentTinhTien from "../components/comTinhTien/tableContentTinhTien/TableContentTinhtien";
import * as Enumerable from "linq";

var arrayRecode = [];
var arrayFishCode = [];
var valueRecordGroup = [];
var valueRecordGroupModel = [];
var arr = [];
class TinhTien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecode: [],
      valueFishCode: [],
      valueRecodeGetDay: [],
      valueRecodeGroupBy: [],
      valueRecodeModelGroupBy: [],
      valueGroupModelToCell: [],
    };
  }
  componentDidMount = () => {
    // lấy giá trị Record Out
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
        var { valueRecode } = this.state;
        var groupByRecord = this.groupByRecordOut(valueRecode); //
        var groupByModelRecord = this.groupByModelRecordOut(groupByRecord); //
        var groupModelToCell = this.groupByModelInObj(groupByRecord);
        this.setState({
          valueRecodeGroupBy: groupByRecord,
          valueRecodeModelGroupBy: groupByModelRecord,
          valueGroupModelToCell: groupModelToCell,
        });
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 450,
          paging: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // lấy giá trị Fish code định giá mã cá
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=FishCode",
      data: null,
    })
      .then((res) => {
        arrayFishCode = [];
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          arrayFishCode.push(contentItem);
        });
        this.setState({
          valueFishCode: arrayFishCode,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //-------- hàm group by record Out-----------------
  groupByRecordOut = (valueRecord) => {
    var { valueFishCode } = this.state;
    var arrValueRecordNew = [];
    var arrDisableUn = [];
    for (var h in valueRecord) {
      if (valueRecord[h].ModelName != undefined) {
        arrDisableUn.push(valueRecord[h]);
      }
    }
    for (var k in arrDisableUn) {
      arrDisableUn[k].Weight = parseFloat(arrDisableUn[k].Weight); // convert khối lượng sang float
    }
    for (var k in valueFishCode) {
      for (var j in arrDisableUn) {
        // làm tròn khối lượng
        var weightRound = Math.round(arrDisableUn[j].Weight * 10) / 10;
        arrDisableUn[j].Weight = weightRound;
        if (
          arrDisableUn[j].Model == valueFishCode[k].ModelId &&
          weightRound == valueFishCode[k].Weight
        ) {
          arrDisableUn[j].Weight *= valueFishCode[k].Price;
          arrValueRecordNew.push(arrDisableUn[j]); // đợi
        }
      }
    }
    // linq
    valueRecordGroup = Enumerable.from(arrDisableUn)
      .groupBy(
        "{ PL1: $.EmployeeName , PL3: $.ModelName }",
        "$.Weight || 0",
        "{ EmployeeName: $.PL1,ModelName: $.PL3,Money: $$.sum() }",
        "'' + $.PL1 +'-' + $.PL3"
      )
      .toArray();
    return valueRecordGroup;
  };
  groupByModelRecordOut = (valueRecord) => {
    // linq
    valueRecordGroupModel = Enumerable.from(valueRecord)
      .groupBy(
        "{ PL3: $.ModelName }",
        "$.Weight || 0",
        "{ ModelName: $.PL3 }",
        "$.PL3"
      )
      .toArray();

    return valueRecordGroupModel;
  };
  groupByModelInObj = (valueRecord) => {
    arr = [];
    var arr123 = [];
    var arrNameEmp = [];

    for (var k = 0; k < valueRecord.length; k++) {
      if (
        arrNameEmp.indexOf(valueRecord[k].EmployeeName) == -1 &&
        valueRecord[k].EmployeeName != undefined
      ) {
        arr123 = [];
        var sumMoney = 0;
        for (var j = 0; j < valueRecord.length; j++) {
          if (valueRecord[j].EmployeeName == valueRecord[k].EmployeeName) {
            sumMoney += valueRecord[j].Money;

            var ObjectM = {
                ModelName: valueRecord[j].ModelName,
                Money: valueRecord[j].Money,
                
            };
            arr123.push(ObjectM);
          }
        }
        var ObjectModelNhom = {
          nameEmp: valueRecord[k].EmployeeName,
          listModel: arr123,
          sumMoney: sumMoney,
          arrAllModel: valueRecordGroupModel
        };
        arr.push(ObjectModelNhom);
        arrNameEmp.push(valueRecord[k].EmployeeName);
      }
    }
    console.log(arr);
    return arr;
  };
  render() {
    var {
      valueRecode,
      valueRecodeGetDay,
      valueRecodeGroupBy,
      valueRecodeModelGroupBy,
      valueGroupModelToCell,
    } = this.state;
    return (
      <div className="content-wrapper">
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
          <TableContentTinhtien data={valueRecodeModelGroupBy}>
            {this.showContentItems(valueGroupModelToCell)}
          </TableContentTinhtien>
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemTinhTien
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
export default TinhTien;
