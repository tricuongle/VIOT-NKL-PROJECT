import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "jquery";
import * as Config from "../../../untils/Config";

var count;
var valueNew;
var Description;
var IdProcessOld;
class ActionEditKhuVuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: "",
      Name: "",
      Level: 1,
      Parent: "",
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
  onSave = (event) => {
    event.preventDefault();
    Description = document.getElementById("info").value;
    var { Id } = this.state;
    valueNew = JSON.stringify(this.state);
    console.log(valueNew);
   /* axios({
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
        window.location.reload(false);
        alert("Sửa khu vực " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });*/
  };

  render() {
    var { Name, Id } = this.state;
    return (
      <div className="modal fade" id="modal-edit">
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
                <h4 className="modal-title">Chỉnh sửa khu vực</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="devices">
                    <h5>ID khu vực: (chỉ xem)</h5>
                  </label>
                  <br />
                  <input
                    maxLength="30"
                    minLength="5"
                    type="text"
                    className="form-control"
                    id="IDProcess"
                    name="Id"
                    value={Id}
                    disabled
                  />
                </div>
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
                    id="NameProcess"
                    name="Name"
                    required
                    placeholder="Nhập tên khu vực thay đổi"
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
                    className="form-control"
                    rows="3"
                    placeholder="mô tả ngắn khi thay đổi"
                  ></textarea>
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
    );
  }
}
export default ActionEditKhuVuc;
