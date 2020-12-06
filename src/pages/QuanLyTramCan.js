import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import TableContentTramCan from "../components/comQLTramCan/tableContentTramCan/TableContentTramCan";
import TableContentItemTramCan from "../components/comQLTramCan/tableItemTramCan/TableContentItemTramCan";
import $ from "jquery";
import * as Config from "../untils/Config";
var arrayValueProcess = [];
var arrayValueDevice = [];
var ObjValue;
var load = [];
var ArrayValue = [];
class QuanLyTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentProcess: [],
      contentSection: [],
      contentDevice: "",
      // name process convert to ProcessID
      nameProcessConvert: [],
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
    /* xử lý mutiple với Type 4 và 5 */
    if (
      document.getElementById("idType4").checked ||
      document.getElementById("idType5").checked
    ) {
      document.getElementById("idProcessList").multiple = "multiple";
    } else if (
      !document.getElementById("idType4").checked ||
      !document.getElementById("idType5").checked
    ) {
      document.getElementById("idProcessList").multiple = "";
    }
  };

  componentDidMount = () => {
    /*-----------------------function get list device to api ---------------------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` + "/api/iotdevice/all?token=" + `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        arrayValueDevice = [];
        var Objvalue = res.data;
        for (var k in Objvalue) {
          // so sánh trùng tên thì lấy cho vào mảng
          if (Objvalue[k].Capabilitie == "WeighingStation") {
            arrayValueDevice.push(Objvalue[k]);
          }
        }
        this.setState({
          contentItems: arrayValueDevice,
        });
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 350,
        });
      })
      .catch((err) => {
        console.log("Lỗi láy thông tin device ( cân)");
        console.log(err);
      });
  };

  onGetIdEdit = (IdDevice) => {
    /*-----------------------function get list process to api ---------------------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process",
      data: null,
    })
      .then((resProcess) => {
        arrayValueProcess = [];
        for (var k in resProcess.data) {
          var Object = JSON.parse(resProcess.data[k]);
          if (Object.status == true) {
            arrayValueProcess.push(Object);
          }
        }
        this.setState({
          contentProcess: arrayValueProcess,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi láy thông tin công đoạn");
      });
    /*--------------láy thông tin theo id truyền vào từ hàng trong bảng---------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` + "/api/iotdevice/all?token=" + `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        var ObjectValue = res.data;
        var ObjectValueId;
        for (var k in ObjectValue) {
          if (ObjectValue[k].Id == IdDevice) {
            ObjectValueId = ObjectValue[k];
          }
        }
        this.setState({
          contentDevice: ObjectValueId,
        });
        document.getElementById(
          "IdnameDevice"
        ).value = this.state.contentDevice.Name;
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
    /*-----------------Lấy thông tin section và đổ vào select----------------------------- */
    axios({
      method: "GET",
      url: `${Config.API_URL}` + "/api/section/All?token=" + `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        var varrArraySection = [];
        for (var k in res.data) {
          if (res.data[k].Zone == 1) {
            varrArraySection.push(res.data[k]);
          }
        }
        this.setState({
          contentSection: varrArraySection,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi lấy thông tin khu vực - sections");
      });
  };
  /*---------------------Chỉnh sửa thông tin câm ------------------------- */
  onEditDevice = (event) => {
    event.preventDefault();
    var { contentDevice } = this.state;
    var Type = "";
    var checkbox = document.getElementsByName("Type");
    var Id = contentDevice.Id;
    var selectProcess = document.getElementById("idProcessList") // thêm công đoạn từ select vào một mảng
      .selectedOptions;
    let idProcess = "";
    var idSection = document.getElementById("idSection").value; // lấy id section
    for (let i = 0; i < selectProcess.length; i++) {
      idProcess += selectProcess[i].value + ",";
    }
    for (var i = 0; i < checkbox.length; i++) {
      // quét vòng for trong nhóm radio.
      if (checkbox[i].checked === true) {
        Type = checkbox[i].value;
      }
    }

    if (Type === "") {
      alert("Vui lòng chọn Type phù hợp!");
    } else {
      axios({
        method: "PUT",
        url:
          `${Config.API_URL}` +
          "/api/iotdevice/" +
          Id +
          "?token=" +
          `${Config.TOKEN}`,
        data: {
          ProcessId: idProcess,
          Type: Type,
          //SectionId: idSection
        },
      })
        .then((res) => {
          alert("Sửa thành thiết bị cân công !");
          this.LoadData();
        })
        .catch((err) => {
          console.log(err);
          console.log("Lỗi rồi");
        });
    }
  };
  // load dữ liệu lại
  dataTableLoad = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` + "/api/iotdevice/all?token=" + `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        arrayValueDevice = [];
        var Objvalue = res.data;
        for (var k in Objvalue) {
          if (Objvalue[k].Capabilitie == "WeighingStation") {
            arrayValueDevice.push(Objvalue[k]);
          }
        }
        this.setState({
          contentItems: arrayValueDevice,
        });
        console.log(this.state.contentItems);
      })
      .catch((err) => {
        console.log("Lỗi láy thông tin device ( cân)");
        console.log(err);
      });
  };
  LoadData = () => {
    this.setState({
      contentItems: load,
    });
    this.dataTableLoad();
  };
  /*------------------------------------- */

  render() {
    var { contentItems, contentProcess, contentSection } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>QUẢN LÝ TRẠM CÂN</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Quản lý trạm cân</li>
          </ol>
        </section>

        <section className="content">
          <form className="filter-section form-inline">
            <div className="input-group inputSeach">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.LoadData}
              >
                Làm mới dữ liệu
              </button>
            </div>
          </form>
          <TableContentTramCan>
            {this.showContentItems(contentItems)}
          </TableContentTramCan>
          {/*----------------------------Edit device--------------------------------*/}
          <form onSubmit={this.onEditDevice}>
            <div className="modal fade" id="modal-edit">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                    <h4 className="modal-title">Chỉnh sửa trạm cân</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên thiết bị:</h5>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="IdnameDevice"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Chọn khu vực</h5>
                      </label>
                      <br />
                      <select
                        name="SectionlId"
                        id="idSection"
                        className="form-control"
                        required="required"
                      >
                        <option value="">---Chọn khu vực---</option>
                        {this.showContentSelect(contentSection)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="area">
                        <h5> Type:</h5>
                      </label>
                      <h6>
                        {" "}
                        Trên máy tính nếu chọn Type 4,5 nhấn giữ phím Ctrl để
                        chọn nhiều công đoạn
                      </h6>
                      <br />
                      <label className="radio-inline">
                        <input
                          type="radio"
                          onChange={this.onChange}
                          name="Type"
                          id="idType1"
                          value="In"
                        />
                        <b>1. Input</b>
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          onChange={this.onChange}
                          name="Type"
                          id="idType2"
                          value="Out"
                        />
                        <b>2. Output</b>
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          onChange={this.onChange}
                          name="Type"
                          id="idType3"
                          value="In-Out"
                        />
                        <b>3. Input-Output</b>
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          onChange={this.onChange}
                          name="Type"
                          id="idType4"
                          value="Multi-In"
                        />
                        <b>4. Multi-Input</b>
                      </label>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          onChange={this.onChange}
                          name="Type"
                          id="idType5"
                          value="Multi-out"
                        />
                        <b>5.Multi-Output</b>
                      </label>
                    </div>
                    <div className="form-group" onChange={this.onChange}>
                      <label htmlFor="area" id="areaDevice">
                        <h5> Công đoạn:</h5>
                      </label>
                      <select
                        className="form-control"
                        id="idProcessList"
                        required="required"
                      >
                        <option value="">---Chọn công đoạn---</option>
                        {this.showContentSelect(contentProcess)}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Lưu thay đổi
                    </button>
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                    >
                      Thoát
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }

  // truyền dữ liệu vào table hiển thị lên
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableContentItemTramCan
            key={index}
            contentItem={contentItem}
            index={index}
            onGetIdEdit={this.onGetIdEdit}
            reLoadComponent={this.reLoadComponent}
          />
        );
      });
    }
    return result;
  }
  // Hiển thị thông tin list công đoạn vào select trong chỉnh sửa thiết bị
  showContentSelect(contentProcess) {
    var result = null;
    if (contentProcess.length >= 0) {
      result = contentProcess.map((contentItem, index) => {
        return (
          <option key={index} name={contentItem.Name} value={contentItem.Id}>
            {contentItem.Name}
          </option>
        );
      });
    }
    return result;
  }
}
export default QuanLyTramCan;
