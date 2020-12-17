import React, { Component } from "react";
import * as Config from "../../../untils/Config";
import $, { event } from "jquery";
import axios from "axios";
var arrayRecode = [];
var check = 0;
class TableItemTongHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecodeIn: [],
      RecodeInKG: "",
      nameProcess: "",
      idProcess: "",
      idModel: "",
    };
  }
  componentDidMount = () => {
    var { contentItem } = this.props;
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
    /*---------------lấy tên mã cá theo id--------------------- */
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
    /*----------Lấy khối lượng ở RecodeIn-------------- */
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
        var temp = JSON.parse(res.data);
        this.setState({
          RecodeInKG: temp.Weight,
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  //-------------reduce -----------------
  getReduce = (idProcess) => {
    
  };

  render() {
    var { contentItem, index } = this.props;
    //var { RecodeInKG, idProcess, idModel } = this.state;
   /* var dateFormat = require("dateformat");
    if (contentItem.ReadTime != undefined) {
      const unixTimeOut = contentItem.ReadTime;
      const dateOut = new Date(unixTimeOut * 1000);
      var dateNewOut = dateFormat(dateOut, "dd-mm-yyyy");
      var dateNewTimeOut = dateFormat(dateOut, "HH:MM:ss");
    }*/
    console.log(contentItem.Weight);
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.ModelName}</td>
        <td>{contentItem.ProcessName}</td>
        <td>--- </td>
        <td>{contentItem.Weight.toFixed(2)} </td>
      </tr>
    );
  }
} 
export default TableItemTongHop;
