import React, { Component } from "react";
import * as Config from "../../../untils/Config";
import $, { event } from "jquery";
import axios from "axios";
var arrayRecode = [];
var check = 0;
class TableItemTongHop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { contentItem, index } = this.props;
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.ModelName}</td>
        <td>{contentItem.ProcessName}</td>
        <td>{contentItem.WeightIn.toFixed(2)} </td>
        <td>{contentItem.WeightOut.toFixed(2)} </td>
      </tr>
    );
  }
}
export default TableItemTongHop;
