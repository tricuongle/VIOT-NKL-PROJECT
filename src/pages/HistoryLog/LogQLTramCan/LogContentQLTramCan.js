import { Component } from "react";
import LogTableContent from "../LogTableContent";
import LogItemQLTramCan from "../LogQLTramCan/LogItemQLTramCan";
import axios from "axios";
import * as Config from "../../../untils/Config";
var arrayValueLog = [];
var load = [];

class LogContentQLTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueContentLog: [],
      valueContentLogSortTime: [],
    };
  }
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Device-Log",
      data: null,
    })
      .then((res) => {
        arrayValueLog = [];
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          arrayValueLog.push(contentItem);
        });
        arrayValueLog.sort().reverse();
        this.setState({
          valueContentLog: arrayValueLog,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // lọc ngày hàm
  FilterDate = () => {
    var dateIn = document.getElementById("filter-dateIn").value;
    var dateOut = document.getElementById("filter-dateOut").value;
    var { valueContentLog } = this.state;
    var dateFormat = require("dateformat");
    var dateBefore = new Date(dateFormat(dateIn, "yyyy,mm,dd"));
    var dateAfter = new Date(dateFormat(dateOut, "yyyy,mm,dd"));
    var arrayRecodeToDate = [];
    dateAfter.setDate(dateAfter.getDate() + 1);

    if (this.state.valueContentLog.length == 0) {
      alert("Đang tải dữ liệu, vui lòng đợi và thử lại...");
    } else {
      if (dateBefore.getTime() < dateAfter.getTime()) {
        for (var k in valueContentLog) {
          const dateRecord = new Date(valueContentLog[k].time * 1000); // ngày trong record
          console.log(dateRecord);
          if (
            dateRecord.getTime() >= dateBefore.getTime() &&
            dateRecord.getTime() <= dateAfter.getTime()
          ) {
            arrayRecodeToDate.push(valueContentLog[k]);
          }
        }
      } else {
        alert("Lỗi! Khoản thời gian không hợp lệ.");
      }
      if (arrayRecodeToDate.length == 0) {
        alert("Không có dữ liệu trong khoảng thời gian chọn!");
      } else {
        this.setState({
          valueContentLogSortTime: arrayRecodeToDate,
        });
      }
    }
  };
  loadPage = () => {
    window.location.reload();
  };
  render() {
    var { valueContentLogSortTime } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>LỊCH SỬ QUẢN LÝ TRẠM CÂN</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Lịch sử quản lý trạm cân</li>
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
                name="dateIn"
                id="filter-dateIn"
                //value={dateIn}
                //onChange={this.onChange}
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
                //value={dateOut}
                //onChange={this.onChange}
              />
            </div>
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
                onClick={this.loadPage}
              >
                Làm mới trang
              </button>
            </div>
          </form>
          <LogTableContent>
            {this.showContentItems(valueContentLogSortTime)}
          </LogTableContent>
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <LogItemQLTramCan
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
export default LogContentQLTramCan;
