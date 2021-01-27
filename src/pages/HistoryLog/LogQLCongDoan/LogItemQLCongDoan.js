import React, { Component } from "react";
class LogItemQLCongDoan extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { contentItem, index } = this.props;
    var valueContentNew;
    if (contentItem.ValueNew == "Thông tin đã xóa") {
      valueContentNew = <p className="textLog">Thông tin đã xóa</p>;
    } else {
      valueContentNew = (
        <p>
          <b>Tên:</b> {contentItem.ValueNew.Name} <br />
        </p>
      );
    }

    var valueContentOld = (
      <p>
        <b>Tên:</b> {contentItem.ValueOld.Name} <br />
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
export default LogItemQLCongDoan;
