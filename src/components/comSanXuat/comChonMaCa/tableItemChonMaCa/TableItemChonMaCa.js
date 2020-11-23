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
  // lấy danh sách mã cá gán vào select
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=FishCode",
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
          if (this.state.contentFishCode[temp].ModelId == contentItem.Id){
            arrayNameFishCode.push(this.state.contentFishCode[temp].Name);
            this.setState({
              NameFishYes : arrayNameFishCode
            })
          }
        }
        console.log(this.state.NameFishYes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var { contentFishCode ,NameFishYes} = this.state;
    var { contentItem, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{contentItem.Name}</td>
        <td>
          <div>
            <select className="form-control" id="area">
              {this.showContentSelect(contentFishCode)}
            </select>
          </div>
        </td>
        <td>
          <button type="button" className="btn btn-success">
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
        return <option key={index}>{contentItem.Name}</option>;
      });
    }
    return result;
  }
}
export default TableItemChonMaCa;
