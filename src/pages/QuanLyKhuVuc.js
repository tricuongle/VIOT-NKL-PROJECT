import React, { Component } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
import TableContentKhuVuc from "../components/comQLKhuVuc/tableContentKhuVuc/TableContentKhuVuc";
import TableContentItemsKhuVuc from "../components/comQLKhuVuc/tableItemKhuVuc/TableContentItemsKhuVuc";
import ActionCreateKhuVuc from '../components/comQLKhuVuc/comQLKhuVucActions/ActionCreateKhuVuc'
import * as Config from '../untils/Config'
import $ from 'jquery'; 
var JsonValue;
var JsonTime;
var JsonDes;
var ArrayValue = [];

var arrayValueModel = [];
class QuanLyKhuVuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentTime: [],
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
      keyword: "",
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
  onSearch = (keyword) => {

     console.log(keyword);
  };
 
  componentDidMount() {
    axios({
      method: "GET",
      url:
      `${Config.API_URL}`+"/api/data?token="+`${Config.TOKEN}`+"&Classify=Process",
      data: null,
    })
      .then((res) => {
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

  render() {
    var { txtIDKhuVuc, txtTenKhuVuc, contentItems, keyword } = this.state;
    if (keyword) {
      // render ra nội dung
      contentItems = contentItems.filter((contentItems) => {
        return contentItems.Id.toLowerCase().indexOf(keyword) !== -1;
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
          {/*content button khu vực */}
          <ActionCreateKhuVuc></ActionCreateKhuVuc>
          
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
                  <h4 className="modal-title">Sửa khu vực</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="devices">
                      <h5>Id khu vực:</h5>
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
                    <input
                      type="text"
                      className="form-control"
                      id="nameDevice"
                    />
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
          />
        );
      });
    }
    return result;
  }
}
export default QuanLyKhuVuc;
