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
var arrNewTest = [];
var arrParaConcar = [];
var Type = "";
var valueDeviceOld;

class QuanLyTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentProcess: [],
      contentSection: [],
      contentDevice: [],
      // name process convert to ProcessID
      nameProcessConvert: [],

      temp: null,
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var checkProcess = 1;
    var tempArrayPara = [];
    arrNewTest = [];

    // tạo object rỗng
    var ObjectValue = {
      ProcessId: "",
      Type: "",
      ModelId: "",
      CurrentGroupModel: "",
    };

    ObjectValue.ProcessId = name.substring(4);
    ObjectValue.Type = value;

    for (var k in arrayPara) {
      if (ObjectValue.ProcessId == arrayPara[k].ProcessId) {
        arrayPara[k].Type = ObjectValue.Type;
        arrayPara[k].ModelId = ObjectValue.ModelId;
        arrayPara[k].CurrentGroupModel = ObjectValue.CurrentGroupModel;
      }
    }

    // kiểm tra bỏ chọn
    if (ObjectValue.Type == "0") {
      for (var k in arrayParaNew) {
        if (ObjectValue.ProcessId == arrayParaNew[k].ProcessId) {
          arrayParaNew.splice(k, 1); // xóa phần tử trong mảng
        }
      }
    } else {
      // xử lý trùng
      for (var k in arrayParaNew) {
        if (ObjectValue.ProcessId == arrayParaNew[k].ProcessId) {
          if (ObjectValue.Type == arrayParaNew[k].Type) {
            checkProcess = 0;
            break;
          } else {
            arrayParaNew.splice(k, 1);
          }
        }
      }
      // xử lý nếu không trùng
      if (checkProcess == 1) {
        if (arrayPara.length == 0) {
          arrayParaNew.push(ObjectValue);
        } else {
          for (var k in arrayPara) {
            if (ObjectValue.ProcessId == arrayPara[k].ProcessId) {
              break;
            } else {
              arrayParaNew.push(ObjectValue);
              break;
            }
          }
        }
      }
    }
    for (var k = 0; k < arrayParaNew.length; k++) {
      for (var j = 1; j < arrayPara.length; j++) {
        if (arrayParaNew[k].ProcessId == arrayPara[j].ProcessId) {
          arrayParaNew.splice(k, 1);
        }
      }
    }

    arrNewTest = arrayParaNew.concat(arrayPara);
    for (var k in arrNewTest) {
      if (arrNewTest[k].Type == "0") {
        arrNewTest.splice(k, 1);
      }
    }
    for (var k in arrNewTest) {
      if (arrNewTest[k].Type == "0") {
        arrNewTest.splice(k, 1);
      }
    }
    for (var k in arrNewTest) {
      if (arrNewTest[k].Type == "0") {
        arrNewTest.splice(k, 1);
      }
    }
    for (var k in arrNewTest) {
      if (arrNewTest[k].Type == "0") {
        arrNewTest.splice(k, 1);
      }
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
        arrayValueDevice.sort().reverse(); // sort đảo mảng
        this.setState({
          contentItems: arrayValueDevice,
        });
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 350,
          paging: false,
        });
      })
      .catch((err) => {
        console.log("Lỗi láy thông tin device ( cân)");
        console.log(err);
      });
  };
// hàm edit thiết bị
  onGetIdEdit = (IdDevice, valueDevice) => {
  /*-----------------------function get list process to api ---------------------------------- */
    document.getElementById("btnEditDevice").disabled = false;
    valueDeviceOld = valueDevice;
    console.log(valueDeviceOld);
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
        // truyền giá trị vào popop chỉnh sửa
        document.getElementById("IdDevice").value = this.state.contentDevice.Id;
        document.getElementById(
          "IdnameDevice"
        ).value = this.state.contentDevice.Name;

        arrayPara = JSON.parse(this.state.contentDevice.Status.Para);
        for (var k in arrayPara) {
        } // lấy value para và chuyển Object
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
        arrayValueDevice.sort().reverse(); // sort đảo mảng
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
  /*----------------------------------------------------------- */
  clearRadioGroup = (GroupName) => {
    var ele = document.getElementsByName(GroupName);
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  };
  Clear = () => {
    var { contentProcess } = this.state;
    for (var k in contentProcess) {
      var nameG = "Type" + contentProcess[k].Id;
      this.clearRadioGroup(nameG);
    }
  };
  // hàm tạo type thiết bị
  addProcess = (contentProcess) => {
    //var { contentProcess } = this.state;
    var arrayvalue = [];
    var arrayname = [];
    let valueHTML;
    // hàm dọn sạch button radio khi lựa chọn device khác
    this.Clear();
    console.log(contentProcess);
    // vòng for tạo danh sách công đoạn
    for (var k = 0; k < contentProcess.length; k++) {
      arrayname.push(contentProcess[k].Id);
      valueHTML = (
        <div className="form-group">
          <br />
          <label className="radio-inline">
            <input
              type="radio"
              className="buttonType"
              onChange={this.onChange}
              name={"Type" + contentProcess[k].Id}
              id={"idTypeIn" + contentProcess[k].Id}
              value="In"
            />
            <b>1. Input</b>
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              className="buttonType"
              onChange={this.onChange}
              name={"Type" + contentProcess[k].Id}
              id={"idTypeOut" + contentProcess[k].Id}
              value="Out"
            />
            <b>2. Output</b>
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              className="buttonType"
              onChange={this.onChange}
              name={"Type" + contentProcess[k].Id}
              id={"idTypeInOut" + contentProcess[k].Id}
              value="In-Out"
            />
            <b>3. Input-Output</b>
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              className="buttonType"
              onChange={this.onChange}
              name={"Type" + contentProcess[k].Id}
              id={"idTypeUnCheck" + contentProcess[k].Id}
              value={0}
            />
            <b>4. bỏ chọn</b>
          </label>
          <h5 className="nameProcess"> {contentProcess[k].Name}</h5>
        </div>
      );
      // vòng for điền radio button cho công đooạn
      for (var j = 0; j < arrayPara.length; j++) {
        if (arrayPara[j].ProcessId == contentProcess[k].Id) {
          if (arrayPara[j].Type == "In") {
            document.getElementById(
              "idTypeIn" + contentProcess[k].Id
            ).checked = true;
          } else if (arrayPara[j].Type == "Out") {
            document.getElementById(
              "idTypeOut" + contentProcess[k].Id
            ).checked = true;
          } else if (arrayPara[j].Type == "In-Out") {
            document.getElementById(
              "idTypeInOut" + contentProcess[k].Id
            ).checked = true;
          }
        }
      }
      arrayvalue.push(valueHTML);
    }
    return arrayvalue;
  };
  // hàm random key value
  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };
  // hàm edit thiết bị
  onEditDevice = (event) => {
    event.preventDefault();
    this.onChange(event);
    for (var k in arrNewTest) {
      if (arrNewTest[k].ProcessId == "") {
        arrNewTest.splice(k, 1);
      }
    }
    document.getElementById("btnEditDevice").disabled = true;

    var { contentDevice } = this.state;
    var Id = contentDevice.Id;
    var tempContentDevice = contentDevice;
    var pareString = JSON.stringify(arrNewTest); // chuyển về string
    arrayParaNew = []; // trả mảng về rỗng
    var nameEditDevice = document.getElementById("IdnameDevice").value;
    var idSection = document.getElementById("idSection").value;

    tempContentDevice.Name = nameEditDevice;
    tempContentDevice.SectionId = idSection;
    tempContentDevice.Status.Para = pareString;

    // content value log
    var date = new Date();
    var dateGetTimeNow = date.getTime() + " ";
    var dateGetTimeNowSubString = dateGetTimeNow.substring(0, 10);
    var keyRandom = this.uuidv4();
    var valueLog = {
      ValueOld: valueDeviceOld,
      ValueNew: tempContentDevice,
      time: dateGetTimeNowSubString,
    };
    var valueLogString = JSON.stringify(valueLog);
    //---------------

    axios({
      method: "POST",
      url:
        `${Config.API_URL}` +
        "/api/iotdevice/UpdateAll?token=" +
        `${Config.TOKEN}`,
      data: tempContentDevice,
    })
      .then((res) => {
        alert("Sửa thiết bị cân thành công !");
        // lưu dữ liệu vào log
        axios({
          method: "POST",
          url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}`,
          data: {
            Key: keyRandom,
            Classify: "Device-Log",
            Value: valueLogString,
            Description: "Device NKL Log",
          },
        }).then((resDevice) => {
          console.log("Save data in log ok !");
        });
        this.LoadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                        <h5>ID thiết bị (chỉ xem):</h5>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="IdDevice"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên thiết bị:</h5>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="IdnameDevice"
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
                    {/* hàm sinh radio button */}
                    {this.addProcess(contentProcess)}
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
