import React, { Component } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import TableContentTramCan from "../components/comQLTramCan/tableContentTramCan/TableContentTramCan";
import TableContentItemTramCan from "../components/comQLTramCan/tableItemTramCan/TableContentItemTramCan";

import $ from "jquery";
const LOCALHOST = "http://171.232.86.160:5001";
const KEY = "";
const CLASSIFY = "";
const TOKEN =
  "ca8a745971a27185fda435692a1e66df835e7cd21261cebbc0c5be88b2250db4d2094547265b6cfc8d7d112d4c411c34";

var arrayValueModel = [];
class QuanLyTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentModel: [],
      contentEditDevice: {


      },
    };
  }
  // api get Devices
  componentDidMount() {
    axios({
      method: "GET",
      url: LOCALHOST + "/api/iotdevice/all?token=" + TOKEN,
      data: null,
    })
      .then((res) => {
        this.setState({
          contentItems: res.data,
        });
        console.log(this.state.contentItems);
        $(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 10,
            processing: true,
            responsive: true,
            dom: "Bfrtip",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // api get list Models
    axios({
      method: "GET",
      url: LOCALHOST + "/api/data/Values?token=" + TOKEN + "&Classify=Model",
      data: null,
    })
      .then((resModel) => {
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
    //initialize datatable
  }
  // get value of radio button
  onChangeValue = (event) => {
    console.log(event.target.value);
  };
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
                      <label class="radio-inline">
                        <input type="radio" name="optradio" value="In" />
                        <b>1. Input</b>
                      </label>
                      <label class="radio-inline">
                        <input type="radio" name="optradio" value="Out" />
                        <b>2. Output</b>
                      </label>
                      <label class="radio-inline">
                        <input type="radio" name="optradio" value="In-Out" />
                        <b>3. Input-Output</b>
                      </label>
                      <label class="radio-inline">
                        <input type="radio" name="optradio" value="M-In" />
                        <b>4. Mutil-Input</b>
                      </label>
                      <label class="radio-inline">
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
                  <div className="form-group">
                    <label htmlFor="devices">
                      <h5>Khối lượng quy định (KG):</h5>
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id="nameDevice"
                      min="0.1"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="devices">
                      <h5>Giới hạn sai số (KG):</h5>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="nameDevice"
                      min="0.1"
                    />
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
  // truyền dữ liệu state 
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableContentItemTramCan
            key={index}
            contentItem={contentItem}
            index={index}
          />
        );
      });
    }
    return result;
  }
  // show Model Name in select
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
