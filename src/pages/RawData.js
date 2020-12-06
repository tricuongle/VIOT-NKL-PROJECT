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
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          arrayRecode.push(contentItem);
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
                arrayRecode.push(contentItem);
              });
              this.setState({
                valueRecodeIn: arrayRecode,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //setTimeout(this.componentDidMount, 2000);
    //console.log("<-- số lần quét Raw data (2s/lần)");
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
