import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import TableContentTramCan from "../components/comQLTramCan/tableContentTramCan/TableContentTramCan";
import TableContentItemTramCan from "../components/comQLTramCan/tableItemTramCan/TableContentItemTramCan";
import $ from "jquery";
import * as Config from "../untils/Config";
import { Button } from "bootstrap";
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

    for (var k = 0; k < arrayParaNew.length; k++) {
      for (var j = 1; j < arrayPara.length; j++) {
        if (arrayParaNew[k].ProcessId == arrayPara[j].ProcessId) {
          arrayParaNew.splice(k, 1);
        }
      }
    }

    console.log(arrayParaNew);
    console.log(arrayPara);

    arrNewTest = arrayParaNew.concat( arrayPara);
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
    console.log(arrNewTest);
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
        arrayPara = JSON.parse(this.state.contentDevice.Status.Para);
        for (var k in arrayPara) {
          console.log(arrayPara[k].Type);
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

  // hàm edit thiết bị
  onEditDevice = (event) => {
    event.preventDefault();
    document.getElementById("btnEditDevice").disabled = true;

    var { contentDevice } = this.state;
    var Id = contentDevice.Id;
    //this.addValuePara();
    var pareString = JSON.stringify(arrParaConcar); // chuyển về string
    console.log(pareString);
    //var idSection = document.getElementById("idSection").value; // lấy id section
    /*axios({
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
      });*/
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
  addProcess = () => {
    var { contentProcess } = this.state;
    var arrayvalue = [];
    var arrayname = [];
    let valueHTML;
    this.Clear();
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
                    {this.addProcess()}
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
