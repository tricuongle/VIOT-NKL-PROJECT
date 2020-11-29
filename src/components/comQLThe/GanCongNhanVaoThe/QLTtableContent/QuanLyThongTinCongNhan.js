import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
import QLTTableContentItemCongNhan from "../QLTableItems/QLTTableContentItemCongNhan";
import QLTTableContentCongNhan from "./QLTTableContentCongNhan";
import * as Config from '../../../../untils/Config';

var JsonValue;
var ArrayValue = [];
class QuanLyThongTinCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentItemss: [],
      keyword: "",
      status: 1,
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase(),
    });
  };
  /*------------Lấy thông tin công nhân ------------------- */
  componentDidMount() {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}`+"/api/data/Values?token="+`${Config.TOKEN}`+"&Classify=Employee",
      data: null,
    })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          JsonValue = JSON.parse(res.data[i]);
          ArrayValue.push(JsonValue);
        }
        this.setState({
          contentItems: ArrayValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    var { contentItemss, contentItems, keyword ,status} = this.state;
    if (keyword) {
      // render ra nội dung
      contentItemss = contentItems.filter((contentItems) => {
        return (
          contentItems.Id.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.Name.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.CMND.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.CardNo.toLowerCase().indexOf(keyword) !== -1
        );
      });
      contentItems = contentItems.filter((contentItems) => {
        if (status === -1) {
          return contentItems;
        } else {
          return contentItems.status === (status === 1 ? true : false);
        }
      });
    }
    return (
      <div>
        <section className="content">
        <p>Gợi ý: Gõ họ tên, hoặc số CMND để tìm công nhân.</p>
          <QLTTableContentCongNhan onSearch={this.onSearch}>
            {this.showContentItems(contentItemss)}
          </QLTTableContentCongNhan>
        </section>
      </div>
    );
  }
  // đổ dữ liệu vào table công nhân
  showContentItems(contentItemss) {
    var result = null;
    if (contentItemss.length = 1) {
      result = contentItemss.map((contentItem, index) => {  
        return (
          <QLTTableContentItemCongNhan
            key={index}
            contentItem={contentItem}
          />
        );
      });
    }
    return result;
  }
}
export default QuanLyThongTinCongNhan;
