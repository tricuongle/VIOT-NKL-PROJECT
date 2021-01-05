import { Component } from "react";
import LogTableQLCongNhan from "./LogTableQLCongNhan";
import LogItemQLCongNhan from "./LogItemQLCongNhan";
import $ from "jquery";
import axios from "axios";
import * as Config from "../../../untils/Config";
var arrayValueLog = [];

class LogContentQLCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueContentLog: [],
    };
  }
  componentDidMount = () => {
    var contentLog = {
      ValueOld: {
        Id: "CN-NKL-030",
        Name: "Tổ Xẻ Bướm",
        gender: "",
        CMND: "",
        CardNo: "1",
        BirthDay: "",
        User: "",
        PassWord: "",
        IsLock: true,
        JobLevel: 3,
        Department: "",
        Description: "công nhân NKL",
      },
      ValueNew: {
        Id: "CN-NKL-030",
        Name: "Tổ Xẻ Bướm123",
        gender: "",
        CMND: "",
        CardNo: "1",
        BirthDay: "",
        User: "",
        PassWord: "",
        IsLock: true,
        JobLevel: 3,
        Department: "",
        Description: "công nhân NKL",
      },
      time: 1609862768526
    };
    arrayValueLog.push(contentLog);
    this.setState({
      valueContentLog: arrayValueLog,
    });
    //---------test-------------

    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee-Log",
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
      
  };
  render() {
    var { valueContentLog } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>LỊCH SỬ QUẢN LÝ CÔNG NHÂN</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Lịch sử quản lý công nhân</li>
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
                //onClick={this.FilterDate}
              >
                Lọc tìm kiếm
              </button>
            </div>
          </form>
          <LogTableQLCongNhan>
            {this.showContentItems(valueContentLog)}
          </LogTableQLCongNhan>
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <LogItemQLCongNhan
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
export default LogContentQLCongNhan;
