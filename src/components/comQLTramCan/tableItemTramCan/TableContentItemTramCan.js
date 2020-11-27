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
      nameItemModelGetId:'',
    };
  }
  /*----------------------get ID of table Model to call name Model ----------------------------- */
  componentDidMount() {
    var { contentItem } = this.props;
    
    var arrayIdProcess = contentItem.Status.ProcessId.split(" "); // tách chuỗi từ Process ID
    console.log(arrayIdProcess);
    console.log(arrayIdProcess.length);
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
          console.log(this.state.nameItemModelGetId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  onGetIdEdit=()=>{
    this.props.onGetIdEdit(this.props.contentItem.Id);
  }
  render() {
    var { contentItem, index } = this.props;
    var { contentItemModelGetId,nameItemModelGetId } = this.state;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.Status.Type}</td>
        <td>{nameItemModelGetId+" "}</td>
        <td>{contentItem.Status.Weigh}</td>
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
