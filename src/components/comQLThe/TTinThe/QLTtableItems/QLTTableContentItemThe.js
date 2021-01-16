import React, { Component } from "react";
import * as Config from "../../../../untils/Config";
import axios from "axios";

class QLTTableContentItemThe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueEmp: "",
      nameModel: "",
      nameProcess: "",
    };
  }

  componentDidMount = () => {
    var { contentItem } = this.props;
    var iDEmp = contentItem.Employee;
    var nameModel = contentItem.ModelId;
    var nameProcess = contentItem.ProcessId;

    /*------lấy tên công nhân----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee&key=" +
        iDEmp,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          valueEmp: Object,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên công nhân !");
      });

    /*----------láy tên công đoạn----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process&key=" +
        nameProcess,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameProcess: Object.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên công đoạn !");
      });
 
  };
  // truyền dữ liệu ra ngoài
  getIDChange = () => {
    var { valueEmp, nameProcess } = this.state;
    var { contentItem } = this.props;
    this.props.getIDChange(contentItem, valueEmp, nameProcess);
  };
  // truyền id RFID để xóa
  getIDDeleteChange = () => {
    var {contentItem}= this.props
    this.props.getIDDeleteChange(contentItem.RFID, contentItem);
  };
  render() {
    var { contentItem, index } = this.props;
    if (contentItem.RegistTime != "" ) {
      var time = contentItem.RegistTime + "";
      var timeEdit = time.substring(0, 10); // cắt chuỗi số ngày
      var timeEditInt = parseInt(timeEdit); // chuyển về kiểu Int
      var dateFormat = require("dateformat");
      if (timeEditInt != '') {
        const unixTimeOut = timeEditInt;
        const dateOut = new Date(unixTimeOut * 1000);
        var dateNewOut = dateFormat(dateOut, "dd/mm/yyyy");
        var dateNewTimeOut = dateFormat(dateOut, "HH:MM:ss");
      }
    }
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>{index + 1}</td>
        <td>{dateNewOut}-{dateNewTimeOut}</td>
        <td>{contentItem.RFID}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Employee}</td>
        <td>{contentItem.Color}</td>
        <td>{contentItem.ProcessId}</td>
        <td>{contentItem.Classify}</td>
        <td>
          <div className="infoCard ">
            <button
              type="button"
              className="btn btn-primary card card-primary "
              data-toggle="modal"
              data-target="#modal-edit"
              id="id123"
              onClick={this.getIDChange}
            >
              Sửa
            </button>
          </div>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.getIDDeleteChange}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default QLTTableContentItemThe;
