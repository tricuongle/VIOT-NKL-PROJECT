import React, { Component } from "react";
import axios from "axios";
import $, { data, event } from "jquery";
import TableContentItemCongNhan from "../components/comQLCongNhan/tableItemCongNhan/TableContentItemCongNhan";
import TableContentCongNhan from "../components/comQLCongNhan/tableContentCongNhan/TableContentCongNhan";
import ActionCreateCongNhan from "../components/comQLCongNhan/comQLCongNhanActions/ActionCreateCongNhan";
import XLSX from "xlsx";

import * as Config from "../untils/Config";
var ArrayValue = [];
var ArrayValueNoCheckStatus = [];
var load = [];

var arrayEmployeeExcel = [];
var valueNew;
var count = 0;
let selectFileExcel;

class QuanLyCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentItemsNoCheckStatus: [],
      contentItemss: [],
      arrayEmployeeExcel: [],
      contentGetEmployeeId: "",
      keyword: "",
      status: 1, // filter (-1 tất cả, 1 đang làm, 0 đã nghỉ)
      countStringIDEmployee: "",
      // nội dung thông tin Employee
      valueEmployee: {
        Id: "",
        Name: "",
        CMND: "",
        CardNo: "",
        BirthDay: "",
        User: "",
        PassWord: "",
        IsLock: true,
        JobLevel: 3,
        Department: "",
        Description: "This Item For User Master Data",
        gender: "",
      },
    };
  }
  // hàm thay đổi giá trị employee khi điền vào popop
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState((preState) => ({
      valueEmployee: {
        ...preState.valueEmployee,
        [name]: value,
      },
    }));
  };
  // hàm gán từ khóa tìm kiếm
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
        ArrayValueNoCheckStatus = [];
        for (var k in res.data) {
          var temp = JSON.parse(res.data[k]);
          ArrayValueNoCheckStatus.push(temp);
          if (temp.IsLock == true) {
            ArrayValue.push(temp);
          }
        }
        ArrayValue.sort().reverse(); // sort đảo mảng
        this.setState({
          contentItems: ArrayValue,
          contentItemsNoCheckStatus: ArrayValueNoCheckStatus,
        });
        // sử dụng thư viện datatable
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 450,
          paging: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // hàm lấy nội dung khi nhấn vào một hàng trong bảng công nhân
  onGetId = (content) => {

    this.setState((preState) => ({
      valueEmployee: {
        ...preState.valueEmployee,

        Id: content.Id,
        Name: content.Name,
        CMND: content.CMND,
        CardNo: content.CardNo,
        BirthDay: content.BirthDay,
        User: content.User,
        PassWord: content.PassWord,
        IsLock: content.IsLock,
        JobLevel: content.JobLevel,
        Department: content.Department,
        Description: content.Description,
        gender: content.gender,
      },
    }));

    document.getElementById("IDEmployee").value = content.Id;
    document.getElementById("NameEmp").value = content.Name;

    document.getElementById("CNNDEmp").value = content.CMND;
    document.getElementById("DateEmp").value = content.BirthDay;
  };
  /*---------------sửa thông tin công nhân--------------- */
  onUpdateSave = (event) => {
    event.preventDefault();

    var { valueEmployee, contentItemsNoCheckStatus } = this.state;
    var valueEmployeeString = JSON.stringify(valueEmployee);
    var checkCardNo = true;
    // kiểm tra trùng mã số công nhân 
    for (var k in contentItemsNoCheckStatus) {
      if (
        contentItemsNoCheckStatus[k].CardNo == valueEmployee.CardNo &&
        contentItemsNoCheckStatus[k].Id != valueEmployee.Id
      ) {
        checkCardNo = false;
      }
    }
    if (checkCardNo) {
      axios({
        method: "PUT",
        url:
          `${Config.API_URL}` +
          "/api/data/key?token=" +
          `${Config.TOKEN}` +
          "&classify=Employee&key=" +
          valueEmployee.Id,
        data: {
          Value: valueEmployeeString,
        },
      })
        .then((resEmp) => {
          alert(
            "Sửa thông tin công nhân " + valueEmployee.Name + " thành công!"
          );
          this.LoadData();
        })
        .catch((err) => {
          console.log(err);
          console.log("Lỗi");
        });
    } else {
      alert(
        "Lỗi! Mã số công nhân này đã tồn tại, hoặc đã được sở hữu bởi công nhân đã nghĩ."
      );
    }
  };
  /*------------Xóa công nhân -------------------- */
  onDeleteSave = (event) => {
    event.preventDefault();
    var { valueEmployee } = this.state;
    var valueEmpDelete = valueEmployee;
    valueEmpDelete.IsLock = false;
    var valueEmployeeString = JSON.stringify(valueEmpDelete);
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/key?token=" +
        `${Config.TOKEN}` +
        "&classify=Employee&key=" +
        valueEmployee.Id,
      data: {
        Value: valueEmployeeString,
      },
    })
      .then((resEmp) => {
        alert("Xóa thông tin công nhân " + valueEmployee.Name + " thành công!");
        this.LoadData();
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
      keyword: "",
    });
    this.dataTableLoad();
  };
  /*------------------------------------- */
  createIDEmployee = () => {
    /*--------------- hàm tạo id công nhân------------ */
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
        var arrNum = [];
        for (var k in res.data) {
          var getString = JSON.parse(res.data[k]).Id;
          // tách chuỗi lấy số trong mã công nhân
          var getNum = getString.substring(8);
          arrNum.push(getNum); // thêm số vào mảng
        }
        // tìm số lớn trong mảng
        var maxInNumbers = Math.max.apply(Math, arrNum);
        var idNew = maxInNumbers + 1;
        if (idNew < 0) {
          idNew = 1;
        }
        var countString = "CN-NKL-0" + idNew;
        this.setState({
          countStringIDEmployee: countString,
        });
        /* this.setState((preState) => ({
          valueEmp: {
            ...preState.valueEmp,
            Id: countString,
          },
        }));*/
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // hàm nhập file excel từ máy tính
  exportExcel = () => {
    let rowObject;
    var exExcel = window.confirm(
      "Bạn muốn nhập thông tin công nhân từ file excel? Vui lòng chọn file excel từ thiết bị!"
    );
    if (exExcel) {
      if (selectFileExcel) {
        var arrObjEmExcel = [];
        var tempObject;
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectFileExcel);
        fileReader.onload = (event) => {
          let data = event.target.result;
          let workbook = XLSX.read(data, { type: "binary" });
          workbook.SheetNames.forEach((sheet) => {
            rowObject = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            );
            console.log(rowObject);
            alert(
              "Chức năng đang cập nhập!, tìm thấy trong danh sách có 0" +
                rowObject.length +
                " dòng trong file excel"
            );
          });

          /*axios({
            method: "GET",
            url:
              `${Config.API_URL}` +
              "/api/data/Values?token=" +
              `${Config.TOKEN}` +
              "&Classify=Employee",
            data: null,
          })
            .then((res) => {
              var arrNum = [];
              for (var k in res.data) {
                var getString = JSON.parse(res.data[k]).Id;
                // tách chuỗi lấy số trong mã công nhân
                var getNum = getString.substring(8);
                arrNum.push(getNum); // thêm số vào mảng
              }
              // tìm số lớn trong mảng
              var maxInNumbers = Math.max.apply(Math, arrNum);
              var idNew = maxInNumbers + 1;
              if (idNew < 0) {
                idNew = 1;
              }
              var countString = "CN-NKL-0" + idNew;
              console.log(arrObjEmExcel);
              for (var k in rowObject) {
              }
              /* this.setState((preState) => ({
                valueEmp: {
                  ...preState.valueEmp,
                  Id: countString,
                },
              }));
            })
            .catch((err) => {
              console.log(err);
            });*/
        };

        /*axios({
          method: "POST",
          url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}`,
          data: {
            Key: idNewCard,
            Classify: "Employee",
            Value: valueCard,
            Description: "Card Ngọc Kim Loan",
          },
        }).then((res) => {
          })
          .catch((err) => {
            console.log(err);
            console.log("Lỗi");
          });*/
      }
    }
  };
  onChangeInput = (event) => {
    selectFileExcel = event.target.files[0];
  };
  render() {
    var {
      valueEmployee,
      contentItems,
      keyword,
    } = this.state;
    if (keyword) {
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
              <button
                type="button"
                className="btn btn-default inputExcel"
                id="button"
                onClick={this.exportExcel}
              >
                Export công nhân Excel
              </button>

              <p>Làm mới dữ liệu khi tạo công nhân mới.</p>
            </div>
            <input
              className="form-control"
              type="file"
              id="input"
              accept=".xls,.xlsx"
              onChange={this.onChangeInput}
            />
          </form>

          {/*Hiện thông tin table */}
          <TableContentCongNhan onSearch={this.onSearch}>
            {this.showContentItems(contentItems)}
          </TableContentCongNhan>

          {/*buton create Employee*/}
          <ActionCreateCongNhan></ActionCreateCongNhan>

          {/* text html buton Edit Employee*/}
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
                        <option value="__">---giới tính---</option>
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
                        min={0}
                        value={valueEmployee.CardNo}
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
                        placeholder="Nhập số CNMD/Căn cướt công nhân thay đổi"
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
