import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";
var textName;
var ObjName;
var ObjValue;
var contentItemss;
class TableContentItemTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItemModelGetId: [],
      nameItemModelGetId: [],
      nameItemTypeGetId: [],
      valueSection: [],
    };
  }
  /*----------------------get ID of table process to call name process ----------------------------- */
  componentDidMount = () => {
    var { contentItem } = this.props;
    var stringPara = contentItem.Status.Para;
    var arrType = [];
    if (stringPara != "") {
      var ObjectPara = JSON.parse(stringPara);
      /*var textString = contentItem.Status.ProcessId + "";
      var arrayIdProcess = textString.split(","); // tách chuỗi từ Process ID*/
      var arrayName = [];
      for (var k = 0; k < ObjectPara.length; k++) {
        // láy tên process theo id trong Para
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
            ObjValue = JSON.parse(resProcess.data);
            var nameProcess = ObjValue.Name;
            arrayName.push(nameProcess);

            var setArray = Array.from(new Set(arrayName)); // gợp các phần tử giống nhau trong arr

            this.setState({
              nameItemModelGetId: setArray,
              nameItemTypeGetId: arrType,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // lấy type
        arrType.push(ObjectPara[k].Type);
        this.setState({
          nameItemTypeGetId: arrType,
        });
      }
    }
    /*-----------------Lấy thông tin section và đổ vào select----------------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/Section?id=" +
        contentItem.SectionId +
        "&token=" +
        `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        var ObjvalueSection = res.data;
        this.setState({
          valueSection: ObjvalueSection,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi lấy thông tin khu vực theo id- sections");
      });
  };

  onGetIdEdit = () => {
    this.props.onGetIdEdit(this.props.contentItem.Id);
  };

  render() {
    var { contentItem, index } = this.props;

    var {
      contentItemModelGetId,
      nameItemModelGetId,
      valueSection,
      nameItemTypeGetId,
    } = this.state;
    var nameSection;
    if (valueSection == null) {
      nameSection = "__";
    } else {
      nameSection = valueSection.Name;
    }

    var nameTypeDevice, nameModelDevice;
    if (nameItemTypeGetId == "") {
      nameTypeDevice = "__";
    } else {
      nameTypeDevice = nameItemTypeGetId;
    }
    if (nameItemModelGetId == "") {
      nameModelDevice = "__";
    } else {
      nameModelDevice = nameItemModelGetId;
    }

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{contentItem.Name}</td>
        <td>{nameTypeDevice + " "}</td>
        <td>{nameModelDevice + " "}</td>
        <td>{nameSection}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
            onClick={this.onGetIdEdit}
          >
            Chỉnh sửa
          </button>
        </td>
      </tr>
    );
  }
}
export default TableContentItemTramCan;
