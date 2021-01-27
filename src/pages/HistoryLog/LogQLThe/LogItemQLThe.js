import React, { Component } from "react";
import * as Config from "../../../untils/Config";
import axios from "axios";
class LogItemQLThe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEmployeeNew: "",
      nameProcessNew: "",
    };
  }
  componentDidMount = () => {
    var { contentItem } = this.props;
    var idEmployeeNew = contentItem.ValueNew.Employee;
    var idProcessNew = contentItem.ValueNew.ProcessId;

    /*------lấy tên công nhân mới ----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee&key=" +
        idEmployeeNew,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameEmployeeNew: Object.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên công nhân !");
      });

    /*------lấy tên công đoạn mới ----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process&key=" +
        idProcessNew,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameProcessNew: Object.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên công đoạn !");
      });
  };

  render() {
    var { contentItem, index } = this.props;
    var { nameEmployeeNew, nameProcessNew } = this.state;
    var valueContentNew;
    if (contentItem.ValueNew == "Thông tin đã xóa") {
      valueContentNew = <p className="textLog">Thông tin đã xóa</p>;
    } else {
      valueContentNew = (
        <p>
          <b>Tên thẻ:</b> {contentItem.ValueNew.Id} <br />
          <b>Tên công nhân:</b> {nameEmployeeNew}
          <br />
          <b>Màu:</b> {contentItem.ValueNew.Color}
          <br />
          <b>Công đoạn:</b> {nameProcessNew}
          <br />
          <b>Loại:</b> {contentItem.ValueNew.Classify}
        </p>
      );
    }
    var valueContentOld = (
      <p>
        <b>tên thẻ:</b> {contentItem.ValueOld.Id} <br />
        <b>Tên công nhân:</b> {contentItem.ValueOld.Employee}
        <br />
        <b>Màu:</b> {contentItem.ValueOld.Color}
        <br />
        <b>Công đoạn:</b> {contentItem.ValueOld.ProcessId}
        <br />
        <b> Loại</b> : {contentItem.ValueOld.Classify}
      </p>
    );
    // lấy thời gian của log
    var getTime = contentItem.time;
    const TimeLog = new Date(getTime * 1000);
    var dateFormat = require("dateformat");
    var day = dateFormat(TimeLog, "dd/mm/yyyy");
    var time = dateFormat(TimeLog, "HH:MM:ss");
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.ValueOld.RFID}</td>
        <td>
          {day}-{time}
        </td>
        <td>{valueContentNew}</td>
        <td>{valueContentOld}</td>
      </tr>
    );
  }
}
export default LogItemQLThe;
