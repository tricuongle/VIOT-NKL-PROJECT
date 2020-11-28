import React, { Component } from "react";
import axios from "axios";
import * as Config from '../../../untils/Config'
var count;
var valueNew;
class ActionCreateCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
/*----------lấy số lượng ds công nhân và cộng 1 tạo id công nhân mới------------*/
  componentDidMount = () => {
    axios({
      method: "GET",
      url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}` + "&Classify=Employee",
      data: null,
    })
      .then((res) => {
        count = res.data.length + 1;
        var countString = "CN-NKL-0" + count;
        this.setState({
          Id: countString,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*-----------Hàm tạo mới công nhân --------------- */
  onSave = (event) => {
    event.preventDefault();
    var { CMND ,Id} = this.state;
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
        "&Description=NKL&classify=Employee",
      data: null,
    })
      .then((res) => {
        console.log(res);
        alert("Thêm công nhân " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*----------Nội dụng xử lý giao diện-------------- */
  render() {
    var { Name, CMND, BirthDay, Id } = this.state;
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
                    <h5>CMND:</h5>
                  </label>
                  <br />
                  <input
                    type="number"
                    className="form-control"
                    id="NumCMND"
                    name="CMND"
                    placeholder="nhập mã số CMND thẻ căn cước"
                    required
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
                    required
                    value={BirthDay}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary"
                 onClick={this.reLoadTable}>
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
