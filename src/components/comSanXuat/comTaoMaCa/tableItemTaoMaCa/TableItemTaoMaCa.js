import React, { Component } from "react";

class TableItemTaoMaCa extends Component {
  render() {
    return (
      <tr>
        <td>1</td>
        <td>001</td>
        <td>Cá nga</td>
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
