import React, { Component } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import TableContentItemMaCa from "../components/comQLMaCa/tableItemMaCa/TableContentItemMaCa";
import TableContentMaCa from "../components/comQLMaCa/tableContentMaCa/TableContentMaCa";
import ActionCreateMaCa from "../components/comQLMaCa/comQLMaCaActions/ActionCreateMaCa";
import * as Config from "../untils/Config";
var JsonValue;
var JsonName;
// mảng lưu giá trị của value từ api công đoạn
var ArrayValue = [];
var ArrayNameProcess = [];
var load = [];
var nameProcess = "";
var valueContentModelLog;
// khi gọi về chỉ hiển thị id của khu vực, dùng id lấy tên
var i;
class QuanLyMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentProcess: [],
      contentValueFishcode: [],
      keyword: "",

      // giá trị obj của data
      valueModel: {
        Id: "",
        Name: "",
        ProcessId: "",
        CreateDate: "",
        WeighInMax: null,
        WeightInMin: null,
        WeightOutMin: null,
        WeighOutMax: null,
        Classify: "",
        Group: "",
        status: true,
      },
      filter: {
        name: "",
        status: 1, // filter (-1 tất cả, 1 đang làm, 0 đã nghỉ)
      },
    };
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase(),
    });
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState((preState) => ({
      valueModel: {
        ...preState.valueModel,
        [name]: value,
      },
    }));
    if (name == "ProcessId") {
      var valueProcess = this.state.contentProcess;
      for (var k in valueProcess) {
        if (valueProcess[k].Id == value) {
          nameProcess = valueProcess[k].Name;
        }
      }
    }
    var valueGroup = document.getElementById("idGroupp").value;
    if (valueGroup != "") {
      document.getElementById("idClassifyy").disabled = false;
    } else {
      document.getElementById("idClassifyy").value = "";
      document.getElementById("idClassifyy").disabled = true;
    }
  };
  componentDidMount = () => {
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
        ArrayValue = [];
        ArrayNameProcess = [];
        for (i = 0; i < resModel.data.length; i++) {
          JsonValue = JSON.parse(resModel.data[i]);
          ArrayValue.push(JsonValue);
          ArrayNameProcess.push(ArrayValue[i].ProcessId);
        }
        ArrayValue.sort().reverse(); // sort đảo mảng
        this.setState({
          contentItems: ArrayValue,
        });
        $(document).ready(function () {
          // sử dụng thư viện datatable
          $("#tableData").DataTable({
            searching: false,
            ordering: false,
            dom: "Bfrtip",
            scrollX: true,
            scrollY: 450,
            paging: false,
          });
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
    /*---------- lấy data đổ vào select để  Chọn khu vực----------------- */
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
        var arrayValueProcess = [];
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*--------------hàm truyền dữ liệu từ một hàng trong table---------------- */
  onUpdate = (content, namePro) => {
    valueContentModelLog= content; // gán giá trị cho log
    this.setState((preState) => ({
      valueModel: {
        ...preState.valueModel,
        Id: content.Id,
        Name: content.Name,
        ProcessId: content.ProcessId,
        CreateDate: content.CreateDate,
        WeighInMax: content.WeighInMax,
        WeightInMin: content.WeightInMin,
        WeightOutMin: content.WeightOutMin,
        WeighOutMax: content.WeighOutMax,
        Classify: content.Classify,
        Group: content.Group,
      },
    }));
    nameProcess = namePro; // gán tên với tên lấy được
    document.getElementById("idNameModel").value = content.Name;
    document.getElementById("idModel").value = content.Id;

    document.getElementById("idGroupp").value = content.Group;
    document.getElementById("idClassifyy").value = content.Classify;
  };
  // hàm random key value
  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  /*-----------------hàm Edit Mã cá ------------------*/
  onEditMaCa = (event) => {
    event.preventDefault();
    var { valueModel } = this.state;
    var valueModelString = JSON.stringify(valueModel);

    // content value log
    var date = new Date();
    var dateGetTimeNow = date.getTime() + " ";
    var dateGetTimeNowSubString = dateGetTimeNow.substring(0, 10);
    var keyRandom = this.uuidv4();
    var valueLog = {
      ValueOld: valueContentModelLog,
      ValueNew: valueModel,
      time: dateGetTimeNowSubString,
    };
    var valueLogString = JSON.stringify(valueLog);

    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/key?token=" +
        `${Config.TOKEN}` +
        "&classify=Model&key=" +
        valueModel.Id,
      data: {
        Value: valueModelString,
      },
    })
      .then((resModel) => {
        alert("Sửa công đoạn " + valueModel.Name + " thành công!");
        // lưu dữ liệu vào log
        axios({
          method: "POST",
          url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}`,
          data: {
            Key: keyRandom,
            Classify: "Model-Log",
            Value: valueLogString,
            Description: "Model NKL Log",
          },
        }).then((resDevice) => {
          console.log("Save data in log ok !");
        });
        this.LoadData();
        this.LoadData();
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  };
  /*----------------DELETE mã cá------------------------ */
  onDeleteMaCa = (event) => {
    event.preventDefault();
    var arrayValueFishcode = [];
    var { valueModel } = this.state;
    var statusDELETE = false;
    var valueModelString =
      '{"Id":"' +
      valueModel.Id +
      '","Name":"' +
      valueModel.Name +
      '","ProcessId":"","CreateDate":' +
      valueModel.CreateDate +
      ',"WeighInMax":"' +
      valueModel.WeighInMax +
      '","WeightInMin":"' +
      valueModel.WeightInMin +
      '","WeightOutMin":"' +
      valueModel.WeightOutMin +
      '","WeighOutMax":"' +
      valueModel.WeighOutMax +
      '","Classify":"' +
      valueModel.Classify +
      '","Group":"' +
      valueModel.Group +
      '","status":' +
      statusDELETE +
      "}";
       // content value log
    var date = new Date();
    var dateGetTimeNow = date.getTime() + " ";
    var dateGetTimeNowSubString = dateGetTimeNow.substring(0, 10);
    var ObjvalueNew = JSON.parse(valueModelString);
    var keyRandom = this.uuidv4();
    var valueLog = {
      ValueOld: ObjvalueNew,
      ValueNew: "Thông tin đã xóa",
      time: dateGetTimeNowSubString,
    };
    var valueLogString = JSON.stringify(valueLog);

    //---------------
    /*lấy datta định mức theo mã cá */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=FishCode",
      data: null,
    })
      .then((res) => {
        var arrayValue = res.data;
        for (var k in arrayValue) {
          var temp = JSON.parse(arrayValue[k]);
          if (temp.ModelId == valueModel.Id && temp.Status == true) {
            arrayValueFishcode.push(temp);
          }
        }
        this.setState({
          contentValueFishcode: arrayValueFishcode,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*--------------Xóa mã cá (status chuyển về sai)--------------------------------- */
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/key?token=" +
        `${Config.TOKEN}` +
        "&classify=Model&key=" +
        valueModel.Id,
      data: {
        Value: valueModelString,
      },
    })
      .then((resModel) => {
        alert("Xóa mã cá " + valueModel.Name + " thành công!");
        // lưu dữ liệu vào log
        axios({
          method: "POST",
          url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}`,
          data: {
            Key: keyRandom,
            Classify: "Model-Log",
            Value: valueLogString,
            Description: "Model NKL Log",
          },
        }).then((resDevice) => {
          console.log("Save data in log ok !");
        });

        /*Xóa thay đổi status định mức mã cá == sai */
        axios({
          method: "GET",
          url:
            `${Config.API_URL}` +
            "/api/data/Values?token=" +
            `${Config.TOKEN}` +
            "&Classify=FishCode",
          data: null,
        })
          .then((resFishCode) => {
            for (var k in resFishCode.data) {
              var objectValueModel = JSON.parse(resFishCode.data[k]);
              if (valueModel.Id == objectValueModel.ModelId) {
                objectValueModel.Status = true;
              }
            }
            this.LoadData();
          })

          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  };
  // --------------------load dữ liệu lại-------------------------
  dataTableLoad = () => {
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
        ArrayValue = [];
        ArrayNameProcess = [];
        for (i = 0; i < resModel.data.length; i++) {
          JsonValue = JSON.parse(resModel.data[i]);
          ArrayValue.push(JsonValue);
          ArrayNameProcess.push(ArrayValue[i].ProcessId);
        }
        ArrayValue.sort().reverse(); // sort đảo mảng
        this.setState({
          contentItems: ArrayValue,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  };
  LoadData = () => {
    this.setState({
      contentItems: load,
      keyword: "",
    });
    this.dataTableLoad();
  };
  /*------------------------------------- */

  render() {
    var {
      contentItems,
      filter,
      valueModel,
      keyword,
      contentProcess,
    } = this.state;
    if (keyword) {
      // render ra nội dung khi tìm kiếm
      contentItems = contentItems.filter((contentItems) => {
        return (
          contentItems.Id.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.Name.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.WeighInMax.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.WeightInMin.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.WeightOutMin.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.WeighOutMax.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.Classify.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.Group.toLowerCase().indexOf(keyword) !== -1
        );
      });
    }
    // lọc tìm theo status
    contentItems = contentItems.filter((contentItems) => {
      if (filter.status === -1) {
        return contentItems;
      } else {
        return contentItems.status === (filter.status === 1 ? true : false);
      }
    });
    /*if (filter) {
      // xét điều kiện để filter
      if (filter.name) {
        contentItems = contentItems.filter((contentItems) => {
          return contentItems.Name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      
    }*/
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>QUẢN LÝ MÃ CÁ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Quản lý mã cá</li>
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
              <p>Làm mới dữ liệu khi thêm mã cá mới.</p>
            </div>
          </form>
          <TableContentMaCa onSearch={this.onSearch}>
            {this.showContentItems(contentItems)}
          </TableContentMaCa>

          {/*button thêm công đoạn*/}
          <ActionCreateMaCa></ActionCreateMaCa>
          {/*----------------Chỉnh sửa công đoạn---------------------------------- */}
          <div className="modal fade" id="modal-edit">
            <form onSubmit={this.onEditMaCa}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header ">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      &times;
                    </button>
                    <h4 className="modal-title ">CHỈNH SỬA MÃ CÁ</h4>
                  </div>
                  <div className="modal-body">
                    <div className="tenMaCa form-group">
                      <label htmlFor="devices">
                        <h5>ID mã cá: ( Chỉ xem ) </h5>
                      </label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        id="idModel"
                        disabled
                      />
                    </div>
                    <div className="tenMaCa form-group">
                      <label htmlFor="devices">
                        <h5>Tên mã cá: </h5>
                      </label>
                      <br />
                      <input
                        type="text"
                        placeholder="Nhập tên mã cá"
                        className="form-control"
                        id="idNameModel"
                        name="Name"
                        required
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>
                          Công đoạn:{" "}
                          <span className="infoModel" id="idModelName">
                            {nameProcess}
                          </span>
                        </h5>
                      </label>
                      <br />
                      <select
                        name="ProcessId"
                        id="idProcess"
                        className="form-control"
                        required="required"
                        onChange={this.onChange}
                      >
                        <option value="" defaultValue>
                          ---Chọn công đoạn---
                        </option>
                        {this.showContentSelect(contentProcess)}
                      </select>
                    </div>

                    <div className="form-group">
                      <div className="themDinhGia-group">
                        <div className="tenDinhGia">
                          <label>
                            <h5>KL Min đầu vào </h5>
                          </label>
                          <br />
                          <input
                            type="number"
                            placeholder="khối lượng Kg"
                            className="form-control"
                            id="idWeightInMin"
                            name="WeightInMin"
                            required
                            min={0}
                            step=".01"
                            value={valueModel.WeightInMin}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="tenDinhGia">
                          <label>
                            <h5>KL Max đầu vào </h5>
                          </label>
                          <br />
                          <input
                            type="number"
                            className="form-control"
                            id="idWeighInMax"
                            name="WeighInMax"
                            placeholder="khối lượng Kg"
                            required
                            value={valueModel.WeighInMax}
                            onChange={this.onChange}
                            min={0}
                            step=".01"
                          />
                        </div>
                        <div className="khoiLuongMaCa">
                          <label>
                            <h5>KL Min đầu ra </h5>
                          </label>
                          <br />
                          <input
                            type="number"
                            placeholder="khối lượng Kg"
                            className="form-control"
                            id="idWeightOutMin"
                            name="WeightOutMin"
                            required
                            min={0}
                            step=".01"
                            value={valueModel.WeightOutMin}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="khoiLuongMaCa">
                          <label>
                            <h5>KL Max đầu ra </h5>
                          </label>
                          <br />
                          <input
                            type="number"
                            className="form-control"
                            id="idWeighOutMax"
                            name="WeighOutMax"
                            placeholder="khối lượng Kg"
                            required
                            value={valueModel.WeighOutMax}
                            onChange={this.onChange}
                            min={0}
                            step=".01"
                          />
                        </div>
                        <div className="groupAndclassify">
                          <label>
                            <h5>Nhóm</h5>
                          </label>
                          <br />
                          <input
                            maxLength="30"
                            minLength="3"
                            type="text"
                            placeholder="nhập tên nhóm mã cá"
                            className="form-control"
                            id="idGroupp"
                            name="Group"
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="groupAndclassify">
                          <label>
                            <h5>Classify (Loại)</h5>
                          </label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            id="idClassifyy"
                            name="Classify"
                            placeholder="Nhập loại"
                            disabled
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      {/*không tác dụng */}
                      <table className="table table-hover"></table>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Thay đổi
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
          {/*-------------Xóa Model---------------------- */}
          <div className="modal fade" id="modal-Delete">
            <form onSubmit={this.onDeleteMaCa}>
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
                    <h4 className="modal-title">XÓA MÃ CÁ</h4>
                  </div>
                  <div className="modal-body">
                    <h5>Bạn có đồng ý xóa mã cá này không?</h5>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-danger"
                      data-toggle="modal"
                    >
                      Xóa mã cá
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
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableContentItemMaCa
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
  // hàm hiển thị danh sách tên khu vực.
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
export default QuanLyMaCa;
