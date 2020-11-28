import React, { Component } from "react";

class TableContentItemCongNhan extends Component {
  onGetId = () => {
    this.props.onGetId(this.props.contentItem.Id);
  };
  render() {
    var { contentItem, index } = this.props;
    this.componentDidMount = () => {
      this.props.onEdit(contentItem.Id); // truyền dữ liệu ra ngoài cha
    };
    var statusEmployee = contentItem.IsLock ? "đang làm việc" : "Đã nghỉ";
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.CMND}</td>
        <td>{contentItem.BirthDay}</td>
        <td>{statusEmployee}</td>
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
