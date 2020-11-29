import React, { Component } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
import TableContentKhuVuc from "../components/comQLKhuVuc/tableContentKhuVuc/TableContentKhuVuc";
import TableContentItemsKhuVuc from "../components/comQLKhuVuc/tableItemKhuVuc/TableContentItemsKhuVuc";
import ActionCreateKhuVuc from "../components/comQLKhuVuc/comQLKhuVucActions/ActionCreateKhuVuc";
import * as Config from "../untils/Config";
import $, { event } from "jquery";
var JsonValue;
var JsonTime;
var JsonDes;
var ArrayValue = [];
var turnOn;
var arrayValueModel = [];
var count;
var valueNew;
var Description;
var IdProcessOld;
class QuanLyKhuVuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentGetProcessId: "",
      filter: {
        name: "",
        status: 1, // filter (-1 tất cả, 1 đang làm, 0 đã nghỉ)
      },
      Id: "",
      Name: "",
      Level: 1,
      Parent: "",
      Before: "ProcessID (before)",
      After: "ProcessID (After)",
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
  /*-------------- Gọi API hiển thị danh sách process (khu vực)------------------ */
  componentDidMount() {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process",
      data: null,
    })
      .then((res) => {
        ArrayValue = []; // set mảng về 0 khi load lại
        for (var i = 0; i < res.data.length; i++) {
          JsonTime = JSON.parse(res.data[i].Time); // get time
          JsonDes = res.data[i].Description; // get description
          JsonValue = JSON.parse(res.data[i].Value); // get value
          JsonValue["TimeCreate"] = JsonTime; // add on value to array
          JsonValue["Description"] = JsonDes;
          ArrayValue.push(JsonValue);
        }
        this.setState({
          contentItems: ArrayValue,
        });
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
        console.log("Lỗi");
      });
  }

  /*-------------- nhận ID từ buton Chỉnh sửa và Xóa------------------------- */
  onUpdate = (Id) => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process&key=" +
        Id,
      data: null,
    })
      .then((res) => {
        var temp = JSON.parse(res.data);
        this.setState({
          contentGetProcessId: temp,
        });
        document.getElementById(
          "IdNameProcess"
        ).value = this.state.contentGetProcessId.Name;
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  };

  /*-------------- Hàm xử lý gọi api xóa------------------------- */
  onDeleteSave = (event) => {
    event.preventDefault();
    //Description = document.getElementById("info").value;
    var { contentGetProcessId, Level, Before, After } = this.state;
    var idEdit = contentGetProcessId.Id;
    var Name = contentGetProcessId.Name;
    var status = false;
    valueNew =
      '{"Id":"' +
      idEdit +
      '","Name":"' +
      Name +
      '","Level":' +
      Level +
      ',"Parent":"' +
      idEdit +
      '","status":' +
      status +
      ',"Before":"' +
      Before +
      '","After":"' +
      After +
      '"}';
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
        alert("Xóa khu vực " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*-------------- Hàm xử lý gọi api cập nhập------------------------- */
  onUpdateSave = (event) => {
    event.preventDefault();
    Description = document.getElementById("idInfoDes").value;
    var Namee = this.state.contentGetProcessId.Name;
    console.log(Namee);
    var { contentGetProcessId, Name, Level, Before, After } = this.state;
    var nameNew;
    if( Name==''){
      nameNew= Namee;
    }
    else{
      nameNew = Name;
    }
    var idEdit = contentGetProcessId.Id;
    valueNew =
      '{"Id":"' +
      idEdit +
      '","Name":"' +
      nameNew +
      '","Level":' +
      Level +
      ',"Parent":"' +
      idEdit +
      '","status":true,"Before":"' +
      Before +
      '","After":"' +
      After +
      '"}';
    console.log(idEdit);
    console.log(valueNew);
    console.log(Description);
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
        "&Description="+Description,
      data: null,
    })
      .then((res) => {
        console.log(res);
        alert("Sửa khu vực " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  reLoadTable=()=>{
    console.log('khoa ok');
  }
  render() {
    var { contentItems } = this.state;
    var { Name, filter } = this.state;
    if (filter) {
      // xét điều kiện để filter
      if (filter.name) {
        contentItems = contentItems.filter((contentItems) => {
          return contentItems.Name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      contentItems = contentItems.filter((contentItems) => {
        if (filter.status === -1) {
          return contentItems;
        } else {
          return contentItems.status === (filter.status === 1 ? true : false);
        }
      });
    }
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Quản lý khu vực</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Quản lý khu vực</li>
          </ol>
        </section>
        <section className="content">
          <TableContentKhuVuc>
            {this.showContentItems(contentItems)}
          </TableContentKhuVuc>
          {/*------------------ button tạo mới khu vực-------------------------*/}
          <ActionCreateKhuVuc></ActionCreateKhuVuc>

          {/*------------------ button sửa khu vực-------------------------*/}
          <div className="modal fade" id="modal-edit">
            <form onSubmit={this.onUpdateSave}>
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
                    <h4 className="modal-title">Chỉnh sửa khu vực</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>ID khu vực: (chỉ xem)</h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="5"
                        type="text"
                        className="form-control"
                        id="IDProcess"
                        name="Id"
                        value={this.state.contentGetProcessId.Id}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên khu vực:</h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="5"
                        type="text"
                        className="form-control"
                        id="IdNameProcess"
                        name="Name"
                        required
                        placeholder="Nhập tên khu vực thay đổi"
                        value={Name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Mô tả:</h5>
                      </label>
                      <textarea
                        maxLength="50"
                        name="infoDes"
                        id="idInfoDes"
                        className="form-control"
                        rows="3"
                        placeholder="mô tả ngắn khi thay đổi"
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Chỉnh sửa
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
            </form>
          </div>

          {/*------------------ button Xóa khu vực-------------------------*/}
          <form onSubmit={this.onDeleteSave}>
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
                    <h4 className="modal-title">Xóa khu vực</h4>
                  </div>
                  <div className="modal-body">
                    <h5>Bạn có đồng ý xóa khu vực này không?</h5>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="Submit"
                      className="btn btn-danger"
                      data-toggle="modal"
                    >
                      Xóa khu vực
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
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableContentItemsKhuVuc
            key={index}
            contentItem={contentItem}
            index={index}
            onUpdate={this.onUpdate}
            reLoadTable={this.reLoadTable}
          />
        );
      });
    }
    return result;
  }
}
export default QuanLyKhuVuc;