import React, { Component } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import TableContentItemCongDoan from "../components/comQLCongDoan/tableItemCongDoan/TableContentItemCongDoan";
import TableContentCongDoan from "../components/comQLCongDoan/tableContentCongDoan/TableContentCongDoan";
import ActionCreateCongDoan from '../components/comQLCongDoan/comQLCongDoanActions/ActionCreateCongDoan'
var JsonValue;
var JsonName;
// mảng lưu giá trị của value từ api công đoạn
var ArrayValue = [];
var ArrayNameProcess = [];
// khi gọi về chỉ hiển thị id của khu vực, dùng id lấy tên
var i;
const LOCALHOST = "http://171.232.86.160:5000";
const KEY = "";
const CLASSIFY = "Model";
const TOKEN =
  "04c5077dc551934ebdc267fbc83357b9967e19d21fa9d8c4884fac130acb7dadc50e05c08b9980cd7a379f2c8fa39e50";
class QuanLyCongDoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
    };
  }
  componentDidMount() {
    axios({
      method: "GET",
      url:
      LOCALHOST+"/api/data/Values?token="+TOKEN+"&Classify="+CLASSIFY,
      data: null,
    })
      .then((resModel) => {
        for (i = 0; i < resModel.data.length; i++) {
          JsonValue = JSON.parse(resModel.data[i]);
          ArrayValue.push(JsonValue);
          ArrayNameProcess.push(ArrayValue[i].ProcessId);
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

  render() {
    var { contentItems } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>Quản lý công đoạn</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Quản lý công đoạn</li>
          </ol>
        </section>
        <section className="content">
          <form className="filter-section form-inline">
            <div className="">
              <button
                type="button"
                className="btn btn-primary card card-primary card-outline container-fluid"
                data-toggle="modal"
                data-target="#modal-create"
                id="id123"
              >
                Tạo mới công đoạn
              </button>
            </div>
          </form>
          <TableContentCongDoan>
            {this.showContentItems(contentItems)}
          </TableContentCongDoan>

          {/*button thêm công đoạn*/}
          <ActionCreateCongDoan></ActionCreateCongDoan>

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
                  <h4 className="modal-title">Sửa công đoạn</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="devices">
                      <h5>Tên công đoạn:</h5>
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="nameDevice"
                      disabled
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="area" id="areaDevice">
                      <h5> Khu vực:</h5>
                    </label>
                    <br />
                    <select className="form-control" id="area">
                      <option>Fillet</option>
                      <option>Sửa cá</option>
                      <option>Phân size</option>
                      <option>Xẻ bướm</option>
                    </select>
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="area" id="areaDevice">
                      <h5> Thiết bị:</h5>
                    </label>
                    <br />
                    <select className="form-control" id="area">
                      <option>Cân 1</option>
                      <option>Cân 2</option>
                      <option>Cân 3</option>
                    </select>
                  </div>
                  <br />
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
                  <h4 className="modal-title">Xóa công đoạn</h4>
                </div>
                <div className="modal-body">
                  <h5>Bạn có đồng ý xóa công đoạn này không?</h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    Xóa công đoạn
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
          <TableContentItemCongDoan
            key={index}
            contentItem={contentItem}
            index={index}
          />
        );
      });
    }
    return result;
  }
  showContentNameProcess(ContentNameProcess) {
    var result = null;
    if (ContentNameProcess.length >= 0) {
      result = ContentNameProcess.map((ContentNamePro, index) => {
        return (
          <TableContentItemCongDoan
            key={index}
            ContentNamePro={ContentNamePro}
            index={index}
          />
        );
      });
    }
    return result;
  }
}
export default QuanLyCongDoan;
