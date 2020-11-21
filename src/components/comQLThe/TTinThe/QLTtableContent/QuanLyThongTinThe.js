import React, { Component } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
import axios from "axios";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import QLTTableContentThe from "./QLTTableContentThe";
import QLTTableContentItemThe from "../QLTtableItems/QLTTableContentItemThe";
import $ from "jquery";
var JsonValue;
var ArrayValue = [];
class QuanLyThongTinThe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
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
  // tìm kiếm
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase(),
    });
  };
  // get thông tin thẻ
  componentDidMount() {
    axios({
      method: "GET",
      url:
        "http://171.232.86.160:5001/api/data/Values?token=ca8a745971a27185fda435692a1e66df835e7cd21261cebbc0c5be88b2250db4d2094547265b6cfc8d7d112d4c411c34&Classify=Card",
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
        console.log(this.state.contentItems);
        $(document).ready(function () {
          $("#tableData").DataTable({
            pageLength: 10,
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
    var { contentItems, keyword } = this.state;
    if (keyword) {
      // render ra nội dung
      contentItems = contentItems.filter((contentItems) => {
        return contentItems.Id.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    return (
      <div>
        <section className="content">
          <QLTTableContentThe onSearch={this.onSearch}>
            {this.showContentItems(contentItems)}
          </QLTTableContentThe>

          <div className="modal fade" id="modal-edit">
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
                  <h4 className="modal-title">Sửa thông tin thẻ</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="usr">ID Thẻ</label>
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                     
                      disabled
                    />

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" value="" />
                        Kích hoạt thẻ
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="devices">
                      <h5>Tên nhâ viên:</h5>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="area" id="areaDevice">
                      <h5> Khu vực:</h5>
                    </label>
                    <select className="form-control" id="area">
                      <option>Fillet</option>
                      <option>Sửa cá</option>
                      <option>Phân size</option>
                      <option>Xẻ bướm</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="area" id="areaDevice">
                      <h5> Công đoạn:</h5>
                    </label>
                    <select className="form-control" id="area">
                      <option>ex 1</option>
                      <option>ex 2</option>
                      <option>ex 3</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="area" id="areaDevice">
                      <h5> Màu thẻ:</h5>
                    </label>
                    <select className="form-control" id="area">
                      <option>Xanh</option>
                      <option>Đỏ</option>
                      <option>Vàng</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    Lưu
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
                  <h4 className="modal-title">Xóa thẻ</h4>
                </div>
                <div className="modal-body">
                  <h5>Bạn có đồng ý xóa thẻ này không?</h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    Xóa thẻ
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
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <QLTTableContentItemThe
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
export default QuanLyThongTinThe;
