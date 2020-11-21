import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "jquery";
const id = "NV-0";
const LOCALHOST = "http://171.232.86.160:500";
const KEY = "";
const CLASSIFY = "FishCode";
const TOKEN =
  "04c5077dc551934ebdc267fbc83357b9967e19d21fa9d8c4884fac130acb7dadc50e05c08b9980cd7a379f2c8fa39e50";
var count;
var valueNew;
var Description;
class ActionCreateCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      Name: "",
      ModelId: "",
      Status: "",
      Price: [{ NameTag: "", Weight: "", Price: "" }],
    };
    this.state1 = {
      NameTag: "",
      Weight: "",
      Price: "",
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
      url: LOCALHOST + "/api/data?token=" + TOKEN + CLASSIFY,
      data: null,
    })
      .then((res) => {
        count = res.data.length + 1;
        var countString = "NC-NKL-0" + count;
        this.setState({
          Id: countString,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getValuePriceTag =()=> {

    var NameTag = document.getElementById("NameTag").value;
    var Weight = document.getElementById("idWeight").value;
    var Price = document.getElementById("idPriceTag").value;
    this.setState({
      NameTag: NameTag,
      Weight: Weight,
      Price: Price,
    })
    console.log(this.state1);

  }
  // upload data lên server
  onSave = (event) => {
    event.preventDefault();
    var { CMND, Id } = this.state;
    valueNew = JSON.stringify(this.state);
    console.log(valueNew);
    axios({
      method: "POST",
      url:
        LOCALHOST +
        "/api/data/Add?token=" +
        TOKEN +
        "&key=" +
        KEY +
        "&Value=" +
        valueNew +
        "&Description=" +
        Description +
        "&classify=" +
        CLASSIFY,
      data: null,
    })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
        alert("Thêm mã cá " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var { Name } = this.state;
    var { NameTag, Weight, Price } = this.state1;
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
                    placeholder="Nhập đầy đủ họ tên công nhân"
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
                          onChange={this.onChange}
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
                          onChange={this.onChange}
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
                          name="PriceTag"
                          placeholder="nhập đơn giá (vnđ)"
                          required
                          onChange={this.onChange}
                        />
                      </div>
                      <br />
                      <button
                        type="button"
                        className="btn btn-large   btn-primary btnThemDonGia "
                        onClick = {this.getValuePriceTag}
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
                            data-toggle="modal"
                            data-target="#modal-Delete"
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btnXoaDinhMuc"
                            data-toggle="modal"
                            data-target="#modal-Delete"
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
