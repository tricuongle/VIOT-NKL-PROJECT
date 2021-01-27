import React, { Component } from "react";
class LogItemQLCongNhan extends Component {
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
          <b>Mã số:</b> {contentItem.ValueNew.CardNo}
          <br />
          <b>Giới tính:</b> {contentItem.ValueNew.gender}
          <br />
          <b>CMND:</b> {contentItem.ValueNew.CMND}
          <br />
          <b>Ngày sinh:</b> {contentItem.ValueNew.BirthDay}
        </p>
      );
    }

    var valueContentOld = (
      <p>
        <b>tên:</b> {contentItem.ValueOld.Name} <br />
        <b>Mã số:</b> {contentItem.ValueOld.CardNo}
        <br />
        <b>Giới tính:</b> {contentItem.ValueOld.gender}
        <br />
        <b>CMND:</b> {contentItem.ValueOld.CMND}
        <br />
        <b>Ngày sinh:</b> {contentItem.ValueOld.BirthDay}
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
export default LogItemQLCongNhan;
