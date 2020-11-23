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
import ActionEditKhuVuc from "../components/comQLKhuVuc/comQLKhuVucActions/ActionEditKhuVuc";
import * as Config from "../untils/Config";
import $ from "jquery";
var JsonValue;
var JsonTime;
var JsonDes;
var ArrayValue = [];
var turnOn;
var arrayValueModel = [];
class QuanLyKhuVuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentTime: [],
      contentGetProcessId: {},
      id: "",
      txtIDKhuVuc: "",
      txtTenKhuVuc: "",
      valueKhuVuc: {
        Id: "Zone-NKL-Suaca",
        Name: "Sửa cá",
        Level: 1,
        Parent: "Zone-NKL-Suaca",
        Before: "ProcessID (before)",
        After: "ProcessID (After)",
      },
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

  // sửa thông tin khu vực
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
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  };
  render() {
    var {
      contentItems,
      keyword,
      contentGetProcessId,
      isDisplayActionEdit,
    } = this.state;

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
          {/*content button tạo, sửa khu vực */}
          <ActionCreateKhuVuc></ActionCreateKhuVuc>
          <ActionEditKhuVuc></ActionEditKhuVuc>




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
                    type="button"
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
          />
        );
      });
    }
    return result;
  }
}
export default QuanLyKhuVuc;
