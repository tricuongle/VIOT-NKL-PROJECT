import React, { Component } from "react";
class TableItemTongHop extends Component {
  render() {
    return (
      <tr>
        <td>1</td>
        <td>Fillet</td>
        <td>Đầu vào</td>
        <td>Cân 1</td>
        <td>
          <div>
            <select
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
        <td>1645</td>
      </tr>
    );
  }
}
export default TableItemTongHop;
