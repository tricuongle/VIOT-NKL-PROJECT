import React, { Component } from "react";

class TableContentItemCongNhan extends Component {
  onEdit = (id) => {
    
  };
  render() {
    var { contentItem, index } = this.props;
    this.componentDidMount=()=>{
      this.props.onEdit(contentItem.Id); // truyền ra ngoài
    }
    var statusEmployee = contentItem.IsLock ? "đang làm việc" : "Đã nghỉ";
    //const dataDay = parseInt(contentItem.BirthDay);
    //var BirthDay = new Date(dataDay).toLocaleDateString("en-US")
    console.log(contentItem.Id);
    return (
      <tr id="device2" className="edit">
        <td>{index + 1}</td>
        <td>{contentItem.Id}</td>
        <td>{contentItem.Name}</td>
        <td>{contentItem.CMND}</td>
        <td>{contentItem.BirthDay}</td>
        <td>{statusEmployee}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-edit"
          >
            Sửa
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modal-Delete"
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default TableContentItemCongNhan;
