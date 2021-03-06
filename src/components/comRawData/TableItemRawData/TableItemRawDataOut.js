import React, { Component } from "react";
import * as Config from "../../../untils/Config";
class TableItemRawDataOut extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { contentItem } = this.props;
    const unixTime = contentItem.ReadTime;
    const date = new Date(unixTime * 1000);
    var dateFormat = require("dateformat");
    var dateNew = dateFormat(date, "dd-mm-yyyy");
    var dateNewTime = dateFormat(date, "HH:MM:ss");
    var img = `${Config.API_URL}` + "/api/images/" + contentItem.Image + ".jpg";
    return (
      <tr>
        <td>{dateNew}</td>
        <td>{dateNewTime}</td>
        <td>{contentItem.EmployeeName}</td>
        <td>{contentItem.CardId}</td>
        <td>{contentItem.ModelName}</td>
        <td>{contentItem.Classify}</td>
        <td>{contentItem.Weight}</td>
        <td>{contentItem.ProcessName}</td>
        <td>{contentItem.DeviceName}</td>
        <td>
          <a href={img} target="_blank">
            Xem ảnh
          </a>
        </td>
      </tr>
    );
  }
}
export default TableItemRawDataOut;
