import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import TableContentItemCongNhan from "../components/comQLCongNhan/tableItemCongNhan/TableContentItemCongNhan";
import TableContentCongNhan from "../components/comQLCongNhan/tableContentCongNhan/TableContentCongNhan";
import ActionCreateCongNhan from "../components/comQLCongNhan/comQLCongNhanActions/ActionCreateCongNhan";
import ActionEditCongNhan from "../components/comQLCongNhan/comQLCongNhanActions/ActionEditCongNhan";
import * as Config from "../untils/Config";
var ArrayValue = [];
class QuanLyCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      filter: {
        name: "",
        status: -1, // filter (-1 tất cả, 1 đang làm, 0 đã nghỉ)
      },
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
  // hàm filter nội dung (tất cả, đã nghỉ, đang làm)
  onFilter = (filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        status: filterStatus,
      },
    });
  };
  // hàm lấy danh sách công nhân từ api
  componentDidMount() {
    console.log(ArrayValue);
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Employee",
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
        // sử dụng thư viện datatable
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
  }

  render() {
    var { contentItems, filter, keyword } = this.state;
    if (filter) {
      // xét điều kiện để filter
      if (filter.name) {
        contentItems = contentItems.filter((contentItems) => {
          return contentItems.Name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      contentItems = contentItems.filter((contentItems) => {
        if (filter.status === -1) {
          return contentItems;
        } else {
          return contentItems.IsLock === (filter.status === 1 ? true : false);
        }
      });
    }
    return (
      // giao diện
      <div className="content-wrapper">
        <section className="content-header">
          <h1>QUẢN LÝ CÔNG NHÂN</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Quản lý công nhân</li>
          </ol>
        </section>
        <section className="content">
          <TableContentCongNhan onFilter={this.onFilter}>
            {this.showContentItems(contentItems)}
          </TableContentCongNhan>

          {/*buton create Employee*/}
          <ActionCreateCongNhan></ActionCreateCongNhan>

          {/*buton Edit Employee*/}
          <ActionEditCongNhan></ActionEditCongNhan>

          <div className="modal fade" id="modal-Delete">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                  <h4 className="modal-title">Xóa công nhân</h4>
                </div>
                <div className="modal-body">
                  <h5>Bạn có đồng ý xóa công nhân này không?</h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    Xóa công nhân
                  </button>
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Thoát
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  // hàm đổ dữ liệu vào table
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <TableContentItemCongNhan
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
export default QuanLyCongNhan;
