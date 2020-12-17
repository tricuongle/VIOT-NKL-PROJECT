import React, { Component } from "react";
import TableContentRawDataIn from "../components/comRawData/tableContentRawData/TableContentRawDataIn";
import TableContentRawDataOut from "../components/comRawData/tableContentRawData/TableContentRawDataOut";
import axios from "axios";
import * as Config from "../untils/Config";
import $, { event } from "jquery";
import TableItemRawDataOut from "../components/comRawData/TableItemRawData/TableItemRawDataOut";
import TableItemRawDataIn from "../components/comRawData/TableItemRawData/TableItemRawDataIn";

var arrayRecode = [];
class RawData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecodeIn: [],
      valueRecodeOut: [],
    };
  }

  convertData = (data) => {
    const date = new Date(data * 1000);
    var dateFormat = require("dateformat");
    var dateNew = dateFormat(date, "dd/mm/yyyy");
    return dateNew;
  };
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Record-Out",
      data: null,
    })
      .then((res) => {
        arrayRecode = [];
        var date = new Date();
        var dayToDay2 =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);

          var dayRawData = this.convertData(contentItem.ReadTime); // thời gian record

          if (dayRawData == dayToDay2) {
            arrayRecode.push(contentItem);
          }

          // arrayRecode.sort().reverse();
          this.setState({
            valueRecodeOut: arrayRecode,
          });

          /*-------- */
          axios({
            method: "GET",
            url:
              `${Config.API_URL}` +
              "/api/data/Values?token=" +
              `${Config.TOKEN}` +
              "&Classify=Record-In",
            data: null,
          })
            .then((res) => {
              arrayRecode = [];
              res.data.map((contentItem) => {
                contentItem = JSON.parse(contentItem);
                var dayRawData = this.convertData(contentItem.ReadTime); // thời gian record
                if (dayRawData == dayToDay2) {
                  arrayRecode.push(contentItem);
                }
              });

              //arrayRecode.sort().reverse();
              this.setState({
                valueRecodeIn: arrayRecode,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
        this.state.valueRecodeOut.sort().reverse(); // đảo mảng record Out
        this.state.valueRecodeIn.sort().reverse(); // đảo mảng record In
        
        $("#tableDataOut").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 350,
          paging: false,
        });
        $("#tableDataIn").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 350,
          paging: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var { valueRecodeIn, valueRecodeOut } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1> RAW DATA - DỮ LIỆU QUÉT THIẾT BỊ CÂN</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i>Trang chủ
              </a>
            </li>
            <li className="active">Raw data</li>
          </ol>
        </section>

        <section className="content">
          <div className="row">
            <TableContentRawDataIn>
              {this.showContentItemsOut(valueRecodeIn)}
            </TableContentRawDataIn>

            <TableContentRawDataOut>
              {this.showContentItemsOut(valueRecodeOut)}
            </TableContentRawDataOut>
          </div>
        </section>
      </div>
    );
  }

  showContentItemsOut(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemRawDataOut
            key={index}
            contentItem={contentItem}
            index={index}
          />
        );
      });
    }
    return result;
  }
  showContentItemsIn(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemRawDataIn
            key={index}
            contentItem={contentItem}
            index={index}
          />
        );
      });
    }
    return result;
  }
}
export default RawData;
