import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";
class TableItemTongHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueEmployee: "",
      valueProcess: "",
      valueDevice: "",
      valueCard: "",
      valueModel: "",
    };
  }

  componentDidMount = () => {
    var { contentItem } = this.props;
    /*---------------lấy thông tin nhân viên theo ID-------------------- */
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
          valueEmployee: ObjValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*---------------lấy thông tin công đoạn theo Id--------------------- */
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
          valueProcess: ObjValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*---------------lấy thông tin mã cá theo Id--------------------- */
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
          valueModel: ObjValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*---------------lấy thông tin công nhân theo Id--------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Card&key=" +
        contentItem.CardId,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          valueCard: ObjValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*---------------lấy thông tin thiết bị theo Id--------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` + "/api/iotdevice/all?token=" + `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        var ObjValue = res.data;
        for (var k in ObjValue) {
          if(contentItem.DeviceId == ObjValue[k].Id)
          this.setState({
            valueDevice: ObjValue[k],
          });
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var { contentItem } = this.props;
    var {
      valueEmployee,
      valueProcess,
      valueModel,
      valueCard,
      valueDevice,
    } = this.state;
    var dateFormat = require("dateformat");
    console.log(valueCard);
    console.log(valueModel);
    console.log(valueDevice);
    const unixTime = contentItem.ReadTime;
    const date = new Date(unixTime * 1000);
    var dateNew = dateFormat(date, "dd-mm-yyyy");
    var img = `${Config.API_URL}` + "/api/images/" + contentItem.Image + ".jpg";
    return (
      <tr>
        <td>{contentItem.Image}</td>
        <td>{dateNew}</td>
        <td>{valueEmployee.Name}</td>
        <td>{valueEmployee.CMND}</td>
        <td>{valueCard.Id}</td>
        <td>{valueCard.RFID}</td>
        <td>{valueCard.Color}</td>
        <td>{valueModel.Name}</td>
        <td>{valueCard.Classify}</td>
        <td>{contentItem.Weight}</td>
        <td>{valueDevice.SectionId}</td>
        <td>{valueProcess.Name}</td>
        <td>{valueDevice.Name}</td>
        <td>
          <a href={img} target="_blank">
            Xem
          </a>
        </td>
      </tr>
    );
  }
}
export default TableItemTongHop;
