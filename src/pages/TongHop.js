import React, { Component } from "react";
import TableContentTongHop from "../components/comTongHop/tableContentTongHop/TableContentTongHop";
import TableItemTongHop from "../components/comTongHop/TableItemTongHop/TableItemTongHop";
import axios from "axios";
import * as Config from "../untils/Config";
var arrayRecode = [];
class TongHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueRecode: [],
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
        });
        this.setState({
          valueRecode: arrayRecode,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("<--Lần quét table tổng hợp");
    setTimeout(this.componentDidMount, 2000);
  };

  render() {
    var { valueRecode } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>TỔNG HỢP CÔNG ĐOẠN</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Tổng hợp</li>
          </ol>
        </section>
        <section className="content">
          <form className="filter-section form-inline"></form>
          <TableContentTongHop>
            {this.showContentItems(valueRecode)}
          </TableContentTongHop>
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemTongHop
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
export default TongHop;
