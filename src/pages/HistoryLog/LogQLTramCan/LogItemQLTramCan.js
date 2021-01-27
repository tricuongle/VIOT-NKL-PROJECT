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

      nameSectionOld: [],
      nameSectionNew: [],
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

  componentDidMount = () => {
    var { contentItem } = this.props;
    //---------------- láy tên process khu vực và type loại trong para Old---------------------
    var stringParaOld = contentItem.ValueOld.Status.Para;
    var arrTypeOld = [];
    if (stringParaOld != "") {
      var ObjectParaOld = JSON.parse(stringParaOld);
      var arrayNameOld = [];
      for (var k = 0; k < ObjectParaOld.length; k++) {
        axios({
          method: "GET",
          url:
            `${Config.API_URL}` +
            "/api/data/valuekey?token=" +
            `${Config.TOKEN}` +
            "&Classify=Process&key=" +
            ObjectParaOld[k].ProcessId +
            "",
          data: null,
        })
          .then((resProcess) => {
            var ObjValueOld = JSON.parse(resProcess.data);
            var nameProcess = ObjValueOld.Name;
            arrayNameOld.push(nameProcess);

            var setArray = Array.from(new Set(arrayNameOld)); // gợp các phần tử giống nhau trong arr

            this.setState({
              nameItemModelGetIdOld: setArray,
              nameItemTypeGetIdOld: arrTypeOld,
            });
            console.log(this.state.nameItemModelGetIdOld);
            console.log(this.state.nameItemTypeGetIdOld);
          })
          .catch((err) => {
            console.log(err);
          });
        // lấy type
        arrTypeOld.push(ObjectParaOld[k].Type);
        this.setState({
          nameItemTypeGetIdOld: arrTypeOld,
        });
      }
    }

    //---------------- láy tên process khu vực và type loại trong para New---------------------
    var stringParaNew = contentItem.ValueNew.Status.Para;
    var arrTypeNew = [];
    if (stringParaNew != "") {
      var ObjectParaNew = JSON.parse(stringParaNew);
      var arrayNameNew = [];
      for (var k = 0; k < ObjectParaNew.length; k++) {
        axios({
          method: "GET",
          url:
            `${Config.API_URL}` +
            "/api/data/valuekey?token=" +
            `${Config.TOKEN}` +
            "&Classify=Process&key=" +
            ObjectParaNew[k].ProcessId +
            "",
          data: null,
        })
          .then((resProcess) => {
            var ObjValueNew = JSON.parse(resProcess.data);
            var nameProcess = ObjValueNew.Name;
            arrayNameNew.push(nameProcess);

            var setArray = Array.from(new Set(arrayNameNew)); // gợp các phần tử giống nhau trong arr

            this.setState({
              nameItemModelGetIdNew: setArray,
              nameItemTypeGetIdNew: arrTypeNew,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // lấy type
        arrTypeNew.push(ObjectParaNew[k].Type);
        this.setState({
          nameItemTypeGetIdNew: arrTypeNew,
        });
      }
    }

    //-----------------Lấy thông tin section khu vực Old-----------------------------
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/Section?id=" +
        contentItem.ValueOld.SectionId +
        "&token=" +
        `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        var ObjvalueSection = res.data;
        this.setState({
          nameSectionOld: ObjvalueSection.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi lấy thông tin khu vực theo id- sections");
      });
    //-----------------Lấy thông tin section khu vực New-----------------------------
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/Section?id=" +
        contentItem.ValueNew.SectionId +
        "&token=" +
        `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        var ObjvalueSection = res.data;
        this.setState({
          nameSectionNew: ObjvalueSection.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi lấy thông tin khu vực theo id- sections");
      });
  };
  render() {
    var { contentItem, index } = this.props;
    var {
      nameItemModelGetIdOld,
      nameItemTypeGetIdOld,

      nameItemModelGetIdNew,
      nameItemTypeGetIdNew,

      nameSectionOld,
      nameSectionNew,
    } = this.state;
    var valueContentNew = (
      <p>
        <b>Tên:</b>  {contentItem.ValueNew.Name} <br />
        <b>Type:</b>  {nameItemTypeGetIdNew + " "}
        <br />
        <b>Công đoạn:</b>  {nameItemModelGetIdNew + " "}
        <br />
        <b>Khu vực:</b>  {nameSectionNew}
      </p>
    );
    var valueContentOld = (
      <p>
        <b>Tên:</b>  {contentItem.ValueOld.Name} <br />
        <b>Type:</b>  {nameItemTypeGetIdOld + " "}
        <br />
        <b>Công đoạn:</b>  {nameItemModelGetIdOld + " "}
        <br />
        <b>Khu vực:</b>  {nameSectionOld}
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
