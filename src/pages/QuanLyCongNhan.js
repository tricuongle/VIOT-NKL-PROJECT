import React, { Component } from "react";
import axios from "axios";
import $, { data } from "jquery";
import TableContentItemCongNhan from "../components/comQLCongNhan/tableItemCongNhan/TableContentItemCongNhan";
import TableContentCongNhan from "../components/comQLCongNhan/tableContentCongNhan/TableContentCongNhan";
import ActionCreateCongNhan from "../components/comQLCongNhan/comQLCongNhanActions/ActionCreateCongNhan";

import * as Config from "../untils/Config";
var ArrayValue = [];
var valueNew;
var load = [];
var count = 0;
class QuanLyCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentItemss: [],
      contentGetEmployeeId: "",
      keyword: "",
      status: 1, // filter (-1 tất cả, 1 đang làm, 0 đã nghỉ)
      BirthDay: "",
      CMND: "",
      CardNo: "",
      Department: "",
      Description: "This Item For User Master Data",
      Id: "",
      IsLock: true,
      JobLevel: 3,
      Name: "",
      gender: "",
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
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase(),
    });
  };
  componentDidMount = () => {
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
        for (var k in res.data) {
          var temp = JSON.parse(res.data[k]);
          if (temp.IsLock == true) {
            ArrayValue.push(temp);
          }
        }
        ArrayValue.sort().reverse(); // sort đảo mảng
        this.setState({
          contentItems: ArrayValue,
        });
        // sử dụng thư viện datatable
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 450,
          paging: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onGetId = (content) => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee&key=" +
        content.Id,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          contentGetEmployeeId: ObjValue,
        });

        /*-----------điền thông tin khi sửa */
        document.getElementById("NameEmp").value = content.Name;
        document.getElementById("CNNDEmp").value = content.CMND;
        document.getElementById("DateEmp").value = content.BirthDay;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*---------------sửa thông tin công nhân--------------- */
  onUpdateSave = (event) => {
    event.preventDefault();
    var {
      contentGetEmployeeId,
      Name,
      CMND,
      CardNo,
      BirthDay,
      gender,
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
      '","gender":"' +
      gender +
      '","CMND":"' +
      CMND +
      '","CardNo":"' +
      CardNo +
      '","BirthDay":"' +
      BirthDay +
      '","User":"","PassWord":"","IsLock":true,"JobLevel":3,"Department":"","Description":"This Item For User Master Data"}';
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
        alert("Sửa thông tin công nhân " + this.state.Name + " thành công !");
        this.LoadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*------------Xóa công nhân -------------------- */
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
      '","User":"","PassWord":"","IsLock":' +
      status +
      ',"JobLevel":3,"Department":"","Description":"This Item For User Master Data"}';

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
        this.LoadData();
        alert("Xóa thông tin công nhân " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
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
        "&Classify=Employee",
      data: null,
    })
      .then((res) => {
        ArrayValue = [];
        for (var k in res.data) {
          var temp = JSON.parse(res.data[k]);
          if (temp.IsLock == true) {
            ArrayValue.push(temp);
          }
        }
        ArrayValue.sort().reverse(); // sort đảo mảng
        this.setState({
          contentItems: ArrayValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  LoadData = () => {
    this.setState({
      contentItems: load,
    });
    this.dataTableLoad();
  };
  /*------------------------------------- */

  render() {
    var {
      contentItems,
      keyword,
      status,
      Name,
      CMND,
      BirthDay,
      CardNo,
    } = this.state;
    if (keyword) {
      console.log(keyword);
      // render ra nội dung khi tìm kiếm
      contentItems = contentItems.filter((contentItems) => {
        return (
          contentItems.Id.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.Name.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.CMND.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.CardNo.toLowerCase().indexOf(keyword) !== -1
        );
      });
    }

    return (
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
          <form className="filter-section form-inline">
            <div className="input-group inputSeach">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.LoadData}
              >
                Làm mới dữ liệu
              </button>
              <p>Làm mới dữ liệu khi tạo công nhân mới.</p>
            </div>
          </form>

          {/*Hiện thông tin table */}
          <TableContentCongNhan onSearch={this.onSearch}>
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
                        <h5>Giới tính:</h5>
                      </label>
                      <select
                        className="form-control"
                        id="Idgender"
                        name="gender"
                        required
                        onChange={this.onChange}
                      >
                        <option value="null">---giới tính---</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="khác">Khác</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Mã số công nhân:</h5>
                      </label>
                      <br />
                      <input
                        type="number"
                        className="form-control"
                        id="NumCardNo"
                        name="CardNo"
                        placeholder="nhập mã số công nhân"
                        required
                        min="0"
                        value={CardNo}
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
                        type="number"
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

          {/*buton Delete Employee*/}
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

  // hàm đổ dữ liệu vào table nhờ vòng loop
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableContentItemCongNhan
            key={index}
            contentItem={contentItem}
            index={index}
            onGetId={this.onGetId} // truyền ID
          />
        );
      });
    }
    return result;
  }
}
export default QuanLyCongNhan;
