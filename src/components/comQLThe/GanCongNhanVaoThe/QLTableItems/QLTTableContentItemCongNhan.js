import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../../untils/Config";
var arrayValueModel = [];
class QLTTableContentItemCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdNewCard: "",
      idProcess: "",
      contentModel: [],
    };
  }
  componentDidMount = () => {
    /*------------Lấy Newcard ---------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=NewCard",
      data: null,
    })
      .then((res) => {
        var valueObject = JSON.parse(res.data[0]);
        this.setState({
          IdNewCard: valueObject,
        });
      })

      .catch((err) => {
        console.log(err);
      });
    /*-------lấy danh sách công đoạn mã cá------------ */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model",
      data: null,
    })
      .then((resModel) => {
        arrayValueModel = [];
        for (var k in resModel.data) {
          var Object = JSON.parse(resModel.data[k]);
          arrayValueModel.push(Object);
        }
        console.log(arrayValueModel);
        this.setState({
          contentModel: arrayValueModel,
        });
        console.log(this.state.contentModel);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  onAddCard = () => {
    var { contentModel, IdNewCard, idProcess } = this.state;
    var { contentItem } = this.props;
    var Color = document.getElementById("idColorCardSelect").value;
    var idModel = document.getElementById("idModelSelect").value;
    /*-------------- lấy id khu vực từ Model----------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        idModel,
      data: null,
    })
      .then((resModel) => {
        var temp = JSON.parse(resModel.data);
        this.setState({
          idProcess: temp
        })
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(IdNewCard.Id); // id newCard
    console.log(contentItem.Id); // id công nhân
    console.log(Color); // id màu
    console.log(idModel); // id công đoạn
    console.log(idProcess); // id khu vực

    /*----------Put = thêm thẻ-------tạo thẻ mới----------------- */
    /*axios({
      method: "GET",
      url:
      `${Config.API_URL}`+'/api/data?token='+`${Config.TOKEN}`,
      data: {
        "Key": "Card-01",
        "Classify": "Card",
        "Value": "{\"Id\":\"Card-01\",\"Employee\":\""+contentItem.Id+"\",\"Color\":\""+Color+"\",\"RegistTime\":,\"Status\":\"Release\",\"ProcessId\":\"Zone-NKL-01\",\"ModelId\":\""+idModel+"\",\"Classify\":\"\",\"RFID\":\""+IdNewCard+"\",\"CurrentRecode\":\"\"}",
        "Description": ""
      },
    })
      .then((res) => {
       
      })
      .catch((err) => {
        console.log(err);
      });*/
  };
  render() {
    var { contentModel, IdNewCard } = this.state;
    var { contentItem } = this.props;
    const dataDay = parseInt(contentItem.BirthDay);
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>{IdNewCard.Id}</td>
        <td>{contentItem.Name}</td>
        <td>
          <select className="form-control" id="idColorCardSelect">
            <option value="Trắng">Trắng</option>
            <option value="Xanh">Xanh</option>
            <option value="Đỏ">Đỏ</option>
            <option value="Vàng">Vàng</option>
            <option value="Đen">Đen</option>
          </select>
        </td>
        <td>
          <select className="form-control" id="idModelSelect">
            {this.showContentSelectModel(contentModel)}
          </select>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
            onClick={this.onAddCard}
          >
            Thêm thẻ
          </button>
        </td>
      </tr>
    );
  }
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
}
export default QLTTableContentItemCongNhan;
