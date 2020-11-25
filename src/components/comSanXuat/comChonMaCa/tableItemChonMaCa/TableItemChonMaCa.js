import React, { Component } from "react";
import * as Config from "../../../../untils/Config";
import axios from "axios";
import $ from "jquery";
var arrayValueFishCode = [];
var arrayNameFishCode = [];
class TableItemChonMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentFishCode: [],
      NameFishYes:'',
    };
  }
  // lấy danh sách mã cá (model)  gán vào select
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model",
      data: null,
    })
      .then((resFishCode) => {
        arrayValueFishCode = [];
        var {contentItem} = this.props
        for (var k in resFishCode.data) {
          var Object = JSON.parse(resFishCode.data[k]);
          arrayValueFishCode.push(Object);
        }
        this.setState({
          contentFishCode: arrayValueFishCode,
        });
        arrayNameFishCode =[]
        for(var temp in this.state.contentFishCode){
          // so sách
          if (this.state.contentFishCode[temp].ProcessId == contentItem.Id){
            arrayNameFishCode.push(this.state.contentFishCode[temp].Name); // lấy ds mã cá đã thêm
            this.setState({
              NameFishYes : arrayNameFishCode
            })
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onGetValue=()=>{
    var IdFishCode=document.getElementById('idSelectFS').value;
    this.props.onGetValue(this.props.contentItem.Id,IdFishCode)
  }
  render() {
    var { contentFishCode ,NameFishYes} = this.state;
    var { contentItem, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{contentItem.Name}</td>
        <td>
          <div>
            <select className="form-control" id="idSelectFS">
              {this.showContentSelect(contentFishCode)}
            </select>
          </div>
        </td>
        <td>
          <button type="button" className="btn btn-success" 
          onClick={this.onGetValue}>
            Chọn
          </button>
        </td>
    <td>{NameFishYes+''}</td>
      </tr>
    );
  }
  // Hiển thị thông tin list mã cá cần chọn
  showContentSelect(contentFishCode) {
    var result = null;
    if (contentFishCode.length >= 0) {
      result = contentFishCode.map((contentItem, index) => {
        return <option key={index} value= {contentItem.Id}>{contentItem.Name}</option>;
      });
    }
    return result;
  }
}
export default TableItemChonMaCa;
