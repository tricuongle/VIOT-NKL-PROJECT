import React, { Component } from "react";

class QLTTableContentItemThe extends Component {
  render() {
    var { contentItem, index } = this.props;
    //var statusEmployee = contentItem.Status ? "Sử dụng" : "chưa sử dụng";
    const dataDay = parseInt(contentItem.BirthDay);
    //var BirthDay = new Date(dataDay).toLocaleDateString("en-US");
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
        <td>{contentItem.Employee}</td>
        <td>null</td>
        <td>{contentItem.Color}</td>
        <td>{contentItem.CurrentRunModel}</td>
        <td>{contentItem.RegistTime}</td>
        <td>{contentItem.Status}</td>
        <td>
          <div className="infoCard ">
            <button
              type="button"
              className="btn btn-primary card card-primary card-outline container-fluid "
              data-toggle="modal"
              data-target="#modal-edit"
              id="id123"
            >
              Sửa
            </button>
          </div>
        </td>
        <td><button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modal-Delete"
          >
            Xóa
          </button></td>
      </tr>
    );
  }
}
export default QLTTableContentItemThe;
