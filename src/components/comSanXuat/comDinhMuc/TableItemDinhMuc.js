import React, { Component } from "react";
import axios from "axios";
import * as Config from "../../../untils/Config";

class TableItemDinhMuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NameModel: "",
    };
  }
  onUpdateDinhMuc = () => {
    var {contentItem} = this.props;
    this.props.onUpdateDinhMuc(contentItem.ID,this.state.NameModel,contentItem);
  };
  onDelDinhMuc =()=>{
    var {contentItem} = this.props;
    this.props.onDelDinhMuc(contentItem.ID,this.state.NameModel , contentItem);
  }
  componentDidMount = () => {
    var { contentItem } = this.props;
    var key = contentItem.ModelId;
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        key,
      data: null,
    })
      .then((res) => {
        var temp = JSON.parse(res.data);
        this.setState({
          NameModel: temp.Name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var { NameModel } = this.state;
    var { contentItem, priceTag, index } = this.props;
    return (
      <tr id="device2" className="edit">
        <td>{index+1}</td>
        <td>{contentItem.ID}</td>
        <td>{NameModel}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.Weight}</td>
        <td>{contentItem.Price}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
            onClick={this.onUpdateDinhMuc}
          >
            Sửa định mức
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modal-Delete"
            onClick={this.onDelDinhMuc}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TableItemDinhMuc;
