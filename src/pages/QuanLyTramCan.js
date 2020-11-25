import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import TableContentTramCan from "../components/comQLTramCan/tableContentTramCan/TableContentTramCan";
import TableContentItemTramCan from "../components/comQLTramCan/tableItemTramCan/TableContentItemTramCan";
import $ from "jquery";
import * as Config from "../untils/Config";
var arrayValueModel = [];
class QuanLyTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentModel: [],
    };
  }
  /*-----------------------function get list device to api ---------------------------------- */
  componentDidMount() {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` + "/api/iotdevice/all?token=" + `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        this.setState({
          contentItems: res.data,
        });
        // tabledata giao diện
        $(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 5,
            processing: true,
            responsive: true,
            dom: "Bfrtip",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // hàm lấy danh sách công đoạn
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model",
      data: null,
    })
      .then((resModel) => {
        arrayValueModel = [];
        for (var k in resModel.data) {
          var Object = JSON.parse(resModel.data[k]);
          arrayValueModel.push(Object);
        }
        this.setState({
          contentModel: arrayValueModel,
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
  onEdit=(Id)=>{
    
  }
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
    var { contentItems, contentModel } = this.state;
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
                      id="nameDevice"
                      value
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="area" id="areaDevice">
                      <h5> Type:</h5>
                    </label>

                    <form onChange={this.onChangeValue}>
                      <label className="radio-inline">
                        <input type="radio" name="optradio" value="In" />
                        <b>1. Input</b>
                      </label>
                      <label className="radio-inline">
                        <input type="radio" name="optradio" value="Out" />
                        <b>2. Output</b>
                      </label>
                      <label className="radio-inline">
                        <input type="radio" name="optradio" value="In-Out" />
                        <b>3. Input-Output</b>
                      </label>
                      <label className="radio-inline">
                        <input type="radio" name="optradio" value="M-In" />
                        <b>4. Mutil-Input</b>
                      </label>
                      <label className="radio-inline">
                        <input type="radio" name="optradio" value="M-out" />
                        <b>5.Mutil-Output</b>
                      </label>
                    </form>
                  </div>
                  <div className="form-group">
                    <label htmlFor="area" id="areaDevice">
                      <h5> Công đoạn:</h5>
                    </label>
                    <select className="form-control" id="area">
                      {this.showContentSelect(contentModel)}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
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
            onEdit= {this.onEdit}
          />
        );
      });
    }
    return result;
  }
  // Hiển thị thông tin list công đoạn vào select trong chỉnh sửa thiết bị
  showContentSelect(contentModel) {
    var result = null;
    if (contentModel.length >= 0) {
      result = contentModel.map((contentItem, index) => {
        return <option key={index}>{contentItem.Name}</option>;
      });
    }
    return result;
  }
}
export default QuanLyTramCan;
