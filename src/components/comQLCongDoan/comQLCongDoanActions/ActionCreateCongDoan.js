import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { data } from "jquery";
const id = "NV-0";
const LOCALHOST = "http://171.232.86.160:5001";
const KEY = "";
const CLASSIFY = "Model";
const TOKEN =
  "ca8a745971a27185fda435692a1e66df835e7cd21261cebbc0c5be88b2250db4d2094547265b6cfc8d7d112d4c411c34";
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
      WeighMax: "",
      WeightMin: "",
      CurrentRunModel: [],
    };
    this.state1 = {
      Id: "",
      NameProcess: "",
    };
  }
  onChange = (event) => {
    var temp =document.getElementById("idProcess").value // lấy value chứa id của bảng khu vực 
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({ // thay đổi giá trị
      [name]: value,
      ProcessId: temp,

    });
  };
  // lấy số lượng của công đoạn và cộng dồn gán ID
  componentDidMount = () => {
    
    axios({
      method: "GET",
      url: LOCALHOST + "/api/data?token=" + TOKEN + "&Classify=" + CLASSIFY,
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
        LOCALHOST + "/api/data/Values?token=" + TOKEN + "&Classify=Process",
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
                <h4 className="modal-title">Tạo công đoạn mới</h4>
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
                    id="NameEmployee"
                    name="Name"
                    required
                    placeholder="Nhập tên khu vực"
                    value={Name}
                    onChange={this.onChange}
                  />
                  <label id="areaDevice">
                    <h5> Khu vực:</h5>
                  </label>
                  <br />
                  <select className=" form-control " id="idProcess"  onChange={this.onChange} name="ProcessId" >
                    {/*truyền DS khu vực vào hàm để lọc tên */}
                    {this.showContentSelect(contentNameProcess)}
                  </select>
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
  // hàm hiển thị danh sách tên khu vực.
  showContentSelect(contentNameProcess) {
    var result = null;
    if (contentNameProcess.length >= 0) {
      result = contentNameProcess.map((contentItem, index) => {
        return (
          <option key={index} value={contentItem.Id}   >
            {contentItem.Name}
          </option>
        );
      });
    }
    return result;
  }
}
export default ActionCreateCongDoan;
