import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";

var valueNew;
var Description;
class ActionCreateMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentProcess: [],
      valueMaCa: {
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
    };
  }
  // hàm thay đổi giá trị state khi gõ vào popop 
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState((preState) => ({
      valueMaCa: {
        ...preState.valueMaCa,
        [name]: value,
      },
    }));
    /*hiện ẩn thông tin khi gõ hoặc không gõ trường group */
    var valueGroup = document.getElementById("idGroup").value;
    if (valueGroup != "") {
      document.getElementById("idClassify").disabled = false;
    } else {
      document.getElementById("idClassify").value = "";
      document.getElementById("idClassify").disabled = true;
    }
  };
  // lấy số lượng của mã cá và cộng dồn gán ID
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
      .then((res) => {
        var arrNum = [];
        for (var k in res.data) {
          var getString = JSON.parse(res.data[k]).Id;
          var getNum = getString.substring(8);
          arrNum.push(getNum);
        }
        var maxInNumbers = Math.max.apply(Math, arrNum);
        var idNew = maxInNumbers + 1;
        if (idNew < 0) {
          idNew = 1;
        }
        var countString = "MC-NKL-0" + idNew;
        var getTimetoDay = new Date().getTime();
        this.setState((preState) => ({
          valueMaCa: {
            ...preState.valueMaCa,
            Id: countString,
            CreateDate: getTimetoDay, // sẵn gán id vào id valueMaCa
          },
        }));
      })
      .catch((err) => {
        console.log(err);
        console.log("Không lấy được số lượng mã cá !");
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
  /*-----------------------hàm thêm mã cá vào server ------------------------- */
  onSave = (event) => {
    event.preventDefault();
    var { Id } = this.state.valueMaCa;
    valueNew = JSON.stringify(this.state.valueMaCa);
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
        alert("Thêm mã cá " + this.state.Name + " thành công !");
        this.componentDidMount(); // gọi lại hàm để tạo ID công nhân mới
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var { Name, contentProcess } = this.state;
    // nội dung html tạo mã cá mới (model)
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
                <h4 className="modal-title ">TẠO MỚI MÃ CÁ</h4>
              </div>
              <div className="modal-body">
                <div className="tenMaCa form-group">
                  <label htmlFor="devices">
                    <h5>Tên mã cá: </h5>
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
                        step=".01"
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
                        placeholder="nhập tên nhóm"
                        className="form-control"
                        id="idGroup"
                        name="Group"
                        min={0}
                        step=".01"
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
                        id="idClassify"
                        name="Classify"
                        placeholder="Nhập loại"
                        disabled
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  {/* */}
                  <table className="table table-hover"></table>
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
export default ActionCreateMaCa;
