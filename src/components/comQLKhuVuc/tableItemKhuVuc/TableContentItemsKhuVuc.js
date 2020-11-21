import React, { Component } from "react";

class TableContentItemsKhuVuc extends Component {
  render() {
    var { contentItem, index } = this.props;
   // var statusEmployee = contentItem.IsLock ? "đang làm việc" : "Đã nghỉ";
    const dataDay = parseInt(contentItem.TimeCreate);
    var dayCreate = new Date(dataDay*1000).toLocaleDateString("en-US");
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.Description}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
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
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TableContentItemsKhuVuc;
