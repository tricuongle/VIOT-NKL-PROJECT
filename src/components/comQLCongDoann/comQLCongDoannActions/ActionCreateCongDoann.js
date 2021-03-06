import React, { Component } from "react";
import axios from "axios";
import * as Config from '../../../untils/Config'

var count;
var valueNew;
var Description;
class ActionCreateCongDoann extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      Name: "",
      Level: 1,
      Parent: '',
      status: true,
      Before: "ProcessID (before)",
      After: "ProcessID (After)",
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
      url: `${Config.API_URL}` + "/api/data/Values?token=" + `${Config.TOKEN}` +"&Classify=Process",
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
        var countString = "CD-NKL-0" + idNew;
        console.log(countString);
        this.setState({
          Id: countString,
          Parent: countString
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSave = (event) => {
    event.preventDefault();
    var { Id } = this.state;
    valueNew = JSON.stringify(this.state);
    Description = document.getElementById("info").value;
    console.log(Description);
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
        "&classify=Process",
      data: null,
    })
      .then((res) => {
        console.log(res);
        alert("Thêm công đoạn " + this.state.Name + " thành công !");
        document.getElementById('NameCongDoann').value='';
        document.getElementById('info').value='';
        this.componentDidMount(); // gọi lại hàm để tạo ID công nhân mới
      })
      .catch((err) => {
        console.log(err);
        alert("Lỗi. không tạo công đoạn được!");
      });
  };
  render() {
    var { Name } = this.state;
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
                <h4 className="modal-title">TẠO CÔNG ĐOẠN MỚI</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="devices">
                    <h5>Tên công đoạn:</h5>
                  </label>
                  <br />
                  <input
                    maxLength="30"
                    minLength="5"
                    type="text"
                    className="form-control"
                    id="NameCongDoann"
                    name="Name"
                    required
                    placeholder="Nhập tên công đoạn"
                    value={Name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="devices">
                    <h5>Mô tả công đoạn:</h5>
                  </label>
                  <br />

                  <textarea
                    maxLength="50"
                    name="info"
                    id="info"
                    className="form-control"
                    required
                    rows="3"
                    placeholder="mô tả ngắn gọn về hoạt động của công đoạn"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  
                  Thêm công đoạn
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
export default ActionCreateCongDoann;
