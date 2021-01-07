import React, { Component } from "react";
import * as Config from "../../../../untils/Config";
import axios from "axios";

class QLTTableContentItemThe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEmp: "",
      nameModel: "",
      nameProcess: "",
    };
  }

  componentDidMount = () => {
    var { contentItem } = this.props;
    var nameEmp = contentItem.Employee;
    var nameModel = contentItem.ModelId;
    var nameProcess = contentItem.ProcessId;

    /*------lấy tên công nhân----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee&key=" +
        nameEmp,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameEmp: Object,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên công nhân !");
      });

    /*----------láy tên công đoạn----------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process&key=" +
        nameProcess,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameProcess: Object.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên công đoạn !");
      });
    /*----------lấy tên công đoạn (mã cá)-------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        nameModel,
      data: null,
    })
      .then((res) => {
        var Object = JSON.parse(res.data);
        this.setState({
          nameModel: Object.Name,
        });
      })
      .catch((err) => {
        console.log("lỗi lấy tên mã cá!");
      });
  };
  // truyền dữ liệu ra ngoài
  getIDChange = () => {
    var { nameEmp, nameProcess } = this.state;
    var { contentItem } = this.props;
    this.props.getIDChange(contentItem, nameEmp.Name, nameProcess);
  };
  // truyền id RFID để xóa
  getIDDeleteChange = () => {
    var {contentItem}= this.props
    this.props.getIDDeleteChange(contentItem.RFID, contentItem);
  };
  render() {
    var { contentItem, index } = this.props;
    var { nameEmp, nameProcess } = this.state;
    const dataDay = parseInt(contentItem.BirthDay);
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>{index + 1}</td>
        <td>{contentItem.RFID}</td>
        <td>{contentItem.Id}</td>
        <td>{nameEmp.Name}</td>
        <td>{contentItem.Color}</td>
        <td>{nameProcess}</td>
        <td>{contentItem.Classify}</td>
        <td>
          <div className="infoCard ">
            <button
              type="button"
              className="btn btn-primary card card-primary "
              data-toggle="modal"
              data-target="#modal-edit"
              id="id123"
              onClick={this.getIDChange}
            >
              Sửa
            </button>
          </div>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.getIDDeleteChange}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default QLTTableContentItemThe;
