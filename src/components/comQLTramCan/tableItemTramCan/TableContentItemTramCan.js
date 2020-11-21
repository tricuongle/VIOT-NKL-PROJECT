import React, { Component } from "react";
import axios from "axios";
var textName;
var ObjName;
var ObjValue;
var contentItemss;
class TableContentItemTramCan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItemModelGetId: [],
    };
  }
  componentDidMount() {
    var { contentItem } = this.props; // transfet content
    console.log(contentItem.Status.ModelId );
    axios({
      method: "GET",
      url:
        "http://171.232.86.160:5001/api/data/valuekey?token=ca8a745971a27185fda435692a1e66df835e7cd21261cebbc0c5be88b2250db4d2094547265b6cfc8d7d112d4c411c34&Classify=Model&key=" +
        contentItem.Status.ModelId + // assign
        "",
      data: null,
    })
      .then((resProcess) => {
        ObjValue = JSON.parse(resProcess.data);
        this.setState({
          contentItemModelGetId: ObjValue
        })
       /* textName = ObjValue.Name;
        ObjName = {
          NameModel: textName,
        };
        contentItemss = Object.assign(ObjName, contentItem);
        this.setState({
          contentItemNew: contentItemss,
        });*/
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    var { contentItem, index } = this.props;
    var { contentItemModelGetId } = this.state;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.Status.Type}</td>
        <td>{contentItemModelGetId.Name}</td>
        <td>{contentItemModelGetId.WeightMin}</td>
        <td>{contentItemModelGetId.WeighMax}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
          >
            Chỉnh sửa
          </button>
        </td>
      </tr>
      
    );
  }
}
export default TableContentItemTramCan;
