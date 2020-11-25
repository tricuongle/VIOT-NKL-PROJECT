import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "jquery";
import * as Config from "../../../../untils/Config";
var count;
var valueNew;
var Description;
var ObjPriceOld;
var arrayPrice = [];
class ActionCreateCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      Name: "",
      ModelId: "",
      Status: "true",
      Price: [],
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

  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data?token=" +
        `${Config.TOKEN}` +
        "&Classify=FishCode",
      data: null,
    })
      .then((res) => {
        count = res.data.length + 1;
        var countString = "MC-NKL-0" + count;
        this.setState({
          ID: countString,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getValuePriceTag = () => {
    var nameTag = document.getElementById("NameTag").value;
    var weight = document.getElementById("idWeight").value;
    var price = document.getElementById("idPriceTag").value;
    var ObjPrice = { NameTag: nameTag, Weight: weight, Price: price };
    var arrayPriceCount = arrayPrice.push(ObjPrice);
    this.setState({
      Price: arrayPrice,
    });
    var nametag = document.getElementById("NameTag").value;
    var idw = document.getElementById("idWeight").value;
    var idpri = document.getElementById("idPriceTag").value;
    if (nametag == "" || idpri == "" || idw == "") {
      alert("Vui lòng điền đầy đủ thông tin !");
    }
    else{
      alert("Thêm định giá thành công !");
      document.getElementById("NameTag").value='';
      document.getElementById("idWeight").value='';
      document.getElementById("idPriceTag").value='';
    }
  };
  btnXoaDinhMuc =()=>{
    var txt;
    if (window.confirm("Bạn muốn xóa định mức ? ")) {
      txt = "Bạn chọn OK!";
      console.log(txt);
    } else {
      txt = "Bạn chọn Cancel!";
      console.log(txt);
    }
  }
  // upload data lên server
  onSave = (event) => {
    event.preventDefault();
    var { ID } = this.state;
    valueNew = JSON.stringify(this.state);
    console.log(valueNew);

    axios({
      method: "POST",
      url:
        `${Config.API_URL}` +
        "/api/data/Add?token=" +
        `${Config.TOKEN}` +
        "&key=" +
        ID +
        "&Value=" +
        valueNew +
        "&Description=NKL&classify=FishCode",
      data: null,
    })
      .then((res) => {
        console.log(res);
        alert("Thêm mã cá " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var { Name } = this.state;
    var { NameTag, Weight, Price } = this.state;
    return (
      <div className="modal fade" id="modal-create">
        <form onSubmit={this.onSave}>
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
                <h4 className="modal-title ">Tạo mới mã cá</h4>
              </div>
              <div className="modal-body">
                <div className="tenMaCa form-group">
                  <label htmlFor="devices">
                    <h5>Tên mã cá: </h5>
                  </label>
                  <br />
                  <input
                    maxLength="30"
                    minLength="4"
                    type="text"
                    placeholder="Nhập tên mã cá"
                    className="form-control"
                    id="NameFishCode"
                    name="Name"
                    required
                    value={Name}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <div className="themDinhGia-group">
                    <div className="tenDinhGia">
                      <label>
                        <h5>Tên định giá </h5>
                      </label>
                      <br />
                      <input
                        maxLength="30"
                        minLength="3"
                        type="text"
                        placeholder="Nhập tên định giá"
                        className="form-control"
                        id="NameTag"
                        name="NameTag"
                        required
                        // onChange={this.onChange}
                      />
                    </div>
                    <div className="khoiLuongMaCa">
                      <label>
                        <h5>Khối lượng rổ (Kg) </h5>
                      </label>
                      <br />
                      <input
                        type="number"
                        className="form-control"
                        id="idWeight"
                        name="Weight"
                        placeholder="nhập khối lượng (kg)"
                        required
                        // onChange={this.onChange}
                        min={0}
                      />
                    </div>
                    <div className="dinhGiaMaCa">
                      <label>
                        <h5>Định giá (Vnđ) </h5>
                      </label>
                      <br />
                      <input
                        type="number"
                        className="form-control"
                        id="idPriceTag"
                        name="Price"
                        placeholder="nhập đơn giá (vnđ)"
                        required
                        min={0}
                        //onChange={this.onChange}
                      />
                    </div>
                    <br />
                    <button
                      type="button"
                      className="btn btn-large   btn-primary btnThemDonGia "
                      onClick={this.getValuePriceTag}
                    >
                      Thêm
                    </button>
                  </div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Tên định giá</th>
                        <th>Khối lượng rổ (KG)</th>
                        <th>Đơn giá (VNĐ)</th>
                        <th>Sửa/xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Rổ abc</td>
                        <td>5</td>
                        <td>23000</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary "
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btnXoaDinhMuc"
                            onClick={this.btnXoaDinhMuc}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Tạo mới
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
    );
  }
}

export default ActionCreateCongNhan;
