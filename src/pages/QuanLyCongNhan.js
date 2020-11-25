import React, { Component } from "react";
import axios from "axios";
import $, { data } from "jquery";
import TableContentItemCongNhan from "../components/comQLCongNhan/tableItemCongNhan/TableContentItemCongNhan";
import TableContentCongNhan from "../components/comQLCongNhan/tableContentCongNhan/TableContentCongNhan";
import ActionCreateCongNhan from "../components/comQLCongNhan/comQLCongNhanActions/ActionCreateCongNhan";

import * as Config from "../untils/Config";
var ArrayValue = [];
var valueNew;
class QuanLyCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentGetEmployeeId: "",
      filter: {
        name: "",
        status: 1, // filter (-1 tất cả, 1 đang làm, 0 đã nghỉ)
      },
      BirthDay: "",
      CMND: "",
      CardNo: "",
      Department: "",
      Description: "This Item For User Master Data",
      Id: "",
      IsLock: true,
      JobLevel: 3,
      Name: "",
      PassWord: "",
      User: "",
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
  // hàm filter nội dung (tất cả, đã nghỉ, đang làm)
  onFilter = (filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        status: filterStatus,
      },
    });
  };
  // hàm lấy danh sách công nhân từ api
  componentDidMount() {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee",
      data: null,
    })
      .then((res) => {
        ArrayValue = [];
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          ArrayValue.push(contentItem);
        });

        this.setState({
          contentItems: ArrayValue,
        });
        // sử dụng thư viện datatable
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
  onGetId = (Id) => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee&key=" +
        Id,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          contentGetEmployeeId: ObjValue,
        });
        console.log(this.state.contentGetEmployeeId);
        document.getElementById(
          "NameEmp"
        ).value = this.state.contentGetEmployeeId.Name;
        document.getElementById(
          "CNNDEmp"
        ).value = this.state.contentGetEmployeeId.CMND;
        document.getElementById(
          "DateEmp"
        ).value = this.state.contentGetEmployeeId.BirthDay;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onUpdateSave = (event) => {
    event.preventDefault();
    var {
      contentGetEmployeeId,
      Name,
      CMND,
      CardNo,
      BirthDay,
      User,
      PassWord,
      IsLock,
      JobLevel,
      Department,
      Description,
    } = this.state;
    var idEdit = contentGetEmployeeId.Id;
    valueNew =
      '{"Id":"' +
      idEdit +
      '","Name":"' +
      Name +
      '","CMND":"' +
      CMND +
      '","CardNo":"","BirthDay":"' +
      BirthDay +
      '","User":"","PassWord":"","IsLock":true,"JobLevel":3,"Department":"","Description":"This Item For User Master Data"}';
    console.log(idEdit);
    console.log(valueNew);
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/putkey?token=" +
        `${Config.TOKEN}` +
        "&classify=Employee&key=" +
        idEdit +
        "&value=" +
        valueNew +
        "&Description=nkl",
      data: null,
    })
      .then((res) => {
        console.log(res);
        alert("Sửa thông tin công nhân " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onDeleteSave = (event) => {
    event.preventDefault();
    var { contentGetEmployeeId } = this.state;
    var idEdit = contentGetEmployeeId.Id;
    var Name = contentGetEmployeeId.Name;
    var CMND = contentGetEmployeeId.CMND;
    var BirthDay = contentGetEmployeeId.BirthDay;
    var status = false;
    valueNew =
      '{"Id":"' +
      idEdit +
      '","Name":"' +
      Name +
      '","CMND":"' +
      CMND +
      '","CardNo":"","BirthDay":"' +
      BirthDay +
      '","User":"","PassWord":"","IsLock":'+status+',"JobLevel":3,"Department":"","Description":"This Item For User Master Data"}';
    console.log("ok");
    console.log(idEdit);
    console.log(valueNew);
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/putkey?token=" +
        `${Config.TOKEN}` +
        "&classify=Employee&key=" +
        idEdit +
        "&value=" +
        valueNew +
        "&Description=nkl",
      data: null,
    })
      .then((res) => {
        console.log(res);
        alert("Xóa thông tin công nhân " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var { contentItems, filter, Name, CMND, BirthDay } = this.state;
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
          return contentItems.IsLock === (filter.status === 1 ? true : false);
        }
      });
    }
    return (
      // giao diện
      <div className="content-wrapper">
        <section className="content-header">
          <h1>QUẢN LÝ CÔNG NHÂN</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Quản lý công nhân</li>
          </ol>
        </section>
        <section className="content">
          <TableContentCongNhan onFilter={this.onFilter}>
            {this.showContentItems(contentItems)}
          </TableContentCongNhan>

          {/*buton create Employee*/}
          <ActionCreateCongNhan></ActionCreateCongNhan>

          {/*buton Edit Employee*/}
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
                    <h4 className="modal-title">
                      Chỉnh sửa thông tin công nhân
                    </h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>ID công nhân: (chỉ xem)</h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="5"
                        type="text"
                        className="form-control"
                        id="IDEmployee"
                        name="Id"
                        value={this.state.contentGetEmployeeId.Id}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên công nhân:</h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="5"
                        type="text"
                        className="form-control"
                        id="NameEmp"
                        name="Name"
                        required
                        placeholder="Nhập tên khu vực thay đổi"
                        value={Name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Số chứng minh nhân dân/ căn cước:</h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="5"
                        type="numner"
                        className="form-control"
                        id="CNNDEmp"
                        name="CMND"
                        required
                        placeholder="Nhập số CNMD/Căn cướt công nhân thay đổi"
                        value={CMND}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Ngày sinh:</h5>
                      </label>
                      <br />

                      <input
                        type="date"
                        className="form-control form-group"
                        name="filter-date"
                        id="DateEmp"
                        name="BirthDay"
                        required
                        value={BirthDay}
                        onChange={this.onChange}
                      />
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

          <div className="modal fade" id="modal-Delete">
            <form onSubmit={this.onDeleteSave}>
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
                    <h4 className="modal-title">Xóa công nhân</h4>
                  </div>
                  <div className="modal-body">
                    <h5>Bạn có đồng ý xóa công nhân này không?</h5>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-danger"
                      data-toggle="modal"
                    >
                      Xóa công nhân
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
  // hàm đổ dữ liệu vào table
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableContentItemCongNhan
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
}
export default QuanLyCongNhan;
