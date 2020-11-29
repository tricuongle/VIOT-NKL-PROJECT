import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "jquery";
import * as Config from "../../../untils/Config";

var count;
var valueNew;
var Description;
var contentNameProcess = []; // mảng chứa tên khu vực
class ActionCreateCongDoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.state1 = {
      Id: "",
      NameProcess: "",
    };
  }
  onChange = (event) => {
    // var temp = document.getElementById("idProcess").value; // lấy value chứa id của bảng khu vực
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      // thay đổi giá trị
      [name]: value,
      //ProcessId: temp,
    });
    var valueGroup = document.getElementById("idGroup").value;
    if (valueGroup != "") {
      document.getElementById("idClassify").disabled = false;
    } else {
      document.getElementById("idClassify").value = "";
      document.getElementById("idClassify").disabled = true;
    }
  };
  // lấy số lượng của công đoạn và cộng dồn gán ID
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model",
      data: null,
    })
      .then((res) => {
        count = res.data.length + 1;
        var countString = "CD-NKL-0" + count;
        this.setState({
          Id: countString,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Không lấy được số lượng công đoạn !");
      });
    // lấy danh sách tên khu vực
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
        for (var k in resProcess.data) {
          var Object = JSON.parse(resProcess.data[k]);
          contentNameProcess.push(Object);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Không lấy được tên khu vực !");
      });
  };

  onSave = (event) => {
    event.preventDefault();
    var { Id } = this.state;
    valueNew = JSON.stringify(this.state);
    console.log(valueNew);
    axios({
      method: "POST",
      url:
        `${Config.API_URL}` +
        "/api/data/Add?token=" +
        `${Config.TOKEN}` +
        "&key=" +
        Id +
        "&Value=" +
        valueNew +
        "&Description=" +
        Description +
        "&classify=Model",
      data: null,
    })
      .then((res) => {
        console.log(res);
        alert("Thêm công đoạn (mã cá) " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var { Name } = this.state;
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
                <h4 className="modal-title ">Tạo mới công đoạn (mã cá)</h4>
              </div>
              <div className="modal-body">
                <div className="tenMaCa form-group">
                  <label htmlFor="devices">
                    <h5>Tên công đoạn (mã cá): </h5>
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Nhập tên mã cá"
                    className="form-control"
                    id="idName"
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
                        <h5>KL Min đầu vào </h5>
                      </label>
                      <br />
                      <input
                        type="number"
                        placeholder="khối lượng KG"
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
                        placeholder="khối lượng KG"
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
                        placeholder="khối lượng KG"
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
                        placeholder="khối lượng KG"
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
                        placeholder="nhập tên nhóm"
                        className="form-control"
                        id="idGroup"
                        name="Group"
                        min={0}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="groupAndclassify">
                      <label>
                        <h5>Classify</h5>
                      </label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        id="idClassify"
                        name="Classify"
                        placeholder="khối lượng KG"
                        disabled
                        onChange={this.onChange}
                        min={0}
                      />
                    </div>
                  </div>
                  <table className="table table-hover">
                   {/* <thead>
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
                          <button type="button" className="btn btn-primary ">
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
                   </tbody>*/}
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
  // hàm hiển thị danh sách tên khu vực.
  showContentSelect(contentNameProcess) {
    var result = null;
    if (contentNameProcess.length >= 0) {
      result = contentNameProcess.map((contentItem, index) => {
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
export default ActionCreateCongDoan;
