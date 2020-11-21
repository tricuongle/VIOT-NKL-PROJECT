import React, { Component } from "react";
import axios from "axios";
const LOCALHOST = "http://171.232.86.160:5000";
const KEY = "";
const TOKEN =
  "04c5077dc551934ebdc267fbc83357b9967e19d21fa9d8c4884fac130acb7dadc50e05c08b9980cd7a379f2c8fa39e50";
var textName;
var ObjName;
var ObjValue;
var contentItemss;
// biến lấy giá trị model
var textDateModel;
var ObjModelValue;
class TableContentItemCongDoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItemNamePro: [],
    };
  }
  componentDidMount() {
    var { contentItem } = this.props;
// lấy giá trị thời gian của công đoạn
    axios({
      method: "GET",
      url:
      LOCALHOST+'/api/data?token='+TOKEN+'&Classify=Model',
      data: null,
    })
      .then((resModel) => {
      
      })
      .catch((err) => {
        console.log(err);
        console.log("Không lấy công đoạn !");
      });
    // lấy giá trị name  theo id cửa khu vực
    axios({
      method: "GET",
      url:
        LOCALHOST+"/api/data/valuekey?token="+TOKEN+"&Classify=Process&key=" +
        contentItem.ProcessId +
        "",
      data: null,
    })
      .then((resProcess) => {
        ObjValue = JSON.parse(resProcess.data); 
        textName = ObjValue.Name; 
        ObjName = {NameProcesstoID : textName} 
        contentItemss= Object.assign(ObjName, contentItem); 
        this.setState({ 
          contentItemNamePro: contentItemss,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi");
      });
  }
  render() {
    var { contentItem, index } = this.props;
    var { contentItemNamePro } = this.state;
    //var TimeCreateModel = new Date(textDateModel).toLocaleDateString();
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{textName}</td>
        <td></td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
          >
            Sửa
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modal-Delete"
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TableContentItemCongDoan;
