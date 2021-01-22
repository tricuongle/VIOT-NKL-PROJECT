import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../../untils/Config";
import $, { data } from "jquery";
var arrayValueModel = [];
var idModel;
var count;
class QLTTableContentItemNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCard: "",
      nameEmployeeCard: "-",
      nameProcessCard: "-",
    };
  }
  componentDidMount = () => {
    var { contentItem } = this.props;

    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Card&key=" +
        contentItem.Id,
      data: null,
    })
      .then((res) => {
        var value = res.data;
        var infoCard = "";
        if (value.Result == "No Value") {
          this.setState({
            valueCard: infoCard,
          });
        } else {
          value = JSON.parse(res.data);
          //----------------------
          /*------lấy tên công nhân ----------- */
          axios({
            method: "GET",
            url:
              `${Config.API_URL}` +
              "/api/data/valuekey?token=" +
              `${Config.TOKEN}` +
              "&Classify=Employee&key=" +
              value.Employee,
            data: null,
          })
            .then((res) => {
              var Object = JSON.parse(res.data);
              this.setState({
                nameEmployeeCard: Object.Name,
              });
            })
            .catch((err) => {
              console.log(err);
              console.log("lỗi lấy tên công nhân !");
            });

          /*------lấy tên công đoạn ----------- */
          axios({
            method: "GET",
            url:
              `${Config.API_URL}` +
              "/api/data/valuekey?token=" +
              `${Config.TOKEN}` +
              "&Classify=Process&key=" +
              value.ProcessId,
            data: null,
          })
            .then((res) => {
              var Object = JSON.parse(res.data);
              this.setState({
                nameProcessCard: Object.Name,
              });
            })
            .catch((err) => {
              console.log(err);
              console.log("lỗi lấy tên công đoạn !");
            });
          //----------------------

          this.setState({
            valueCard: value,
          });
        }
      })
      .catch((err) => {
        console.log("lỗi lấy thông tin thẻ");
        console.log(err);
      });
  };
  /*-------------Hàm lấy value newcard từ hàng ------------- */
  getValueNewCard = () => {
    this.props.getValueNewCard(this.props.contentItem);
  };
  deleteRFID = () => {
    this.props.deleteRFID(this.props.contentItem.Id);
  };

  render() {
    var { valueCard } = this.state;
    var { contentItem, index } = this.props;
    var contentCard;
    if (valueCard == "") {
      contentCard = (
        <p>
          <b>Thông tin thẻ: </b> Rỗng
        </p>
      );
    } else {
      contentCard = (
        <p>
          <b>Tên thẻ:</b> {valueCard.Id} <br />
          <b>Tên công nhân:</b> {this.state.nameEmployeeCard} <br />
          <b>Màu thẻ:</b> {valueCard.Color}
          <br />
          <b>Công đoạn:</b> {this.state.nameProcessCard}
          <br />
          <b>Nhóm:</b> {valueCard.Classify}
        </p>
      );
    }

    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentCard}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            data-target="#modal-create"
            onClick={this.getValueNewCard}
            id="btnAddCard"
          >
            Thêm vào công nhân
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modal-delete"
            id="btnXoa"
            onClick={this.deleteRFID}
          >
            Xóa thẻ RFID
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
export default QLTTableContentItemNewCard;
