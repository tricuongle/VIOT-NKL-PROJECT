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
    var {
      nameEmployeeNew,
      nameProcessNew,
    } = this.state;
    var valueContentNew;
    if (contentItem.ValueNew == "Thông tin đã xóa") {
      valueContentNew = contentItem.ValueNew;
    } else {
      valueContentNew = (
        <p>
          Tên thẻ: {contentItem.ValueNew.Id} <br />
          Tên công nhân: {nameEmployeeNew}
          <br />
          Màu: {contentItem.ValueNew.Color}
          <br />
          Công đoạn: {nameProcessNew}
          <br />
          Loại: {contentItem.ValueNew.Classify}
        </p>
      );
    }
    var valueContentOld = (
      <p>
        tên thẻ: {contentItem.ValueOld.Id} <br />
        Tên công nhân: {contentItem.ValueOld.Employee}
        <br />
        Màu: {contentItem.ValueOld.Color}
        <br />
        Công đoạn: {contentItem.ValueOld.ProcessId}
        <br />
        Loại: {contentItem.ValueOld.Classify}
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
