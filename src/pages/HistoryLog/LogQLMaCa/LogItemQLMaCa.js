import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";
class LogItemQLMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameProcessOld: "",
      nameProcessNew: "",
    };
  }
  componentDidMount = () => {
    var { contentItem } = this.props;
    var idProcessOld = contentItem.ValueOld.ProcessId;
    var idProcessNew = contentItem.ValueNew.ProcessId;
    /*------lấy tên công đoạn cũ ----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process&key=" +
        idProcessOld,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameProcessOld: Object.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên công đoạn !");
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
    var { nameProcessNew, nameProcessOld } = this.state;
    var valueContentNew;

    if (contentItem.ValueNew == "Thông tin đã xóa") {
      valueContentNew = <p className="textLog">Thông tin đã xóa</p>;
    } else {
      valueContentNew = (
        <p>
          <b>Tên:</b> {contentItem.ValueNew.Name} <br />
          <b>KL vào Min/Max:</b> {contentItem.ValueNew.WeightInMin}/
          {contentItem.ValueNew.WeighInMax}
          <br />
          <b>KL ra Min/Max:</b> {contentItem.ValueNew.WeightOutMin}/
          {contentItem.ValueNew.WeighOutMax}
          <br />
          <b>công đoạn:</b> {nameProcessNew}
          <br />
          <b>Nhóm:</b> {contentItem.ValueNew.Group}
          <br />
          <b>Classify:</b> {contentItem.ValueNew.Classify}
        </p>
      );
    }
    var valueContentOld = (
      <p>
        <b>Tên:</b> {contentItem.ValueOld.Name} <br />
        <b>KL vào Min/Max:</b> {contentItem.ValueOld.WeightInMin}/
        {contentItem.ValueOld.WeighInMax}
        <br />
        <b>KL ra Min/Max:</b> {contentItem.ValueOld.WeightOutMin}/
        {contentItem.ValueOld.WeighOutMax}
        <br />
        <b>công đoạn:</b> {nameProcessOld}
        <br />
        <b>Nhóm:</b> {contentItem.ValueOld.Group}
        <br />
        <b>Classify:</b> {contentItem.ValueOld.Classify}
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
        <td>{contentItem.ValueOld.Id}</td>
        <td>
          {day}-{time}
        </td>
        <td>{valueContentNew}</td>
        <td>{valueContentOld}</td>
      </tr>
    );
  }
}
export default LogItemQLMaCa;
