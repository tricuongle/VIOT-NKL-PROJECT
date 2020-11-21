import React, { Component } from "react";

class TableItemChonMaCa extends Component {
  render() {
    return (
      <tr>
        <td>1</td>
        <td>Fillett</td>
        <td>
          <div>
            <select
              name=""
              id="input"
              className="form-control"
              required="required"
            >
              <option value="0">Chọn mã cá</option>
              <option value="1">EX1</option>
              <option value="2">EX2</option>
              <option value="3">EX3</option>
              <option value="4">EX4</option>
              <option value="5">EX5</option>
              <option value="6">EX6</option>
            </select>
          </div>
        </td>
        <td>
          <button type="button" className="btn btn-success">
            Chọn
          </button>
        </td>
        <td>Fillet</td>
      </tr>
    );
  }
}
export default TableItemChonMaCa;
