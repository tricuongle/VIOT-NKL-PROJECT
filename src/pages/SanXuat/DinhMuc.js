import React, { Component } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
import * as Config from "../../untils/Config";
import $, { event } from "jquery";
import TableContentDinhMuc from "../../components/comSanXuat/comDinhMuc/TableContentDinhMuc";
import TableItemDinhMuc from "../../components/comSanXuat/comDinhMuc/TableItemDinhMuc";
var ArrayValue = [];
var arrayValueFishCode = [];
class DinhMuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentModelFS: [],
      idModel: "",
      nameModel: "",
      IDDinhGiaCreate: "",
      valueDinhMuc: {
        ID: "",
        ModelId: "",
        Status: true,
        Name: "",
        Weight: null,
        Price: null,
      },
      /*filter: {
        name: "",
        status: 1, // filter (-1 tất cả, 1 đang làm, 0 đã nghỉ)
      },*/
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState((preState) => ({
      valueDinhMuc: {
        ...preState.valueDinhMuc,
        [name]: value,
      },
    }));
  };

  componentDidMount = () => {
    /*-------------- Gọi API hiển thị danh sách định giá------------------ */
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
        var count = res.data.length + 1;
        var IDcountString = "MC-NKL-0" + count;
        ArrayValue = [];
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          if (contentItem.Status == true) {
            // lọc ra mã cá đã xóa
            ArrayValue.push(contentItem);
          }
        });
        this.setState((preState) => ({
          contentItems: ArrayValue,
          valueDinhMuc: {
            ...preState.valueDinhMuc,
            ID: IDcountString,
          },
        }));
        console.log(this.state.contentItems);


          $("#tableData").dataTable({
            dom: "Bfrtip",
            pageLength: 7,
          });
           $("#tableData").dataTable({
            dom: "Bfrtip",
            pageLength: 7,
            destroy: true,
          });

        // sử dụng thư viện datatable
        /*$(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 7,
            bDestroy: true,
            processing: true,
            responsive: true,
            dom: "Bfrtip",
          });
        });*/
      })
      .catch((err) => {
        console.log(err);
      });
    /*-------------- Gọi API hiển thị danh sách Model công đoạn------------------ */
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
        for (var k in resFishCode.data) {
          var Object = JSON.parse(resFishCode.data[k]);
          if (Object.status == true) {
            // lọc ra mã cá đã xóa
            arrayValueFishCode.push(Object);
          }
        }
        this.setState({
          contentModelFS: arrayValueFishCode,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*-------------- truyền data từ button tạo mới------------------------- */
  onUpdateDinhMuc = (ID, NameModel) => {
    console.log(ID);
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=FishCode&key=" +
        ID,
      data: null,
    })
      .then((resFishCode) => {
        var valuetemp = JSON.parse(resFishCode.data);
        this.setState({
          valueDinhMuc: valuetemp,
          nameModel: NameModel,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*---------------Xóa đinh mức giá-------------------------------- */
  onDelDinhMuc =(ID, NameModel)=>{
    console.log(ID);
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=FishCode&key=" +
        ID,
      data: null,
    })
      .then((resFishCode) => {
        var valuetemp = JSON.parse(resFishCode.data);
        this.setState({
          valueDinhMuc: valuetemp,
        });
        this.setState((preState) => ({
          valueDinhMuc: {
            ...preState.valueDinhMuc,
            Status: false,
          },
        }));
      })
      .catch((err) => {
        console.log(err);
      });

  }
  /*---------------Tạo mới giá định mức-------------------------- */
  onCreateDinhMuc = (event) => {
    var { valueDinhMuc } = this.state;
    var stringValueDinhMuc = JSON.stringify(valueDinhMuc);

    event.preventDefault();
    console.log(stringValueDinhMuc);
    if (valueDinhMuc.ModelId != "") {
      axios({
        method: "POST",
        url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}`,
        data: {
          Key: valueDinhMuc.ID,
          Classify: "FishCode",
          Value: stringValueDinhMuc,
          Description: "Định giá cho mã cá theo khối lượng",
        },
      })
        .then((resFishCode) => {
          this.reLoadTable();
          alert("Thêm đinh giá " + valueDinhMuc.Name + " mới thành công !");
        })
        .catch((err) => {
          console.log("Tạo mới định giá lỗi");
          console.log(err);
        });
    } else {
      alert("Vui lòng chọn mã cá!");
    }
  };
  /*----------------------Chỉnh sửa giá định mức-------------------------- */
  onEditDinhMuc = (event) => {
    event.preventDefault();
    var { valueDinhMuc } = this.state;
    var stringValueDinhMuc = JSON.stringify(valueDinhMuc);
    console.log(stringValueDinhMuc);
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/key?token=" +
        `${Config.TOKEN}` +
        "&classify=FishCode&key=" +
        valueDinhMuc.ID,
      data: {
        Value: stringValueDinhMuc,
        Description: "Định giá cho mã cá theo khối lượng",
      },
    })
      .then((resFishCode) => {
        this.reLoadTable(); // SAU 1S THÌ LOAD LẠI DATA
        alert("Sửa đinh giá " + valueDinhMuc.Name + "thành công !");
      })
      .catch((err) => {
        alert("Lỗi xảy ra");
        console.log("Sửa định giá lỗi");
        console.log(err);
      });
  };
  /*-------------- Hàm xử lý gọi api xóa------------------------- */
  onDeleteDinhMuc = (event) => {
    event.preventDefault();
    var { valueDinhMuc } = this.state;
    var stringValueDinhMuc = JSON.stringify(valueDinhMuc);
    console.log(stringValueDinhMuc);
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/key?token=" +
        `${Config.TOKEN}` +
        "&classify=FishCode&key=" +
        valueDinhMuc.ID,
      data: {
        Value: stringValueDinhMuc,
        Description: "Định giá cho mã cá theo khối lượng",
      },
    })
      .then((resFishCode) => {
        this.reLoadTable(); // SAU 1S THÌ LOAD LẠI DATA
        alert("Sửa đinh giá " + valueDinhMuc.Name + "thành công !");
      })
      .catch((err) => {
        alert("Lỗi xảy ra");
        console.log("Sửa định giá lỗi");
        console.log(err);
      });

  };
  reLoadTable = () => {
    setTimeout(this.componentDidMount, 500);
  };
  render() {
    var {
      contentItems,
      filter,
      ModelId,
      ID,
      Status,
      Name,
      Weight,
      Price,
      contentModelFS,
      valueDinhMuc,
      nameModel,
    } = this.state;
    /*if (filter) {
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
    }*/
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>TẠO ĐỊNH MỨC CHO MÃ CÁ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Tạo định mức mã cá</li>
          </ol>
        </section>
        <section className="content">
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-create"
            id="id123"
          >
            Tạo định mức giá mới
          </button>
          <TableContentDinhMuc>
            {this.showContentItems(contentItems)}
          </TableContentDinhMuc>
          {/*------------------ button tạo mới định mức giá-------------------------*/}
          <div className="modal fade" id="modal-create">
            <form onSubmit={this.onCreateDinhMuc}>
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
                    <h4 className="modal-title">Tạo định mức giá</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Chọn công đoạn mã cá</h5>
                      </label>
                      <br />
                      <select
                        name="ModelId"
                        id="idModel"
                        className="form-control"
                        required="required"
                        onChange={this.onChange}
                      >
                        <option disabled selected value>
                          ---Chọn mã cá---
                        </option>
                        {this.showContentSelect(contentModelFS)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên định mức: vd: rổ 1</h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="2"
                        type="text"
                        className="form-control"
                        id="idName"
                        name="Name"
                        required
                        placeholder="Nhập tên giá định mức"
                        value={Name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Nhập khối lượng định mức quy định (KG)</h5>
                      </label>
                      <br />
                      <input
                        type="number"
                        className="form-control"
                        id="idWeight"
                        name="Weight"
                        required
                        placeholder="khối lượng KG"
                        value={Weight}
                        onChange={this.onChange}
                        min={0}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Giá định mức đạt được (VNĐ) </h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="3"
                        type="number"
                        className="form-control"
                        id="idPrice"
                        name="Price"
                        required
                        placeholder="Nhập giá VNĐ"
                        value={Price}
                        onChange={this.onChange}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Thêm giá định mức
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

          {/*------------------ button sửa khu vực-------------------------*/}
          <div className="modal fade" id="modal-edit">
            <form onSubmit={this.onEditDinhMuc}>
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
                    <h4 className="modal-title">Sửa giá định mức</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>ID công đoạn mã cá (Chỉ xem)</h5>
                      </label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        id="idName"
                        name="Name"
                        required
                        disabled
                        placeholder=""
                        value={valueDinhMuc.ID}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên công đoạn mã cá (chỉ xem)</h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="2"
                        type="text"
                        className="form-control"
                        id="idName"
                        name="Name"
                        required
                        disabled
                        placeholder=""
                        value={nameModel}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên định mức: vd: rổ 1</h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="2"
                        type="text"
                        className="form-control"
                        id="idName"
                        name="Name"
                        required
                        placeholder="Nhập tên giá định mức"
                        value={valueDinhMuc.Name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Nhập khối lượng định mức quy định (KG)</h5>
                      </label>
                      <br />
                      <input
                        type="number"
                        className="form-control"
                        id="idWeight"
                        name="Weight"
                        required
                        placeholder="khối lượng KG"
                        value={valueDinhMuc.Weight}
                        onChange={this.onChange}
                        min={0}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Giá định mức đạt được (VNĐ) </h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="3"
                        type="number"
                        className="form-control"
                        id="idPrice"
                        name="Price"
                        required
                        placeholder="Nhập giá VNĐ"
                        value={valueDinhMuc.Price}
                        onChange={this.onChange}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Chỉnh sửa định mức giá
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

          {/*------------------ button Xóa khu vực-------------------------*/}
          <form onSubmit={this.onDeleteDinhMuc}>
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
                      type="submit"
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
          </form>
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;

    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemDinhMuc
            key={index}
            index={index}
            contentItem={contentItem}
            onUpdateDinhMuc={this.onUpdateDinhMuc}
            onDelDinhMuc ={this.onDelDinhMuc}
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
export default DinhMuc;
