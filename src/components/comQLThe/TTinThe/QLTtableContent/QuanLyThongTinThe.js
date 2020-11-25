import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import QLTTableContentThe from "./QLTTableContentThe";
import QLTTableContentItemThe from "../QLTtableItems/QLTTableContentItemThe";
import $ from "jquery";
import * as Config from "../../../../untils/Config";
var JsonValue;
var ArrayValue = [];
var arrayValueModel = [];
var arrayValueProcess = [];
class QuanLyThongTinThe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentGetCardId: "",
      contentModel: "",
      contentProcess: "",
      filter: {
        name: "",
        status: -1,
      },
      Id: "",
      Employee: "",
      Color: "",
      RegistTime: null,
      Status: "",
      ProcessId: "",
      ModelId: "",
      Classify: "",
      RFID: "",
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  /*---------get thông tin thẻ---------*/
  componentDidMount() {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Card",
      data: null,
    })
      .then((res) => {
        ArrayValue = []; // load lại data
        for (var i = 0; i < res.data.length; i++) {
          JsonValue = JSON.parse(res.data[i]);
          ArrayValue.push(JsonValue);
        }
        this.setState({
          contentItems: ArrayValue,
        });
        console.log(this.state.contentItems);
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
  }
  getIDChange = (idCard, idEmpl, nameEmp, nameModel, nameProcess) => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Card&key=" +
        idCard,
      data: null,
    })
      .then((res) => {
        var temp = JSON.parse(res.data);
        this.setState({
          contentGetCardId: temp,
        });
        document.getElementById("idCard").value = idCard;
        document.getElementById("idNameEml").value = nameEmp;
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
    /*--------Lấy danh sách select công đoạn mã cá --------------*/
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
    /*--------Lấy danh sách select khu vực --------------*/
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
  };

  onEditCard = (event) => {
    event.preventDefault();
  };
  render() {
    var { contentItems, contentProcess, contentModel } = this.state;
    console.log(contentItems);
    console.log(contentModel);
    console.log(contentProcess);
    return (
      <div>
        <section className="content">
          <QLTTableContentThe onSearch={this.onSearch}>
            {this.showContentItems(contentItems)}
          </QLTTableContentThe>

          <div className="modal fade" id="modal-edit">
            <from onSubmit={this.onEditCard}>
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
                    <h4 className="modal-title">Sửa thông tin thẻ</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="usr">ID Thẻ</label>
                      <input
                        type="text"
                        className="form-control"
                        id="idCard"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên nhâ viên:</h5>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="idNameEml"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="area" id="areaDevice">
                        <h5> Khu vực:</h5>
                      </label>
                      <select className="form-control" id="idSelectFS">
                        {/*this.showContentSelectProcess(contentProcess)*/}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="area" id="areaDevice">
                        <h5> Công đoạn:</h5>
                      </label>
                      <select className="form-control" id="area">
                        {/*this.showContentSelect(contentModel)*/}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="area" id="areaDevice">
                        <h5> Màu thẻ:</h5>
                      </label>
                      <select className="form-control" id="area">
                        <option>Xanh</option>
                        <option>Đỏ</option>
                        <option>Vàng</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Lưu
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
            </from>
          </div>

          <div className="modal fade" id="modal-Delete">
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
                  <h4 className="modal-title">Xóa thẻ</h4>
                </div>
                <div className="modal-body">
                  <h5>Bạn có đồng ý xóa thẻ này không?</h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    Xóa thẻ
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
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <QLTTableContentItemThe
            key={index}
            contentItem={contentItem}
            index={index}
            getIDChange={this.getIDChange}
          />
        );
      });
    }
    return result;
  }
 /* showContentSelect(contentModel) {
    var result = null;
    if (contentModel.length >= 0) {
      result = contentModel.map((contentItem, index) => {
        return <option key={index}>{contentItem.Name}</option>;
      });
    }
    return result;
  }
  /*showContentSelectProcess(contentProcess) {
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
  }*/
}
export default QuanLyThongTinThe;
