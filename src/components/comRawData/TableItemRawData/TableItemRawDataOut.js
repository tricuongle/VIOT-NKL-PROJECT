import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";
class TableItemRawDataOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idEmployee: "",
      idProcess: "",
      idDevice: "",
      idCard: "",
      idModel: "",
    };
  }

  componentDidMount = () => {
    var { contentItem } = this.props;
    /*---------------lấy tên nhân viên theo tên--------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee&key=" +
        contentItem.EmployeeId,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          idEmployee: ObjValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*---------------lấy tên khu vực theo tên--------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process&key=" +
        contentItem.ProcessId,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          idProcess: ObjValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*---------------lấy tên Công đoạn mã cá theo tên--------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        contentItem.Model,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          idModel: ObjValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var { contentItem } = this.props;
    var { idEmployee, idProcess, idModel } = this.state;
    const unixTime = contentItem.ReadTime;
    const date = new Date(unixTime * 1000);
    var dateFormat = require("dateformat"); 
    var dateNew = dateFormat(date, "dd-mm-yyyy");
    var dateNewTime = dateFormat(date, "HH:MM");
    var img = `${Config.API_URL}` + "/api/images/" + contentItem.Image + ".jpg";
    return (
      <tr>
        <td>{dateNew}</td>
        <td>{dateNewTime}</td>
        <td>{idEmployee.Name}</td>
        <td>{contentItem.CardId}</td>
        <td>{idModel.Name}</td>
        <td>{contentItem.Type}</td>
        <td>{contentItem.Weight}</td>
        <td>{idProcess.Name}</td>
        <td>{contentItem.DeviceId}</td>
        <td>
          <a href={img} target="_blank">
            Xem
          </a>
        </td>
      </tr>
    );
  }
}
export default TableItemRawDataOut;