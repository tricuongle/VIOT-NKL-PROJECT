import React, { Component } from "react";

class TableItemTaoMaCa extends Component {
  render() {
    var { contentItem, index } = this.props;
    return (
      <tr>
        <td>{index+1}</td>
        <td>{contentItem.ID}</td>
        <td>{contentItem.Name}</td>
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
export default TableItemTaoMaCa;
