import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../../untils/Config";
var arrayValueModel = [];
var idModel;
var count;
class QLTTableContentItemNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdNewCard: [],
      idProcess: "",
      IdCountCard: "",
    };
  }
  componentDidMount = () => {

  }
  /*-------------Hàm láy value newcard từ hàng ------------- */
  getValueNewCard = (id) => {
      this.props.getValueNewCard(this.props.contentItem.Id);
  };
  deleteRFID =()=>{
    this.props.deleteRFID(this.props.contentItem.Id);
  }

  render() {
    var { contentItem, index } = this.props;
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            data-target="#modal-create"
            onClick={this.getValueNewCard}
            id="btnThem"
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
            id="btnThem"
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
