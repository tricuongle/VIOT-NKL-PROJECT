import React, { Component } from "react";
import * as Config from "../../../untils/Config";
import axios from "axios";
class LogItemQLDinhMuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameModelOld: "",
      nameModelNew: "",
    };
  }
  componentDidMount = () => {
    var { contentItem } = this.props;
    var nameModelOldID = contentItem.ValueOld.ModelId;
    var nameModelNewID = contentItem.ValueNew.ModelId;

    /*------lấy tên mã cá cũ ----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        nameModelOldID,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameModelOld: Object.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên Mã cá !");
      });
    /*------lấy tên mã cá mới ----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        nameModelNewID,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameModelNew: Object.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên mã cá !");
      });
  };

  render() {
    var { contentItem, index } = this.props;
    var { nameModelOld, nameModelNew } = this.state;
    var valueContentNew;
    if (contentItem.ValueNew == "Thông tin đã xóa") {
      valueContentNew = <p className="textLog">Thông tin đã xóa</p>;
    } else {
      valueContentNew = (
        <p>
          <b>Tên mã cá:</b> {nameModelNew} <br />
          <b>Tên định mức giá:</b> {contentItem.ValueNew.Name}
          <br />
          <b>Khối lượng:</b> {contentItem.ValueNew.Weight}
          <br />
          <b>Đơn giá:</b> {contentItem.ValueNew.Price}
        </p>
      );
    }
    var valueContentOld = (
      <p>
        <b>Tên mã cá:</b> {nameModelOld} <br />
        <b>Tên định mức giá:</b> {contentItem.ValueOld.Name}
        <br />
        <b>Khối lượng:</b> {contentItem.ValueOld.Weight}
        <br />
        <b>Đơn giá:</b> {contentItem.ValueOld.Price}
      </p>
    );
    // lấy thời gian của log
    var getTime = contentItem.time;
    const TimeLog = new Date(getTime * 1000);
    var dateFormat = require("dateformat");
    var day = dateFormat(TimeLog, "dd/mm/yyyy");
    var time = dateFormat(TimeLog, "HH:MM:ss");
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.ValueOld.ID}</td>
        <td>
          {day}-{time}
        </td>
        <td>{valueContentNew}</td>
        <td>{valueContentOld}</td>
      </tr>
    );
  }
}
export default LogItemQLDinhMuc;
