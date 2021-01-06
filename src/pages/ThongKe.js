import React, { Component } from "react";
import TableContentThongKe from "../components/comThongKe/tableContentThongKe/TableContentThongKe";
import axios from "axios";
import * as Config from "../untils/Config";
import $, { event } from "jquery";
import TableItemThongKe from "../components/comThongKe/TableItemThongKe/TableItemThongKe";
var arrayRecode = [];
var load = [];
class ThongKe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecode: [],
      valueRecodeGetDay: [],
      keyword: "",
      dateIn: "",
      dateOut: "",
    };
  }
  onSearch = (keyword) => {
    console.log(keyword);
    this.setState({
      keyword: keyword.toLowerCase(),
    });
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
          scrollX: true,
          scrollY: 450,
          paging: false,
        });
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
      valueRecodeGetDay: [],
      keyword: "",
    });
    this.LoadData();
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
        arrayRecode.sort().reverse();
        this.setState({
          valueRecode: arrayRecode,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  LoadData = () => {
    this.setState({
      valueRecode: load,
    });
    this.dataTableLoad();
  };
  //-----------------------------------
  // lọc ngày hàm
  FilterDate = () => {
    var { valueRecode, dateIn, dateOut } = this.state;
    var dateFormat = require("dateformat");
    var dateBefore = new Date(dateFormat(dateIn, "yyyy,mm,dd"));
    var dateAfter = new Date(dateFormat(dateOut, "yyyy,mm,dd"));
    var arrayRecodeToDate = [];
    dateAfter.setDate(dateAfter.getDate() + 1);

    if (dateBefore.getTime() < dateAfter.getTime()) {
      for (var k in valueRecode) {
        const dateRecord = new Date(valueRecode[k].ReadTime * 1000); // ngày trong record
        if (
          dateRecord.getTime() >= dateBefore.getTime() &&
          dateRecord.getTime() <= dateAfter.getTime()
        ) {
          arrayRecodeToDate.push(valueRecode[k]);
        }
      }
    } else {
      alert("Lỗi! Khoản thời gian không hợp lệ.");
    }
    if (arrayRecodeToDate.length == 0) {
      alert("Không có dữ liệu trong thời gian chọn!");
    } else {
      this.setState({
        valueRecodeGetDay: arrayRecodeToDate,
        keyword: "",
      });
    }

    this.LoadData();
  };
  /*------------------------------------- */
  // kiểm tra đồng ý xuất excel
  checkExcel = () => {
    var functionExcel = window.confirm("Bạn muốn xuất file Excel?");
    if (functionExcel) {
      this.exportTableToExcel();
    }
  };
  // xuất file excel
  exportTableToExcel = () => {
    var downloadLink;
    var dataType = "application/vnd.ms-excel";
    var tableSelect = document.getElementById("ttableData");
    var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");
    var filename = "nkl";
    // Specify file name
    filename = filename ? filename + ".xls" : "excel_data.xls";

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff", tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = "data:" + dataType + ", " + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  };
  loadPage = () => {
    window.location.reload();
  };
  render() {
    var {
      valueRecode,
      valueRecodeGetDay,
      dateIn,
      dateOut,
      keyword,
    } = this.state;
    if (keyword) {
      // render ra nội dung khi tìm kiếm
      valueRecodeGetDay = valueRecodeGetDay.filter((valueRecodeGetDay) => {
        return (
          valueRecodeGetDay.ProcessId.toLowerCase().indexOf(keyword) !== -1 ||
          valueRecodeGetDay.ProcessName.toLowerCase().indexOf(keyword) !== -1 ||
          valueRecodeGetDay.DeviceName.toLowerCase().indexOf(keyword) !== -1 ||
          valueRecodeGetDay.ModelName.toLowerCase().indexOf(keyword) !== -1 ||
          valueRecodeGetDay.Classify.toLowerCase().indexOf(keyword) !== -1 ||
          valueRecodeGetDay.Weight.toLowerCase().indexOf(keyword) !== -1 ||
          valueRecodeGetDay.EmployeeName.toLowerCase().indexOf(keyword) !==
            -1 ||
          valueRecodeGetDay.CardId.toLowerCase().indexOf(keyword) !== -1
        );
      });
    }
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
            <div>
              <button
                id="btnLoc"
                type="button"
                className=" form-control form-group btn btn-warning  btn-ladda"
                data-style="expand-left"
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
                Làm mới dữ liệu
              </button>
            </div>
            <div>
              <button
                id="btnLoc"
                type="button"
                className="form-control "
                onClick={this.checkExcel}
              >
                Xuất Excel
              </button>
            </div>
          </form>
          <TableContentThongKe onSearch={this.onSearch}>
            {this.showContentItems(valueRecodeGetDay)}
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
