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

      FishCodeIDtoSelectModel: "",
      arrayModelList: [], // list model
      NameProcess: "",
      IdProcess: "",
      valueModelNew: {
        Id: "",
        Name: "",
        ProcessId: "",
        CreateDate: "",
        WeighInMax: "",
        WeightInMin: "",
        WeightOutMin: "",
        WeighOutMax: "",
        Classify: "",
        Group: "",
        status: true,
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
  getValueProcess = () => {
    console.log("yes");
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
            pageLength: 7,
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
  componentDidMount = () => {
    /*----------lấy giá trị select Chọn mã cá----------------- */
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
      })
      .catch((err) => {
        console.log(err);
      });
    /*------------get value Process------------ */
    this.getValueProcess();
  };

  /*-----------------------chức năng chọn mã cá ----------------------- */
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
        var valueModelNew = JSON.stringify(this.state.valueModel);
        console.log(valueModelNew);
        axios({
          method: "PUT",
          url:
            `${Config.API_URL}` +
            "/api/data/key?token=" +
            `${Config.TOKEN}` +
            "&Classify=Model&key=" +
            ModelId,
          data: {
            value: valueModelNew,
          },
        })
          .then((res) => {
            alert('Chọn mã cá cho khu vực thành công!');
            console.log("Chon mã cá cho khu vực thành công!");
            this.reLoadSelectCreate();
          })
          .catch((err) => {
            console.log(err);
            console.log("Lỗi chọn mã cá");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*-----------------------truyền dữ liệu từ hàng --------------------------- */
  onGetId = (IdProcess, arrayFSyes, nameProcess) => {
    this.setState({
      arrayModelList: arrayFSyes,
      NameProcess: nameProcess,
      idProcess: IdProcess,
    });
  };
  reLoadSelect = () => {
    document.getElementById("idFishCodeIDtoSelectModel").value = "";
  };
  reLoadSelectCreate = () => {
    document.getElementById("idProcess").value = "";
    document.getElementById("idModel").value = "";
  };
  reLoadTable = () => {
    setTimeout(this.getValueProcess, 500);
  };
  /*------------------- Chức năng gỡ mã cá khổi khu vực---------------------------- */
  onDeleteMaCa = (event) => {
    var { FishCodeIDtoSelectModel, NameProcess } = this.state;
    event.preventDefault();
    /*-----------------------Lấy công đoạn dựa vào ID-------------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        FishCodeIDtoSelectModel,
      data: null,
    })
      .then((resFishCode) => {
        var stringTemp = resFishCode.data;
        console.log(stringTemp);
        var ObjTemp = JSON.parse(stringTemp);
        console.log(ObjTemp);
        this.setState({
          valueModelNew: ObjTemp,
        });
        this.setState((preState) => ({
          valueModelNew: { ...preState.valueModelNew, ProcessId: "" },
        }));
        // chuyển về string
        var stringValueModel = JSON.stringify(this.state.valueModelNew);
        console.log(stringValueModel);
        /*--------------Cập nhật lại khi loại bỏ khu vực-------------- */
        axios({
          method: "PUT",
          url:
            `${Config.API_URL}` +
            "/api/data/key?token=" +
            `${Config.TOKEN}` +
            "&classify=Model&key=" +
            FishCodeIDtoSelectModel,
          data: {
            Value: stringValueModel,
          },
        })
          .then((resFishCode) => {
            this.reLoadTable();
            alert(
              "Gỡ công đoạn mã cá " +
                this.state.valueModelNew.Name +
                " trong khu vực " +
                NameProcess +
                " thành công!"
            );
            this.reLoadTable();
            document.getElementById("idFishCodeIDtoSelectModel").value = "";
          })
          .catch((err) => {
            alert("Lỗi xảy ra...");
            console.log(err);
          });
      })
      .catch((err) => {
        alert("Lỗi xảy ra...");
        console.log(err);
      });
  };
  render() {
    var {
      contentItems,
      contentFishCode,
      contentProcess,
      arrayModelList,
      NameProcess,
    } = this.state;
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
          <TableContentChonMaCa>
            {this.showContentItems(contentItems)}
          </TableContentChonMaCa>
          {/*---------------------------Thêm mã cá vào khu vực----------------------------- */}
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
                        <option value="" defaultValue>
                          ---Chọn khu vực---
                        </option>
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
                        <option value="" defaultValue>
                          ---Chọn mã cá---
                        </option>
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
                      onClick={this.reLoadSelect}
                    >
                      Thoát
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/*---------------------------Xóa mã cá khổi khu vực------------------------------ */}
          <div className="modal fade" id="modal-delete">
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
                    <h4 className="modal-title">Loại bỏ công đoạn mã cá</h4>
                  </div>
                  <div className="modal-body">
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
                        id="idNameProcess"
                        name="NameProcess"
                        disabled
                        value={NameProcess}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Chọn mã cá:</h5>
                      </label>
                      <br />
                      <select
                        name="FishCodeIDtoSelectModel"
                        id="idFishCodeIDtoSelectModel"
                        className="form-control"
                        required="required"
                        onChange={this.onChange}
                      >
                        <option value="" defaultValue>
                          ---Chọn khu vực---
                        </option>
                        {this.showContentSelect(arrayModelList)}
                      </select>
                    </div>
                    <h5>*Chọn mã cá trong danh sách để xóa khổi khu vực.</h5>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Loại bỏ
                    </button>
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                      onClick={this.reLoadSelect}
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
          <TableItemChonMaCa
            key={index}
            contentItem={contentItem}
            index={index}
            onGetId={this.onGetId}
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
