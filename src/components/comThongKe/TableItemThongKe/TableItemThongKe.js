import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";
class TableItemTongHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueEmployee: [],
      valueDevice: [],
      valueCard: [],
      valueDeviceRecordIn: [],
      valueRecordIn: [],
    };
  }
  componentDidMount = () => {
    var { contentItem } = this.props;
    if (contentItem.RecordIn != "" && contentItem.RecordIn != undefined) {
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
    } else {
      console.log("Không tồn tại Record In !!!");
    }

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

    /*---------------lấy thông tin thẻ RFID theo Id--------------------- */
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
      valueCard,
      valueDeviceRecordIn,
      valueRecordIn,
    } = this.state;
    var { contentItem, index } = this.props;
    var dateFormat = require("dateformat");
    if (valueRecordIn.ReadTime != undefined && valueRecordIn.ReadTime != "") {
      const unixTimeIn = valueRecordIn.ReadTime;
      const dateIn = new Date(unixTimeIn * 1000);
      var dateNewIn = dateFormat(dateIn, "dd/mm/yyyy");
      var dateNewTimeIn = dateFormat(dateIn, "HH:MM:ss");

      // ảnh Record In
      var imgIn =
        `${Config.API_URL}` + "/api/images/" + valueRecordIn.Image + ".jpg";

      /*Tính định mức */
      var WeightIn = parseFloat(valueRecordIn.Weight);
      var WeightOut = parseFloat(contentItem.Weight);
      var DinhMuc = parseFloat(WeightIn / WeightOut).toFixed(2);
    } else {
      valueDeviceRecordIn.Name = "-";
      valueRecordIn.Weight = "-";
      dateNewTimeIn = "-";
    }

    /*----------thời gian record Out ------------------*/
    const unixTimeOut = contentItem.ReadTime;
    const dateOut = new Date(unixTimeOut * 1000);
    var dateNewOut = dateFormat(dateOut, "dd/mm/yyyy");
    var dateNewTimeOut = dateFormat(dateOut, "HH:MM:ss");
    /*hình ảnh */
    var imgOut =
      `${Config.API_URL}` + "/api/images/" + contentItem.Image + ".jpg";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{dateNewOut}</td>
        <td>{contentItem.EmployeeName}</td>
        <td>{valueEmployee.CardNo}</td>
        <td>{contentItem.CardId}</td>
        <td>{valueCard.Color}</td>
        <td>{contentItem.ModelName}</td>
        <td>{contentItem.Classify}</td>
        <td>{contentItem.ProcessName}</td>
        <td>{valueDeviceRecordIn.Name}</td>
        <td>{contentItem.DeviceName}</td>
        <td>{valueRecordIn.Weight}</td>
        <td>{contentItem.Weight}</td>
        <td>{dateNewTimeIn}</td>
        <td>{dateNewTimeOut}</td>
        <td>{DinhMuc} </td>
        <td>---</td> {/*valueDevice.SectionId*/}
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
