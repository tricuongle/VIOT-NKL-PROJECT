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
var arrayPara = [];
var arrayParaNew = [];
var arrParaConcar = [];
var Type = "";
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
    document.getElementById("btnEditDevice").disabled = false;
    document.getElementById("checkEditDevice").innerHTML =
      "Cảnh báo: thay đổi quan trong,<br/> có thể lỗi hệ thống nếu chọn sai!";
    /* xử lý mutiple với Type 4 và 5 
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
    }*/
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
    document.getElementById("btnEditDevice").disabled = false;

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
        arrayPara = JSON.parse(this.state.contentDevice.Status.Para); // lấy value para và chuyển Object
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
  /*---------------------Chỉnh sửa thông tin câm - thêm type và process ------------------------- */
  CheckOK = () => {
    var checkInfo = window.confirm("Bạn muốn thêm Type và công đoạn mới này?");
    if (checkInfo) {
      this.addValuePara();
    }
  };
  // thêm giá trị vào mảng Para
  addValuePara = () => {
    var { contentDevice } = this.state;
    var Object = {};
    Type = "";
    let idProcess = "";
    var checkbox = document.getElementsByName("Type");
    var selectProcess = document.getElementById("idProcessList") // thêm công đoạn từ select vào một mảng
      .selectedOptions;
    for (let i = 0; i < selectProcess.length; i++) {
      idProcess += selectProcess[i].value;
    }
    for (var i = 0; i < checkbox.length; i++) {
      // quét vòng for trong nhóm radio.
      if (checkbox[i].checked === true) {
        Type = checkbox[i].value;
      }
    }
    Object = {
      ProcessId: idProcess,
      Type: Type,
      ModelId: "",
      CurrentGroupModel: "",
    };
    arrayParaNew = [];
    var checkProcess = 1;
    for (var i = 0; i < arrayPara.length; i++) {
      if (Object.ProcessId == arrayPara[i].ProcessId) {
        alert("Lựa chọn đã tồn tại!");
        checkProcess = 0;
        break;
      }
    }
    if(checkProcess==1){
      arrayParaNew.push(Object);
    }
    arrParaConcar = arrayPara.concat(arrayParaNew); // gợp 2 mảng lại (mảng mới và mảng lấy từ API)

    // hiển thị thông tin ra màng hình
    var info = "";
    var valueInfo = "";
    for (var k = 0; k < arrayParaNew.length; k++) {
      var e = document.getElementById("idProcessList");
      var textProcess = e.options[e.selectedIndex].text;
      info =
        "●" + "Type: " + arrayParaNew[k].Type + "- Công đoạn: " + textProcess;
      valueInfo += info;
    }
    //document.getElementById("checkEditDevice").innerHTML = valueInfo;
  };

  // hàm edit thiết bị
  onEditDevice = (event) => {
    event.preventDefault();
    document.getElementById("btnEditDevice").disabled = true;

    var { contentDevice } = this.state;
    var Id = contentDevice.Id;
    this.addValuePara();
    var pareString = JSON.stringify(arrParaConcar); // chuyển về string
    console.log(pareString);
    //var idSection = document.getElementById("idSection").value; // lấy id section
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/iotdevice/" +
        Id +
        "?token=" +
        `${Config.TOKEN}`,
      data: {
        Para: pareString,
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
    var {
      contentItems,
      contentProcess,
      contentSection,
      contentDevice,
    } = this.state;

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

                      <p id="checkEditDevice">
                        Cảnh báo: thay đổi quan trong,
                        <br /> có thể lỗi hệ thống nếu chọn sai!
                      </p>
                      <br />
                      <label className="radio-inline">
                        <input
                          type="radio"
                          onChange={this.onChange}
                          name="Type"
                          id="idType1"
                          value="In"
                          required
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
                          required
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
                          required
                        />
                        <b>3. Input-Output</b>
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
                    {/*<button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.CheckOK}
                    >
                      Thêm
                    </button>*/}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="btnEditDevice"
                    >
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
