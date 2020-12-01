import React, { Component } from "react";
import axios from "axios";
import * as Config from '../../../untils/Config'
var textName;
var ObjName;
var ObjValue;
var contentItemss;
class TableContentItemTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItemModelGetId: [],
      nameItemModelGetId:[],
      nameSection: '',
    };
  }
  /*----------------------get ID of table Model to call name Model ----------------------------- */
  componentDidMount() {
    var { contentItem } = this.props;
    var textString = contentItem.Status.ProcessId +'';

      var arrayIdProcess = textString.split(','); // tách chuỗi từ Process ID

    console.log(arrayIdProcess);	
    var arrayName=[]
    for( var k =0; k<=arrayIdProcess.length;k++){
      axios({
        method: "GET",
        url: 
          `${Config.API_URL}`+"/api/data/valuekey?token="+`${Config.TOKEN}`+"&Classify=Process&key=" +
          arrayIdProcess[k]+
          "",
        data: null,
      })
        .then((resProcess) => {
          ObjValue = JSON.parse(resProcess.data);
          var nameProcess= ObjValue.Name;
          arrayName.push(nameProcess)
          this.setState({
            nameItemModelGetId: arrayName
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
    /*-----------------Lấy thông tin section và đổ vào select----------------------------- */
    axios({
      method: "GET",
      url: `${Config.API_URL}` + "/api/Section?id="+contentItem.SectionId+"&token=" + `${Config.TOKEN}`,
      data: null,
    })
      .then((res) => {
        var ObjvalueSection= res.data;
        console.log(ObjvalueSection);
        /*this.setState({
          nameSection: ObjvalueSection,
        });*/
      })
      .catch((err) => {
        console.log(err);
        console.log("Lỗi lấy thông tin khu vực theo id- sections");
      });
  }
  onGetIdEdit=()=>{
    this.props.onGetIdEdit(this.props.contentItem.Id);
  }
  render() {
    var { contentItem, index } = this.props;
    var { contentItemModelGetId,nameItemModelGetId, nameSection } = this.state;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.Status.Type}</td>
        <td>{nameItemModelGetId+" "}</td>
        <td>{contentItem.SectionId}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
            onClick={this.onGetIdEdit}
          >
            Chỉnh sửa
          </button>
        </td>
      </tr>
      
    );
  }
}
export default TableContentItemTramCan;
