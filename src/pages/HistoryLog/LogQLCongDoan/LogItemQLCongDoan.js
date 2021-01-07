import React, { Component } from "react";
class LogItemQLCongDoan extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { contentItem, index } = this.props;
    var valueContentNew = (
      <p>
        Tên: {contentItem.ValueNew.Name} <br />
      </p>
    );
    var valueContentOld = (
      <p>
        tên: {contentItem.ValueOld.Name} <br />
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
        <td>{day}-{time}</td>
        <td>{valueContentNew}</td>
        <td>{valueContentOld}</td>
      </tr>
    );
  }
}
export default LogItemQLCongDoan;
