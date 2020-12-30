import React, { Component } from "react";

class TableContentItemCongNhan extends Component {
  onGetId = () => {
    this.props.onGetId(this.props.contentItem);
  };
  render() {
    var { contentItem, index } = this.props;
    this.componentDidMount = () => {
      this.props.onEdit(contentItem.Id); // truyền dữ liệu ra ngoài cha
    };
    var statusEmployee = contentItem.IsLock ? "đang làm việc" : "Đã nghỉ";
    var gender, CMND, BirthDay;
    if (
      contentItem.gender == "null" ||
      contentItem.gender == "__" ||
      contentItem.gender == ""
    ) {
      gender = "__";
    }else {gender=contentItem.gender}
    if (
      contentItem.CMND == "null" ||
      contentItem.CMND == "__" ||
      contentItem.CMND == ""
    ) {
      CMND = "__";
    }else {CMND=contentItem.CMND}
    if (
      contentItem.BirthDay == "null" ||
      contentItem.BirthDay == "__" ||
      contentItem.BirthDay == ""
    ) {
      BirthDay = "__";
    }else {BirthDay=contentItem.BirthDay}
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{gender}</td>
        <td>{contentItem.CardNo}</td>
        <td>{CMND}</td>
        <td>{BirthDay}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
            onClick={this.onGetId}
          >
            Sửa
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modal-Delete"
            onClick={this.onGetId}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TableContentItemCongNhan;
