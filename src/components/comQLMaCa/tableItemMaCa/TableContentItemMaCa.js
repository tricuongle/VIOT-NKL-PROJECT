import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";

var textName;
var ObjName;
var ObjValue;
var contentItemss;
// biến lấy giá trị model
var textDateModel;
var ObjModelValue;
class TableContentItemMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItemNamePro: [],
      nameProcess: [],
    };
  }
  componentDidMount() {
    var { contentItem } = this.props;
    // lấy giá trị thời gian của công đoạn
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.API_URL}` +
        "&Classify=Process&key=" +
        contentItem.ProcessId,
      data: null,
    })
      .then((resModel) => {})
      .catch((err) => {
        console.log(err);
        console.log("Không lấy công đoạn !");
      });
    //----------------------- lấy giá trị name  theo id cửa khu vực ------------------
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process&key=" +
        contentItem.ProcessId +
        "",
      data: null,
    })
      .then((resProcess) => {
        ObjValue = JSON.parse(resProcess.data);
        textName = ObjValue.Name;
        this.setState({
          nameProcess: textName,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  }
  onUpdate = () => {
    this.props.onUpdate(this.props.contentItem, this.state.nameProcess);
  };
  render() {
    var { contentItem, index } = this.props;
    var { nameProcess } = this.state;
    if (contentItem.CreateDate != "" ) {
      var time = contentItem.CreateDate + "";
      var timeEdit = time.substring(0, 10);
      var timeEditInt = parseInt(timeEdit);
      var dateFormat = require("dateformat");
      if (timeEditInt != '') {
        const unixTimeOut = timeEditInt;
        const dateOut = new Date(unixTimeOut * 1000);
        var dateNewOut = dateFormat(dateOut, "dd-mm-yyyy");
        var dateNewTimeOut = dateFormat(dateOut, "HH:MM:ss");
      }
    }
    var Group, Classify;
    if(contentItem.Group == ''){
      Group ="__";
    }else{Group=contentItem.Group}
    if(contentItem.Classify == ''){
      Classify ="__";
    }else{Classify=contentItem.Classify}

    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{dateNewOut}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.WeightInMin}</td>
        <td>{contentItem.WeighInMax}</td>
        <td>{contentItem.WeightOutMin}</td>
        <td>{contentItem.WeighOutMax}</td>
        <td>{nameProcess}</td>
        <td>{Group}</td>
        <td>{Classify}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
            onClick={this.onUpdate}
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
            onClick={this.onUpdate}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TableContentItemMaCa;
