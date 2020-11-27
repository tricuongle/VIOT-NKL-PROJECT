import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import TableContentTramCan from "../components/comQLTramCan/tableContentTramCan/TableContentTramCan";
import TableContentItemTramCan from "../components/comQLTramCan/tableItemTramCan/TableContentItemTramCan";
import $ from "jquery";
import * as Config from "../untils/Config";
var arrayValueProcess = [];
var arrayValueDevice = [];
class QuanLyTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentProcess: [],
      contentDevice: "",
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
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

  componentDidMount() {
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
          if (Objvalue[k].Capabilitie == "WeighingStation") {
            arrayValueDevice.push(Objvalue[k]);
          }
        }
        if (Objvalue)
          this.setState({
            contentItems: arrayValueDevice,
          });
        // tabledata giao diện
        $(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 7,
            processing: true,
            responsive: true,
            dom: "Bfrtip",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*-----------------------function get list Model to api ---------------------------------- */
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
          arrayValueProcess.push(Object);
        }
        this.setState({
          contentProcess: arrayValueProcess,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // get value of radio button
  onChangeValue = (event) => {
    console.log(event.target.value);
  };
  onGetIdEdit = (IdDevice) => {
    /*--------------láy thông tin theo id---------------- */
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
            ObjectValueId = ObjectValue[k]
          }
        }
       this.setState({
          contentDevice: ObjectValueId,
        });
        console.log(this.state.contentDevice.Id);
        document.getElementById(
          "IdnameDevice"
        ).value = this.state.contentDevice.Name;
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  };
  onEditDevice = (event) => {
    event.preventDefault();
    var { contentDevice } = this.state;
    var Type = "";
    var checkbox = document.getElementsByName("Type");
    var Id = contentDevice.Id;
    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked === true) {
        Type = checkbox[i].value;
      }
    }
    var selectProcess = document.getElementById("idProcessList")
      .selectedOptions;
    let idProcess = "";
    for (let i = 0; i < selectProcess.length; i++) {
      idProcess += selectProcess[i].value + " ";
    }
    console.log(Id);
    console.log(Type);
    console.log(idProcess);
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/iotdevice/"+Id+"?token=" +
        `${Config.TOKEN}`,
      data: {
        "ProcessId": idProcess,
        "Type": Type
    },
    })
      .then((res) => {
        console.log("ok");
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi rồi");
      });
  };
  /*-------------- Hàm xử lý gọi api cập nhập------------------------- */
  /*onUpdateSave = (event) => {
    event.preventDefault();
    //Description = document.getElementById("info").value;
    var { contentGetProcessId, Name, Level, Before, After } = this.state;
    var idEdit = contentGetProcessId.Id;
    valueNew =
      '{"Id":"' +
      idEdit +
      '","Name":"' +
      Name +
      '","Level":' +
      Level +
      ',"Parent":"' +
      idEdit +
      '","Before":"' +
      Before +
      '","After":"' +
      After +
      '"}';
    console.log(idEdit);
    console.log(valueNew);
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/putkey?token=" +
        `${Config.TOKEN}` +
        "&classify=Process&key=" +
        idEdit +
        "&value=" +
        valueNew +
        "&Description=nkl",
      data: null,
    })
      .then((res) => {
        console.log(res);
        alert("Sửa khu vực " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };*/
  render() {
    var { contentItems, contentProcess } = this.state;
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
                      <select className="form-control" id="idProcessList">
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
          <option key={index} value={contentItem.Id}>
            {contentItem.Name}
          </option>
        );
      });
    }
    return result;
  }
}
export default QuanLyTramCan;
