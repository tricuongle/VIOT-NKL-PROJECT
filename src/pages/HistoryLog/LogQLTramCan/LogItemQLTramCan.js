import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";

var nameSectionOld;
var nameSectionNew;

class LogItemQLTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameItemModelGetIdOld: [],
      nameItemTypeGetIdOld: [],

      nameItemModelGetIdNew: [],
      nameItemTypeGetIdNew: [],

      valueSectionOld: [],
      valueSectionNew: [],
    };
  }
  //-----------------Lấy thông tin section khu vực-----------------------------
  getNameSectionOld = (idSectionLog) => {
    var ObjvalueSection = {};
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/Section?id=" +
        idSectionLog +
        "&token=" +
        `${Config.TOKEN}`,
      data: null,
    }).then((res) => {
      ObjvalueSection = res.data;
      this.setState({
        valueSectionOld: ObjvalueSection,
      });
    });
    return this.state.valueSectionOld.Name;
  };
  getNameSectionNew = (idSectionLog) => {
    var ObjvalueSection = {};
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/Section?id=" +
        idSectionLog +
        "&token=" +
        `${Config.TOKEN}`,
      data: null,
    }).then((res) => {
      ObjvalueSection = res.data;
      this.setState({
        valueSectionNew: ObjvalueSection,
      });
    });
    return this.state.valueSectionNew.Name;
  };
  //---------------- láy tên process khu vực và type loại trong para---------------------
  getNameProcessTypeOld = () => {
    var { contentItem } = this.props;
    var stringPara = contentItem.ValueOld.Status.Para;
    var arrType = [];
    if (stringPara != "") {
      var ObjectPara = JSON.parse(stringPara);
      var arrayName = [];
      for (var k = 0; k < ObjectPara.length; k++) {
        axios({
          method: "GET",
          url:
            `${Config.API_URL}` +
            "/api/data/valuekey?token=" +
            `${Config.TOKEN}` +
            "&Classify=Process&key=" +
            ObjectPara[k].ProcessId +
            "",
          data: null,
        })
          .then((resProcess) => {
            var ObjValue = JSON.parse(resProcess.data);
            var nameProcess = ObjValue.Name;
            arrayName.push(nameProcess);

            var setArray = Array.from(new Set(arrayName)); // gợp các phần tử giống nhau trong arr

            this.setState({
              nameItemModelGetIdOld: setArray,
              nameItemTypeGetIdOld: arrType,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // lấy type
        arrType.push(ObjectPara[k].Type);
        this.setState({
          nameItemTypeGetIdOld: arrType,
        });
      }
    } else {
      this.setState({
        nameItemModelGetIdOld: "-",
        nameItemTypeGetIdOld: "-",
      });
    }
    return this.state.nameItemModelGetIdOld + this.state.nameItemTypeGetIdOld;
  };
  render() {
    var { contentItem, index } = this.props;
    var { nameItemTypeGetIdOld, nameItemModelGetIdOld } = this.state;
    var valueContentNew = (
      <p>
        Tên: {contentItem.ValueNew.Name} <br />
        Type: {}
        <br />
        Công đoạn: {}
        <br />
        Khu vực: {}
      </p>
    );
    var valueContentOld = (
      <p>
        Tên: {contentItem.ValueOld.Name} <br />
        Type: {}
        <br />
        Công đoạn: {}
        <br />
        Khu vực: {}
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
        <td>{contentItem.ValueNew.Id}</td>
        <td>
          {day}-{time}
        </td>
        <td>{valueContentNew}</td>
        <td>{valueContentOld}</td>
      </tr>
    );
  }
}
export default LogItemQLTramCan;
