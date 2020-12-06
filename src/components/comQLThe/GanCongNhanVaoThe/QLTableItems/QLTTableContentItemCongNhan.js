import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../../untils/Config";
var arrayValueModel = [];
var idModel;
var count;
class QLTTableContentItemCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdNewCard: [],
      idProcess: "",
      contentModel: [],
      IdCountCard: "",
      arrayValueModel: [],
      contentTypeSelect: [],
    };
  }
  /*-------------------lấy classify từ mã cá dựa vào id công đoạn------------------------- */
  getValueTypeInModel = (idProcess) => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model",
      data: null,
    })
      .then((res) => {
        var arrayValueModel = [];
        var valueModel = res.data;
        for (var k in valueModel) {
          var valueObj = JSON.parse(valueModel[k]);
          if (idProcess === valueObj.ProcessId) {
            arrayValueModel.push(JSON.parse(valueModel[k]));
          }
        }
        this.setState({
          contentTypeSelect: arrayValueModel,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    /*-------lấy danh sách công đoạn để đổ vào select------------ */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process",
      data: null,
    })
      .then((resModel) => {
        arrayValueModel = [];
        for (var k in resModel.data) {
          var Object = JSON.parse(resModel.data[k]);
          if (Object.status == true) {
            arrayValueModel.push(Object);
          }
        }
        this.setState({
          contentModel: arrayValueModel,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Vui lòng chọn công đoạn (mã cá)");
      });
  };
  /*---------------truyền data từ tìm kiếm nhân viên ra ngoài ----------------------- */
  OnGetValueColorProcessType = () => {
    var { contentItem } = this.props;
    var nameColorCard = document.getElementById("idColorCardSelect").value;
    var idProcess = document.getElementById("idModelSelect").value;
    var nameType = document.getElementById("idTypeSelect").value;

    /*hiện ẩn thông tin khi gõ hoặc không gõ trường group */
    var getValueTypeInModel = document.getElementById("idModelSelect").value;

    //truyền id của mã cá trong select để lấy loại (classify)
    this.getValueTypeInModel(getValueTypeInModel);

    if (getValueTypeInModel != "") {
      document.getElementById("idTypeSelect").disabled = false;
    } else {
      document.getElementById("idTypeSelect").value = "";
      document.getElementById("idTypeSelect").disabled = true;
    }
    // truyền 4 giá trị ra ngoài hàm cha để tạo thẻ
    this.props.OnGetValueColorProcessType(
      contentItem.Id,
      contentItem.IsLock,
      nameColorCard,
      idProcess,
      nameType
    );
  };

  render() {
    var { contentModel, contentTypeSelect } = this.state;
    var { contentItem } = this.props;
    var status = contentItem.IsLock ? "đang làm việc" : "đã nghỉ";
    //const dataDay = parseInt(contentItem.BirthDay);
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.CMND}</td>
        <td>{status}</td>
        <td>
          <select
            className="form-control"
            id="idColorCardSelect"
            required
            onChange={this.OnGetValueColorProcessType}
          >
            <option  value="-">---Chọn màu---</option>
            <option value="Trắng">Trắng</option>
            <option value="Xanh">Xanh</option>
            <option value="Đỏ">Đỏ</option>
            <option value="Vàng">Vàng</option>
            <option value="Đen">Đen</option>
          </select>
        </td>
        <td>
          <select
            className="form-control"
            id="idModelSelect"
            name="nameProcessSelect"
            required
            onChange={this.OnGetValueColorProcessType}
          >
            <option value="">---Chọn công đoạn---</option>
            {this.showContentSelectModel(contentModel)}
          </select>
        </td>
        <td>
          <select
            className="form-control"
            id="idTypeSelect"
            name="nameProcessType"
            disabled
            onChange={this.OnGetValueColorProcessType}
          >
            <option value="-">---Chọn type---</option>
            {this.showContentSelectType(contentTypeSelect)}
          </select>
        </td>
      </tr>
    );
  }
  // hàm đổ dữ liệu vào select chọn khu vực
  showContentSelectModel(contentModel) {
    var result = null;
    if (contentModel.length >= 0) {
      result = contentModel.map((contentItem, index) => {
        return (
          <option key={index} value={contentItem.Id}>
            {contentItem.Name}
          </option>
        );
      });
    }
    return result;
  }
  // hàm đổ dữ liệu vào select chọn Type
  showContentSelectType(contentModel) {
    var result = null;
    if (contentModel.length >= 0) {
      result = contentModel.map((contentItem, index) => {
        return (
          <option key={index} value={contentItem.Classify}>
            {contentItem.Classify}
          </option>
        );
      });
    }
    return result;
  }
}
export default QLTTableContentItemCongNhan;
