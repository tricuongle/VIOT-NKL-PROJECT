import React, { Component } from "react";
import axios from "axios";

function GetAPI(Classify, key, contents) {
  var textName;
  var textWeighMax;
  var textWeighMin;
  var ObjName;
  var ObjValue;
  var contentItemss;
 return (
    axios({
        method: "GET",
        url:
          "http://171.232.86.160:5001/api/data/valuekey?token=ca8a745971a27185fda435692a1e66df835e7cd21261cebbc0c5be88b2250db4d2094547265b6cfc8d7d112d4c411c34&Classify="+Classify+"&key=" +
          key +
          "",
        data: null,
      })
        .then((resProcess) => {
            console.log('vào ok');
          ObjValue = JSON.parse(resProcess.data);
          console.log(ObjValue); // chuyển về kiểu obj
          textName = ObjValue.Name;
          //textWeighMax = ObjValue.WeighMax;
         // textWeighMin = ObjValue.WeighMin; // lấy giá trị của thuộc tính name
          ObjName = {
            NameProcesstoID: textName,
           // WeighMaxProcesstoID: textWeighMax,
           // WeighMinProcesstoID: textWeighMin,
          }; // tạo một obj mới
          contents = Object.assign(ObjName, contents); // thêm obj vừa tạo trên vào obj content
          this.setState({
            // thay đổi giá trị contenItemNamePro trong state bằng giá trị contentItemss
            contentItemNew: contentItemss,
          });
        })
        .catch((err) => {
          // nếu lấy api không được hiện lỗi
          console.log(err);
          console.log("Lỗi");
        })
 );

}
export default GetAPI;
