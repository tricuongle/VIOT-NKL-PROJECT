import React, { Component } from "react";

class QLTTableContentItemCongNhan extends Component {
  render() {
    var { contentItem } = this.props;
    var statusEmployee = contentItem.IsLock ? "đang làm việc" : "Đã nghỉ";
    const dataDay = parseInt(contentItem.BirthDay);
    var BirthDay = new Date(dataDay).toLocaleDateString("en-US");
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
          </div>
        </td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.CMND}</td>
        <td>{BirthDay}</td>
        <td>{statusEmployee}</td>
      </tr>
    );
  }
}
export default QLTTableContentItemCongNhan;
