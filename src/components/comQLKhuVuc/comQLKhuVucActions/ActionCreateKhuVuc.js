import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "jquery";
const id = "NV-0";
const LOCALHOST = "http://171.232.86.160:5001";
const KEY = "";
const CLASSIFY = "Process";
const TOKEN =
  "ca8a745971a27185fda435692a1e66df835e7cd21261cebbc0c5be88b2250db4d2094547265b6cfc8d7d112d4c411c34";
var count;
var valueNew;
var Description;
class ActionCreateCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      Name: "",
      Level: 1,
      Parent: '',
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
      url: LOCALHOST + "/api/data?token=" + TOKEN +"&Classify="+ CLASSIFY,
      data: null,
    })
      .then((res) => {
        count = res.data.length + 1;
        var countString = "Zone-NKL-0" + count;
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
        LOCALHOST +
        "/api/data/Add?token=" +
        TOKEN +
        "&key=" +
        Id +
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
        alert("Thêm khu vực " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                <h4 className="modal-title">Tạo khu vực mới</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="devices">
                    <h5>Tên khu vực:</h5>
                  </label>
                  <br />
                  <input
                    maxLength="30"
                    minLength="5"
                    type="text"
                    className="form-control"
                    id="NameEmployee"
                    name="Name"
                    required
                    placeholder="Nhập tên khu vực"
                    value={Name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="devices">
                    <h5>Mô tả:</h5>
                  </label>
                  <br />

                  <textarea
                    maxLength="50"
                    name="info"
                    id="info"
                    class="form-control"
                    rows="3"
                    placeholder="mô tả ngắn gọn về hoạt động của khu vực"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Thêm khu vực
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
