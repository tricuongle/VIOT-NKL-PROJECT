import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "jquery";
const id = "NV-0";
const LOCALHOST = "http://171.232.86.160:5001";
const KEY = "";
const CLASSIFY = "Employee";
const TOKEN =
  "ca8a745971a27185fda435692a1e66df835e7cd21261cebbc0c5be88b2250db4d2094547265b6cfc8d7d112d4c411c34";
var count;
var valueNew;
class ActionEditCongNhan extends Component {
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
  onEdit = (Id) => {
    this.setState({
        Id: Id,
    });
    
  };
  componentDidMount = () => {
      this.onEdit(this.state.Id);
      console.log(this.state);
    /*axios({
      method: "GET",
      url: LOCALHOST+'/api/data?token='+TOKEN+'&Classify='+CLASSIFY,
      data: null,
    })
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err);
      });*/
  };
  onSave = (event) => {
    event.preventDefault();
    var { CMND } = this.state;
    valueNew = JSON.stringify(this.state);
    console.log(valueNew);
    axios({
      method: "POST",
      url:
      LOCALHOST+'/api/data/key?token='+TOKEN+'&classify=Employee&key='+KEY,
      data: null,
    })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
        alert("Sửa thông tin công nhân " + this.state.Name + " thành công !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var { Name, CMND, BirthDay, Id } = this.state;
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
                <h4 className="modal-title">Tạo mới công nhân</h4>
              </div>
              <div className="modal-body">
              <div className="form-group">
                    <label htmlFor="devices">
                      <h5>ID công nhân:</h5>
                    </label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="nameDevice"
                      disabled
                    />
                  </div>
                <div className="form-group">
                  <label htmlFor="devices">
                    <h5>Họ tên:</h5>
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
                <button type="submit" className="btn btn-primary">
                  Sửa thông tin
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
export default ActionEditCongNhan;
