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
// khi gọi về chỉ hiển thị id của khu vực, dùng id lấy tên
var i;
class QuanLyMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentProcess: [],
      contentValueFishcode: [],

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
        this.setState({
          contentItems: ArrayValue,
        });
        $(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 10,
            processing: true,
            responsive: true,
            fixedHeader: true,
            dom: "Bfrtip",
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
  onUpdate = (content) => {
    var date = new Date();
    var dayCreate = date.valueOf();
    this.setState((preState) => ({
      valueModel: {
        ...preState.valueModel,
        Id: content.Id,
        Name: content.Name,
        ProcessId: content.Name,
        CreateDate: dayCreate,
        WeighInMax: content.WeighInMax,
        WeightInMin: content.WeightInMin,
        WeightOutMin: content.WeightOutMin,
        WeighOutMax: content.WeighOutMax,
        Classify: content.Classify,
        Group: content.Group,
      },
    }));
    document.getElementById("idNameModel").value = content.Name;
    document.getElementById("idModel").value = content.Id;
    document.getElementById("idGroupp").value = content.Group;
    document.getElementById("idClassifyy").value = content.Classify;
  };
  /*-----------------Edit Công đoạn ------------------*/
  onEditMaCa = (event) => {
    event.preventDefault();
    var { valueModel } = this.state;
    //delete ValueModel.contentItems;
    var valueModelString = JSON.stringify(valueModel);
    console.log(valueModelString);
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
        setTimeout(this.componentDidMount, 500);
        alert("Sửa công đoạn " + valueModel.Name + " thành công.");
        console.log("Sửa thành công");
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  };
  /*----------------DELETE công đoạn------------------------ */
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
    console.log(valueModelString);
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
          contentValueFishcode: arrayValueFishcode
        })
        console.log(this.state.contentValueFishcode);
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
        setTimeout(this.componentDidMount,500);
        alert("Xóa công đoạn " + valueModel.Name + " thành công.");
        console.log("Xóa công đoạn thành công");
        /*Xóa thay đổi status định mức mã cá == sai */
    /* axios({
          method: "GET",
          url:
            `${Config.API_URL}` +
            "/api/data/Values?token=" +
            `${Config.TOKEN}` +
            "&Classify=Process",
          data: null,
        })
          .then((resProcess) => {
            
           
          })
          .catch((err) => {
            console.log(err);
          });*/

      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  };
  reLoadTable = () => {
    setTimeout(this.componentDidMount, 1000);
  };
  render() {
    var { contentItems, filter, valueModel, contentProcess } = this.state;
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
          <h1>QUẢN LÝ MÃ CÁ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Quản lý MÃ CÁ</li>
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
                Tạo mới mã cá
              </button>
            </div>
            <div className="input-group inputSeach">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.reLoadTable}
              >
                Làm mới dữ liệu
              </button>
            </div>
          </form>
          <TableContentMaCa>
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
                        <h5>Chọn công đoạn:</h5>
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
                            onChange={this.onChange}
                            min={0}
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
                            onChange={this.onChange}
                            min={0}
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
                            min={0}
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
          {/*-------------Xóa công đoạn---------------------- */}
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
