import React, { Component } from "react";
import TableContentChonMaCa from "../../components/comSanXuat/comChonMaCa/tableContentChonMaCa/TableContentChonMaCa";
import $ from "jquery";
import * as Config from "../../untils/Config";
import axios from "axios";
import TableItemChonMaCa from "../../components/comSanXuat/comChonMaCa/tableItemChonMaCa/TableItemChonMaCa";
var ArrayValue = [];
var ArrayValueFish = [];
class ChonMaCa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      /////////////
      contentItemsFish: [],

    };
  }

  // lấy danh sách công đoạn

  getValueFishCode = () => {};
  componentDidMount = () => {
  
      /////////////////////////////////////////////
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Model",
      data: null,
    })
      .then((res) => {
        ArrayValue = [];
        res.data.map((contentItem) => {
          contentItem = JSON.parse(contentItem);
          ArrayValue.push(contentItem);
        });

        this.setState({
          contentItems: ArrayValue,
        });

        // tabledata giao diện
        $(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 5,
            processing: true,
            responsive: true,
            dom: "Bfrtip",
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var { contentItems } = this.state;
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>CHỌN MÃ CÁ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Chọn mã cá</li>
          </ol>
        </section>
        <section className="content">
          <form className="filter-section form-inline"></form>
          <TableContentChonMaCa>
            {this.showContentItems(contentItems)}
          </TableContentChonMaCa>
        </section>
      </div>
    );
  }
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableItemChonMaCa
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
export default ChonMaCa;
