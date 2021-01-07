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
    var valueContentNew = (
      <p>
        Tên: {contentItem.ValueNew.Name} <br />
        KL vào Min/Max: {contentItem.ValueNew.WeightInMin}/
        {contentItem.ValueNew.WeighInMax}
        <br />
        KL ra Min/Max: {contentItem.ValueNew.WeightOutMin}/
        {contentItem.ValueNew.WeighOutMax}
        <br />
        công đoạn: {nameProcessNew}
        <br />
        Nhóm: {contentItem.ValueNew.Group}
        <br />
        Classify: {contentItem.ValueNew.Classify}
      </p>
    );
    var valueContentOld = (
      <p>
        Tên: {contentItem.ValueOld.Name} <br />
        KL vào Min/Max: {contentItem.ValueOld.WeightInMin}/
        {contentItem.ValueOld.WeighInMax}
        <br />
        KL ra Min/Max: {contentItem.ValueOld.WeightOutMin}/
        {contentItem.ValueOld.WeighOutMax}
        <br />
        công đoạn: {nameProcessOld}
        <br />
        Nhóm: {contentItem.ValueOld.Group}
        <br />
        Classify: {contentItem.ValueOld.Classify}
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
        <td>{contentItem.ValueNew.Id}</td>
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
