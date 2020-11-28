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
      IdNewCard: "",
      idProcess: "",
      contentModel: [],
      IdCountCard:'',
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

      /*-------------tạo id card ----------------- */
      axios({
        method: "GET",
        url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}` +"&Classify=Card",
        data: null,
      })
        .then((res) => {
          count = res.data.length + 1;
          var countString = "Card-0" + count;
          this.setState({
            IdCountCard: countString,
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
          /*if (Object.status) {*/
            arrayValueModel.push(Object);
          /*}*/
        }
        console.log(arrayValueModel);
        this.setState({
          contentModel: arrayValueModel,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getIdProcess=(temp)=>{
 /*-------------- lấy id khu vực từ Model----------------- */
 axios({
  method: "GET",
  url:
    `${Config.API_URL}` +
    "/api/data/valuekey?token=" +
    `${Config.TOKEN}` +
    "&Classify=Model&key=" +
    temp,
  data: null,
})
  .then((resModel) => {
    var tam = JSON.parse(resModel.data)
    var tam1= tam.ProcessId;
    this.setState({
      idProcess: tam1
    })
  })
  .catch((err) => {
    console.log(err);
  });
  }

  onAddCard = () => {
    var { contentModel, IdNewCard,IdCountCard,idModel ,idProcess} = this.state;
    var { contentItem } = this.props;
    var Color = document.getElementById("idColorCardSelect").value;
    var idModel = document.getElementById("idModelSelect").value;
   this.getIdProcess(idModel);
   
    console.log(IdCountCard); // id card
    console.log(IdNewCard.Id); // id newCard
    console.log(contentItem.Id); // id công nhân
    console.log(Color); // id màu
    console.log(idModel); // id công đoạn
    console.log(idProcess); // id công đoạn

   
  

    /*----------Put = thêm thẻ-------tạo thẻ mới----------------- */
    /*axios({
      method: "GET",
      url:
      `${Config.API_URL}`+'/api/data?token='+`${Config.TOKEN}`,
      data: {
        "Key": IdCountCard,
        "Classify": "Card",
        "Value": "{\"Id\":\""+IdCountCard+"\",\"Employee\":\""+contentItem.Id+"\",\"Color\":\""+Color+"\",\"RegistTime\":,\"Status\":\"Release\",\"ProcessId\":\"Zone-NKL-01\",\"ModelId\":\""+idModel+"\",\"Classify\":\"\",\"RFID\":\""+IdNewCard+"\",\"CurrentRecode\":\"\"}",
        "Description": "Card Ngọc Kim Loan"
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
          <option value="" >---Chọn mã cá---</option>
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
