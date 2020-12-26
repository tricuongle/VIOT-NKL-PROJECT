import React, { Component, forwardRef } from "react";
import $, { error, event } from "jquery";
class TableItemTinhTien extends Component {
  render() {
    var text = "";
    var temps = "";
    var arrayTemp = [];
    var arrayTempp = [
      /*{ ModelName: "Phụ phẩm (VUNMO)" },
      { ModelName: "Phụ phẩm (VUNDO)" },
      { ModelName: "Phụ phẩm(DE)" },
      { ModelName: "Phụ phẩm (DATBK)" },
      { ModelName: "Cá xẻ bướm (DAT)" },
      { ModelName: "Cá xẻ bướm (LON)" },
      { ModelName: "Cá xẻ bướm (VUALON)" },
      { ModelName: "Phụ phẩm(BONGBONG)" },
      { ModelName: "Cá xẻ bướm (DAI)" },
      { ModelName: "Phụ phẩm(DATCANGA)" },
      { ModelName: "Phụ phẩm (BAOTU)" },
      { ModelName: "Cá xẻ bướm (NHO)" },
      { ModelName: "Cá xẻ bướm (NHI1)" },
      { ModelName: "Cá xẻ bướm (VUANHO)" },
      { ModelName: "Cá xẻ bướm (NHI2)" },*/
    ];

    var { contentItem, index } = this.props;
    arrayTempp = contentItem.arrAllModel;
    for (var d = 0; d < arrayTempp.length; d++) {
      var rrr = <td> __ </td>;
      arrayTemp.push(rrr);
    }
    //console.log(arrayTempp);
    for (var k = 0; k < contentItem.listModel.length; k++) {
      for (var j = 0; j < arrayTempp.length; j++) {
        if (contentItem.listModel[k].ModelName == arrayTempp[j].ModelName) {
          temps = (
            <td>
              {contentItem.listModel[k].ModelName}-
              {contentItem.listModel[k].Money}
            </td>
          );
          arrayTemp[j] = temps;
        }
      }
    }
    arrayTemp.sort().reverse();
    //console.log(arrayTempp);
    return (
      <tr id="idCell">
        <td> {index + 1} </td>
        <td> {contentItem.nameEmp} </td>
        {arrayTemp}
        <td> {contentItem.sumMoney} </td>
      </tr>
    );
  }
}
export default TableItemTinhTien;
