import React, { Component } from "react";
import axios from "axios";
import * as Config from '../../../../untils/Config';
class QLTTableContentItemCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdNewCard : '',
    };
  }
  componentDidMount =()=>{
    axios({
      method: "GET",
      url:
        `${Config.API_URL}`+"/api/data/Values?token="+`${Config.TOKEN}`+"&Classify=NewCard",
      data: null,
    })
      .then((res) => {
        var valueObject = JSON.parse(res.data[0]);
        this.setState({
          IdNewCard: valueObject
        })
      })
      
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    var { contentItem } = this.props;
    var statusEmployee = contentItem.IsLock ? "đang làm việc" : "Đã nghỉ";
    const dataDay = parseInt(contentItem.BirthDay);
    var BirthDay = new Date(dataDay).toLocaleDateString("en-US");
    console.log(this.state.IdNewCard.Id);
    return (
      <tr id="device2" className="edit form-check form-check-inlines">
       <td>{this.state.IdNewCard.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.CMND}</td>
        <td>{BirthDay}</td>
      </tr>
    );
  }
}
export default QLTTableContentItemCongNhan;
