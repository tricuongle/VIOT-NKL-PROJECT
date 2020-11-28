import React, { Component } from "react";
import * as Config from "../../../untils/Config";
import $, { event } from "jquery";
import axios from "axios";
var arrayRecode = [];
class TableItemTongHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecodeIn: [],
      RecodeInKG: "",
      nameProcess: "",
      idProcess: "",
      idModel: "",
    };
  }
  componentDidMount = () => {
    var { contentItem } = this.props;
    /*---------------lấy tên khu vực theo tên--------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process&key=" +
        contentItem.ProcessId,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          idProcess: ObjValue,
        });
        console.log(this.state.idProcess.Name);
      })
      .catch((err) => {
        console.log(err);
      });
    /*---------------lấy tên Công đoạn mã cá theo tên--------------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model&key=" +
        contentItem.Model,
      data: null,
    })
      .then((res) => {
        var ObjValue = JSON.parse(res.data);
        this.setState({
          idModel: ObjValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    /*----------Lấy khối lượng ở RecodeIn-------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&Classify=Recode&key=" +
        contentItem.RecodeIn,
      data: null,
    })
      .then((res) => {
        var temp = JSON.parse(res.data);
        this.setState({
          RecodeInKG: temp.Weight,
        });
        // sử dụng thư viện datatable
        $(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 10,
            processing: true,
            responsive: true,
            destroy: true,
            dom: "Bfrtip",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var { contentItem, index  } = this.props;
    var { RecodeInKG,idProcess,idModel } = this.state;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{idProcess.Name}</td>
        <td>
          {idModel.Name}

          {/*<div>
            <select
              id="input"
              className="form-control"
              required="required"
            >
              <option value="0">Chọn công đoạn mã cá</option>
              <option value="1">EX1</option>
              <option value="2">EX2</option>
              <option value="3">EX3</option>
              <option value="4">EX4</option>
              <option value="5">EX5</option>
              <option value="6">EX6</option>
            </select>
          </div>*/}
        </td>
        <td>{RecodeInKG} </td>
        <td>{contentItem.Weight} </td>
      </tr>
    );
  }
}
export default TableItemTongHop;
