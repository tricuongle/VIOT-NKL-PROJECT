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
      url:
        `${Config.API_URL}` +
        "/api/data?token=" +
        `${Config.TOKEN}` +
        "&Classify=Card",
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
          arrayValueModel.push(Object);
        }
        console.log(arrayValueModel);
        this.setState({
          contentModel: arrayValueModel,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Vui lòng chọn công đoạn (mã cá)");
      });
  };

  getIdProcess = (temp) => {
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
        var tam = JSON.parse(resModel.data);
        var tam1 = tam.ProcessId;
        this.setState({
          idProcess: tam1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*-------------Hàm thêm thẻ vào công nhân------------- */
  onAddCard = (event) => {
    event.preventDefault();
    var {
      contentModel,
      IdNewCard,
      IdCountCard,
      idModel,
      idProcess,
    } = this.state;
    var { contentItem } = this.props;
    var Color = document.getElementById("idColorCardSelect").value;
    var idModel = document.getElementById("idModelSelect").value;
    // bắt lỗi hết thẻ
    if (IdNewCard == 0 ) {
      alert("Dữ liệu thẻ đã hết, vui lòng quét thẻ mới !");
    } else if(!contentItem.IsLock){
      alert("Không thẻ thêm thẻ cho nhân viên đã nghỉ việc !");
    }else{
      /*----------lấy id Process từ Id Model ----------------*/
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
          var tempp = JSON.parse(resModel.data);

          this.setState({
            idProcess: tempp,
          });
          var idProcessnew = this.state.idProcess.ProcessId;
          var idClassifynew = this.state.idProcess.Classify;
          var date = new Date();
          var dateNew = date.valueOf();
          console.log(dateNew);
          var valueCard =
            '{"Id":"' +
            IdCountCard +
            '","Employee":"' +
            contentItem.Id +
            '","Color":"' +
            Color +
            '","RegistTime":' +
            dateNew +
            ',"Status":"Release","ProcessId":"' +
            idProcessnew +
            '","ModelId":"' +
            idModel +
            '","Classify":"' +
            idClassifynew +
            '","RFID":"' +
            IdNewCard.Id +
            '","CurrentRecode":""}';
          console.log(valueCard);
          /*--------------Thêm thẻ mới --------------------- */
          axios({
            method: "POST",
            url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}`,
            data: {
              Key: IdCountCard,
              Classify: "Card",
              Value: valueCard,
              Description: "Card Ngọc Kim Loan",
            },
          })
            .then((res) => {
              alert(
                "Gán thẻ vào nhân viên " + contentItem.Name + " thành công"
              );
              /*---------Xóa thẻ RFID ở table newCard ----------- */
              axios({
                method: "DELETE",
                url:
                  `${Config.API_URL}` +
                  "/api/data/key?token=" +
                  `${Config.TOKEN}` +
                  "&classify=NewCard&key=" +
                  IdNewCard.Id,
                data: null,
              })
                .then((res) => {
                  console.log("Xóa thẻ RFID ở NewCard thành công");
                })
                .catch((err) => {
                  console.log(err);
                });

              console.log("ok");
            })
            .catch((err) => {
              console.log("Không thêm thẻ được");
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          alert("Vui lòng chọn công đoạn !");
        });
    }
  };

  render() {
    var { contentModel, IdNewCard } = this.state;
    var { contentItem } = this.props;
    var status = contentItem.IsLock ? "đang làm việc" : "đã nghỉ";
    const dataDay = parseInt(contentItem.BirthDay);
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>{IdNewCard.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.CMND}</td>
        <td>{status}</td>
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
            <option value="">---Chọn mã cá---</option>
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
            id="btnThem"
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
