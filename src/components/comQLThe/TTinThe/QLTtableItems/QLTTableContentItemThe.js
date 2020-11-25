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
          nameEmp: Object.Name,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("lỗi lấy tên công nhân !");
      });

    /*----------láy tên khu vực ----------- */
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
        console.log("lỗi lấy tên công nhân !");
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
        console.log(err);
        console.log("lỗi lấy tên công đoạn(mã cá) !");
      });
  };
  getIDChange = () => {
    var { nameEmp, nameProcess, nameModel } = this.state;
    var { contentItem } = this.props;
    var idCard = contentItem.Id;
    var idEmpl = contentItem.Employee;
    this.props.getIDChange(idCard,idEmpl, nameEmp, nameModel, nameProcess);
  };
  render() {
    var { contentItem, index } = this.props;
    var { nameEmp, nameProcess, nameModel } = this.state;
    console.log(nameProcess);

    const dataDay = parseInt(contentItem.BirthDay);
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{nameEmp}</td>
        <td>{contentItem.Color}</td>
        <td>{nameModel}</td>
        <td>{nameProcess}</td>
        <td>{contentItem.Classify}</td>
        <td>
          <div className="infoCard ">
            <button
              type="button"
              className="btn btn-primary card card-primary card-outline container-fluid "
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
            data-toggle="modal"
            data-target="#modal-Delete"
            onClick={this.getIDChange}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default QLTTableContentItemThe;
