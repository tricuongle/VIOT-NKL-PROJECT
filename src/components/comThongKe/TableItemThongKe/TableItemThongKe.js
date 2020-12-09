import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";
var ObjectRecordIn = {};
class TableItemTongHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueEmployee: "",
      valueProcess: "",
      valueDevice: "",
      valueCard: "",
      valueModel: "",
      valueRecordIn: {},
      valueDeviceRecordIn: "",
    };
  }
  componentDidMount = () => {
    var { contentItem } = this.props;
    /*---------------lấy thông tin record-In theo ID-------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Record-In&key=" +
        contentItem.RecordIn,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          valueRecordIn: ObjValue,
        });
        /*Lấy thông tin thiết bị cân theo id cân trong record out. */
        axios({
          method: "GET",
          url:
            `${Config.API_URL}` +
            "/api/iotdevice/all?token=" +
            `${Config.TOKEN}`,
          data: null,
        })
          .then((res) => {
            var ObjValue = res.data;
            for (var k in ObjValue) {
              if (this.state.valueRecordIn.DeviceId == ObjValue[k].Id)
                this.setState({
                  valueDeviceRecordIn: ObjValue[k],
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        //-------------------------
      })
      .catch((err) => {
        console.log(err);
      });
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
    /*---------------lấy thông tin thiết bị theo Out theo Id--------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` + "/api/iotdevice/all?token=" + `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        var ObjValue = res.data;
        for (var k in ObjValue) {
          if (contentItem.DeviceId == ObjValue[k].Id)
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
    var {
      valueEmployee,
      valueProcess,
      valueModel,
      valueCard,
      valueDevice,
      valueDeviceRecordIn,
      valueRecordIn,
    } = this.state;
    var { contentItem, index } = this.props;
    var dateFormat = require("dateformat");
    if (valueRecordIn.ReadTime != undefined) {
      const unixTimeIn = valueRecordIn.ReadTime;
      const dateIn = new Date(unixTimeIn * 1000);
      var dateNewIn = dateFormat(dateIn, "dd-mm-yyyy");
      var dateNewTimeIn = dateFormat(dateIn, "HH:MM:ss");
    }
    /*----------thời gian record Out ------------------*/
    /**/

    /*----------thời gian record Out ------------------*/
    const unixTimeOut = contentItem.ReadTime;
    const dateOut = new Date(unixTimeOut * 1000);
    var dateNewOut = dateFormat(dateOut, "dd-mm-yyyy");
    var dateNewTimeOut = dateFormat(dateOut, "HH:MM:ss");

    /*hình ảnh */
    var imgIn =
      `${Config.API_URL}` + "/api/images/" + valueRecordIn.Image + ".jpg";
    var imgOut =
      `${Config.API_URL}` + "/api/images/" + contentItem.Image + ".jpg";

    /*Tính định mức */
    var WeightIn = parseFloat(valueRecordIn.Weight);
    var WeightOut = parseFloat(contentItem.Weight);
    var DinhMuc = parseFloat(WeightIn / WeightOut).toFixed(2);
    return (
      <tr>
        <td>{index +1}</td>
        <td>{dateNewOut}</td>
        <td>{valueEmployee.Name}</td>
        <td>{valueEmployee.CardNo}</td>
        <td>{valueCard.RFID}</td>
        <td>{valueCard.Color}</td>
        <td>{valueModel.Name}</td>
        <td>{valueCard.Classify}</td>
        <td>{valueProcess.Name}</td>
        <td>{valueDeviceRecordIn.Name}</td>
        <td>{valueDevice.Name}</td>
        <td>{valueRecordIn.Weight}</td>
        <td>{contentItem.Weight}</td>
        <td>{dateNewTimeIn}</td>
        <td>{dateNewTimeOut}</td>
        <td>{DinhMuc} </td>
        <td>{valueDevice.SectionId}</td>

        <td>
          <a href={imgIn} target="_blank">
            vào-
          </a>
          <a href={imgOut} target="_blank">
            Ra
          </a>
        </td>
      </tr>
    );
  }
}
export default TableItemTongHop;
