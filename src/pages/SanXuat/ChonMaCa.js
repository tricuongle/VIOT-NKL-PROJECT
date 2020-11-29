import React, { Component } from "react";
import TableContentChonMaCa from "../../components/comSanXuat/comChonMaCa/tableContentChonMaCa/TableContentChonMaCa";
import $ from "jquery";
import * as Config from "../../untils/Config";
import axios from "axios";
import TableItemChonMaCa from "../../components/comSanXuat/comChonMaCa/tableItemChonMaCa/TableItemChonMaCa";
var ArrayValue = [];
var ArrayValueFish = [];

var arrayValueFishCode = [];
var arrayNameFishCode = [];

var arrayValueProcess = [];
var arrayNameProcess = [];
class ChonMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],

      contentItemsFish: [],
      contentFishCode: [],
      contentProcess: [],
      NameFishYes: "",
      valueModel: {},
    };
  }

  // lấy danh sách công đoạn

  getValueFishCode = () => {};
  componentDidMount = () => {
    /*---------- select Chọn mã cá----------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model",
      data: null,
    })
      .then((resFishCode) => {
        arrayValueFishCode = [];
        var { contentItem } = this.props;
        for (var k in resFishCode.data) {
          var Object = JSON.parse(resFishCode.data[k]);
          if (Object.status == true) {
            // lọc ra mã cá đã xóa
            arrayValueFishCode.push(Object);
          }
        }
        this.setState({
          contentFishCode: arrayValueFishCode,
        });
        /*arrayNameFishCode = [];
        for (var temp in this.state.contentFishCode) {
          // so sách
          if (this.state.contentFishCode[temp].ProcessId == contentItem.Id) {
            arrayNameFishCode.push(this.state.contentFishCode[temp].Name); // lấy ds mã cá đã thêm
            this.setState({
              NameFishYes: arrayNameFishCode,
            });
          }
        }*/
      })
      .catch((err) => {
        console.log(err);
      });
    /*---------- select Chọn khu vực----------------- */
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
        var { contentItem } = this.props;
        for (var k in resProcess.data) {
          var Object = JSON.parse(resProcess.data[k]);
          if (Object.status == true) {
            // lọc ra khu vực đã xóa
            arrayValueProcess.push(Object);
          }
        }
        this.setState({
          contentProcess: arrayValueProcess,
        });
        /*arrayNameProcess = [];
        for (var temp in this.state.contentProcess) {
          // so sách
          if (this.state.contentProcess[temp].ProcessId == contentItem.Id) {
            arrayNameProcess.push(this.state.contentProcess[temp].Name); // lấy ds mã cá đã thêm
            this.setState({
              NameFishYes: arrayNameProcess,
            });
          }
        }*/
      })
      .catch((err) => {
        console.log(err);
      });
    /*-------------------Lấy danh sách table mã cá đã chọn  -------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process",
      data: null,
    })
      .then((res) => {
        ArrayValue = [];
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          if (contentItem.status == true) {
            // lọc ra khu vực đã xóa
            ArrayValue.push(contentItem);
          }
        });

        this.setState({
          contentItems: ArrayValue,
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
  };

  putValueChonMaCa = (event) => {
    event.preventDefault();
    var ProcessId = document.getElementById("idProcess").value;
    var ModelId = document.getElementById("idModel").value;
    /*------- lấy giá trị Model từ id ---------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        ModelId,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          valueModel: ObjValue,
        });
        console.log(this.state.valueModel);
        this.state.valueModel.ProcessId = ProcessId;
        var valueModeNew = JSON.stringify(this.state.valueModel);
        console.log(valueModeNew);
        axios({
          method: "PUT",
          url:
            `${Config.API_URL}` +
            "/api/data/key?token=" +
            `${Config.TOKEN}` +
            "&Classify=Model&key=" +
            ModelId,
          data: {
            value: valueModeNew,
          },
        })
          .then((res) => {
            console.log("ok");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var { contentItems, contentFishCode, contentProcess } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>CHỌN MÃ CÁ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Chọn mã cá</li>
          </ol>
        </section>
        <section className="content">
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
            id="id123"
          >
            Chọn mã cá
          </button>
          <div className="modal fade" id="modal-edit">
            <form onSubmit={this.putValueChonMaCa}>
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
                    <h4 className="modal-title">Chọn mã cá cho khu vực</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Chọn khu vực:</h5>
                      </label>
                      <br />
                      <select
                        name=""
                        id="idProcess"
                        className="form-control"
                        required="required"
                      >
                        <option value="0">---Chọn khu vực---</option>
                        {this.showContentSelect(contentProcess)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Chọn mã cá:</h5>
                      </label>
                      <br />
                      <select
                        name=""
                        id="idModel"
                        className="form-control"
                        required="required"
                      >
                        <option value="0">---Chọn mã cá---</option>
                        {this.showContentSelect(contentFishCode)}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Thêm mã cá
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
          <TableContentChonMaCa>
            {this.showContentItems(contentItems)}
          </TableContentChonMaCa>
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemChonMaCa
            key={index}
            contentItem={contentItem}
            index={index}
            // onGetValue={this.onGetValue}
          />
        );
      });
    }
    return result;
  }
  showContentSelect(content) {
    var result = null;
    if (content.length >= 0) {
      result = content.map((contentItem, index) => {
        return (
          <option key={index} id={index} value={contentItem.Id}>
            {contentItem.Name}
          </option>
        );
      });
    }
    return result;
  }
}
export default ChonMaCa;
