import React, { Component } from "react";
import * as Config from "../../../../untils/Config";
import axios from "axios";
import $ from "jquery";
var arrayValueFishCode = [];
var arrayNameFishCode = [];
var Objvalue;
var valueUpdateModel;
class TableItemChonMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentFishCode: [],
      contentModel: [],
      NameFishYes: "",
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
        var { contentItem } = this.props;
        for (var k in resFishCode.data) {
          var Object = JSON.parse(resFishCode.data[k]);
          arrayValueFishCode.push(Object);
        }
        this.setState({
          contentFishCode: arrayValueFishCode,
        });
        arrayNameFishCode = [];
        for (var temp in this.state.contentFishCode) {
          // so sách
          if (this.state.contentFishCode[temp].ProcessId == contentItem.Id) {
            arrayNameFishCode.push(this.state.contentFishCode[temp].Name); // lấy ds mã cá đã thêm
            this.setState({
              NameFishYes: arrayNameFishCode,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  GetValueFishcode = (IdFishCode) => {
    var { contentItem } = this.props;
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/valuekey?token=" +
        `${Config.TOKEN}` +
        "&classify=Model&key=" +
        IdFishCode,
      data: null,
    })
      .then((res) => {
        Objvalue = JSON.parse(res.data);
        this.setState({
          contentModel: Objvalue,
        });
        var { contentModel } = this.state;
        valueUpdateModel = {
          Id: IdFishCode,
          Name: contentModel.Name,
          ProcessId: contentItem.Id,
          CreateDate: contentModel.CreateDate,
          WeighInMax: contentModel.WeighInMax,
          WeightInMin: contentModel.WeightInMin,
          WeightOutMin: contentModel.WeightOutMin,
          WeighOutMax: contentModel.WeighOutMax,
          Classify: contentModel.Classify,
          Group: contentModel.Group,
        };
        var valuetemp =
          '{"Id":"' +
          contentModel.Id +
          '","Name":"' +
          contentModel.Name +
          '","ProcessId":"' +
          contentItem.Id +
          '","CreateDate":"' +
          contentModel.CreateDate +
          '","WeighInMax":"' +
          contentModel.WeighInMax +
          '","WeightInMin":"' +
          contentModel.WeightInMin +
          '","WeightOutMin":"' +
          contentModel.WeightOutMin +
          '","WeighOutMax":"' +
          contentModel.WeighOutMax +
          '","Classify":"' +
          contentModel.Classify +
          '","Group":"' +
          contentModel.Group +
          '","status":' +
          contentModel.status +
          "}";
        console.log(contentModel.Name);
        /*axios({
          method: "PUT",
          url:
         `${Config.API_URL}`+'/api/data/key?token='+`${Config.TOKEN}`+'&classify=Model&key='+IdFishCode,
          data: {
            "Value": valuetemp
          },
        })
          .then((res) => {
            alert("Chọn mã cá thành công !");
          })
          .catch((err) => {
            console.log(err);
          });*/
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onGetValue = () => {
    var IdFishCode = document.getElementById("idSelectFS").value;
    //var valuesele= IdFishCode.options[IdFishCode.selectedIndex].value;// value ==id=Key
    this.GetValueFishcode(IdFishCode);
    console.log(IdFishCode);
  };
  render() {
    var { contentFishCode, NameFishYes } = this.state;
    var { contentItem, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{contentItem.Name}</td>
        <td>{NameFishYes + ""}</td>
      </tr>
    );
  }
  // Hiển thị thông tin list mã cá cần chọn
  showContentSelect(contentFishCode) {
    var result = null;
    if (contentFishCode.length >= 0) {
      result = contentFishCode.map((contentItem, index) => {
        return (
          <option key={index} id={index} value={contentItem.Id}>
            {contentItem.Name}
          </option>
        );
      });
    }
    return result;
  }
}
export default TableItemChonMaCa;
