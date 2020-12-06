import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";
var count;
var valueNew;
var ArrayValue = [];
var load = [];
var isCheck = 1;
class ActionCreateCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      CardCheck: true,
      valueEmp: {
        Id: "",
        Name: "",
        gender: "",
        CMND: "",
        CardNo: "",
        BirthDay: "",
        User: "",
        PassWord: "",
        IsLock: true,
        JobLevel: 3,
        Department: "",
        Description: "công nhân NKL",
      },
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState((preState) => ({
      valueEmp: { ...preState.valueEmp, [name]: value },
    }));
  };
  /*----------lấy số lượng ds công nhân và cộng 1 tạo id công nhân mới------------*/
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee",
      data: null,
    })
      .then((res) => {
        count = res.data.length + 1;
        var countString = "CN-NKL-0" + count;
        this.setState((preState) => ({
          valueEmp: {
            ...preState.valueEmp,
            Id: countString,
          },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
    /*--------------------- */
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*-----------Hàm tạo mới công nhân --------------- */
  onSave = (event) => {
    event.preventDefault();
    var { valueEmp, contentItems } = this.state;
    var isCheck = true;
    valueNew = JSON.stringify(valueEmp);
    console.log(valueNew);
    for(var k in contentItems){
      if(valueEmp.CardNo == contentItems[k].CardNo){
          isCheck= false;
      }
    }
    if (isCheck) {
      axios({
      method: "POST",
      url:
        `${Config.API_URL}` +
        "/api/data/Add?token=" +
        `${Config.TOKEN}` +
        "&key=" +
        valueEmp.Id +
        "&Value=" +
        valueNew +
        "&Description=NKL&classify=Employee",
      data: null,
    })
      .then((res) => {
        
        alert("Thêm công nhân " + valueEmp.Name+ " thành công !");
        this.LoadData();
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      alert("Mã số  " +valueEmp.CardNo +" công nhân đã tồn tại!");
    }
  };

  // load dữ liệu lại
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
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          ArrayValue.push(contentItem);
        });

        this.setState({
          contentItems: ArrayValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  LoadData = () => {
    var { contentItems } = this.state;
    this.setState({
      contentItems: load,
    });
    this.dataTableLoad();
  };
  /*------------------------------------- */
  /*----------Nội dụng xử lý giao diện-------------- */
  render() {
    var { Name, CMND, BirthDay, Id, CardNo } = this.state;
    return (
      <div className="modal fade" id="modal-create">
        <form onSubmit={this.onSave}>
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
                <h4 className="modal-title">Thêm mới công nhân</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="devices">
                    <h5>Họ tên:</h5>
                  </label>
                  <br />
                  <input
                    maxLength="30"
                    minLength="5"
                    type="text"
                    placeholder="Nhập đầy đủ họ tên công nhân"
                    className="form-control"
                    id="NameEmployee"
                    name="Name"
                    required
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
                    value={CardNo}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="devices">
                    <h5>CMND:</h5>
                  </label>
                  <br />
                  <input
                    type="number"
                    className="form-control"
                    id="NumCMND"
                    name="CMND"
                    placeholder="nhập mã số CMND thẻ căn cước"
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
                    id="filter-date"
                    name="BirthDay"
                    value={BirthDay}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.reLoadTable}
                >
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
