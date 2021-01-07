import React, { Component } from "react";
class LogItemQLCongNhan extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { contentItem, index } = this.props;
    var valueContentNew;
    if(contentItem.ValueNew == "Thông tin đã xóa"){
      valueContentNew = contentItem.ValueNew
    }else{
      valueContentNew = (
        <p>
          Tên: {contentItem.ValueNew.Name} <br />
          Mã số: {contentItem.ValueNew.CardNo}
          <br />
          Giới tính: {contentItem.ValueNew.gender}
          <br />
          CMND: {contentItem.ValueNew.CMND}
          <br />
          Ngày sinh: {contentItem.ValueNew.BirthDay}
        </p>
      );
    }
    
    var valueContentOld = (
      <p>
        tên: {contentItem.ValueOld.Name} <br />
        Mã số: {contentItem.ValueOld.CardNo}
        <br />
        giới tính: {contentItem.ValueOld.gender}
        <br />
        CMND: {contentItem.ValueOld.CMND}
        <br />
        Ngày sinh: {contentItem.ValueOld.BirthDay}
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
        <td>{day}-{time}</td>
        <td>{valueContentNew}</td>
        <td>{valueContentOld}</td>
      </tr>
    );
  }
}
export default LogItemQLCongNhan;
