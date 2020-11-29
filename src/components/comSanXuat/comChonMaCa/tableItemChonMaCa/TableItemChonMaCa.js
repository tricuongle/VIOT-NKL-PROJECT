import React, { Component } from "react";
import * as Config from "../../../../untils/Config";
import axios from "axios";
import $ from "jquery";
var arrayValueFishCode = [];
var arrayNameFishCode = [];
var Objvalue;
var valueUpdateModel;
class TableItemChonMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentFishCode: [],
      contentModel: [],
      NameFishYes: [],
      arrayFSyes: [],
    };
  }
  // lấy danh sách mã cá (model)  gán vào select
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model",
      data: null,
    })
      .then((resFishCode) => {
        arrayValueFishCode = [];
        var { contentItem } = this.props;
        for (var k in resFishCode.data) {
          var Object = JSON.parse(resFishCode.data[k]);
          arrayValueFishCode.push(Object);
        }
        this.setState({
          contentFishCode: arrayValueFishCode,
        });
        arrayNameFishCode = [];
        var arrtemp = [];
        for (var temp in this.state.contentFishCode) {
          // so sánh tìm khu vực trong công đoạn để xác định mã cá đã thêm
          if (this.state.contentFishCode[temp].ProcessId == contentItem.Id) {
            var obj = this.state.contentFishCode[temp];
            arrtemp.push(obj);
            arrayNameFishCode.push(this.state.contentFishCode[temp].Name); // lấy ds mã cá đã thêm
            this.setState({
              NameFishYes: arrayNameFishCode,
              arrayFSyes: arrtemp,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onGetId = () => {
    var { NameFishYes, arrayFSyes } = this.state;
    var { contentItem } = this.props;
    this.props.onGetId(contentItem.Id, arrayFSyes, contentItem.Name);
  };
  render() {
    var { NameFishYes } = this.state;
    var { contentItem, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{contentItem.Name}</td>
        <td>{NameFishYes + ""}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-delete"
            onClick={this.onGetId}
          >
            Loại bỏ
          </button>
        </td>
      </tr>
    );
  }
}
export default TableItemChonMaCa;
