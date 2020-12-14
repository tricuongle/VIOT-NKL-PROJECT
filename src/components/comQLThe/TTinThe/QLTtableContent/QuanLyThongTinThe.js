import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import QLTTableContentThe from "./QLTTableContentThe";
import QLTTableContentItemThe from "../QLTtableItems/QLTTableContentItemThe";
import $ from "jquery";
import * as Config from "../../../../untils/Config";
import { Alert } from "bootstrap";
var JsonValue;
var ArrayValue = [];
var arrayValueModel = [];
var arrayValueProcess = [];
var load = [];
class QuanLyThongTinThe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentGetCardId: [],
      contentModel: [],
      contentProcess: [],
      contentTypeSelect: [],
      keyword: '',
      filter: {
        name: "",
        status: -1,
      },
      // value card
      valueCard: {
        Id: "",
        Employee: "",
        Color: "",
        RegistTime: null,
        Status: "",
        ProcessId: "",
        ModelId: "",
        Classify: "",
        RFID: "",
        CurrentRecode: "",
      },
    };
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase(),
    });
  };
  /*---------get thông tin thẻ---------*/
  componentDidMount = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Card",
      data: null,
    })
      .then((res) => {
        console.log(res.data);
        ArrayValue = []; // load lại data
        for (var i = 0; i < res.data.length; i++) {
          JsonValue = JSON.parse(res.data[i]);
          ArrayValue.push(JsonValue);
        }
        ArrayValue.sort().reverse(); // sort đảo mảng
        this.setState({
          contentItems: ArrayValue,
        });
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 300,
          paging: false,
        });
      })
      .catch((err) => {
        console.log("lỗi lấy thông tin thẻ");
        console.log(err);
      });
  };
  // hàm thay đổi giá trị
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState((preState) => ({
      valueCard: {
        ...preState.valueCard,
        [name]: value,
      },
    }));
    // gọi value của process
    var getValueTypeInModel = document.getElementById("idSelectProcess").value;
    // truyền value process để lấy type
    this.getValueTypeInModel(getValueTypeInModel);
    if (getValueTypeInModel != "") {
      document.getElementById("idSelectType").disabled = false;
    } else {
      document.getElementById("idSelectType").value = "";
      document.getElementById("idSelectType").disabled = true;
    }
  };

  getIDChange = (contentItem, nameEmp, nameProcess) => {
    var date = new Date();
    var dayCreate = date.valueOf();
    this.setState((preState) => ({
      // truyền giá trị vào valueCard
      valueCard: {
        ...preState.valueCard,
        Id: contentItem.Id, // cố định
        Employee: contentItem.Employee, // cố định
        Color: contentItem.Color,
        RegistTime: dayCreate,
        Status: contentItem.Status, // cố định
        ProcessId: contentItem.ProcessId,
        ModelId: "", // không dùng
        Classify: contentItem.Classify,
        RFID: contentItem.RFID, // cố định
        CurrentRecode: contentItem.CurrentRecode, // cố định
      },
    }));

    /*-------------gán giá trị cho pop edit---------------- */
    document.getElementById("idCard").value = contentItem.RFID;
    console.log(nameEmp);
    document.getElementById("idNameEml").value = nameEmp;
    document.getElementById("idNameCard").value = contentItem.Id;

    /*--------Lấy danh sách select process ------------------*/
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Process",
      data: null,
    })
      .then((resProcess) => {
        arrayValueProcess = [];
        for (var k in resProcess.data) {
          var Object = JSON.parse(resProcess.data[k]);
          if (Object.status == true) {
            arrayValueProcess.push(Object);
          }
        }
        this.setState({
          contentProcess: arrayValueProcess,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getIDDeleteChange = (idRFID) => {
    var notionDelete = window.confirm("Bạn có đồng ý xóa thẻ nào không?");
    if (notionDelete) {
      axios({
        method: "DELETE",
        url:
          `${Config.API_URL}` +
          "/api/data/key?token=" +
          `${Config.TOKEN}` +
          "&classify=Card&key=" +
          idRFID,
        data: null,
      })
        .then((res) => {
          this.LoadData();
        })
        .catch((err) => {});
    }
  };
  /*-------------hàm lấy type từ process ---------------------- */
  getValueTypeInModel = (idProcess) => {
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
        var arrayValueModel = [];
        var valueModel = res.data;
        for (var k in valueModel) {
          var valueObj = JSON.parse(valueModel[k]);
          if (idProcess === valueObj.ProcessId) {
            arrayValueModel.push(JSON.parse(valueModel[k]));
          }
        }
        this.setState({
          contentTypeSelect: arrayValueModel,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  /*-------------Hàm thêm thẻ vào công nhân------------- */
  createNewCard = (event) => {
    event.preventDefault();
    var { valueCard } = this.state;
    var stringValueCard = JSON.stringify(valueCard);
    console.log(valueCard);
    //--------------Thêm thẻ mới ---------------------
    axios({
      method: "PUT",
      url:
        `${Config.API_URL}` +
        "/api/data/key?token=" +
        `${Config.TOKEN}` +
        "&classify=Card&key=" +
        valueCard.RFID,
      data: {
        Value: stringValueCard,
      },
    })
      .then((res) => {
        alert("Thay đổi thông tin thẻ " + valueCard.Id + " thành công!");
        this.LoadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // --------------------load dữ liệu lại-------------------------
  dataTableLoad = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=Card",
      data: null,
    })
      .then((res) => {
        console.log(res.data);
        ArrayValue = []; // load lại data
        for (var i = 0; i < res.data.length; i++) {
          JsonValue = JSON.parse(res.data[i]);
          ArrayValue.push(JsonValue);
        }
        ArrayValue.sort().reverse(); // sort đảo mảng
        this.setState({
          contentItems: ArrayValue,
        });
      })
      .catch((err) => {
        console.log("lỗi lấy thông tin thẻ");
        console.log(err);
      });
  };
  LoadData = () => {
    this.setState({
      contentItems: load,
    });
    this.dataTableLoad();
  };
  /*------------------------------------- */
  render() {
    var { contentItems, contentProcess, contentTypeSelect, keyword } = this.state;
    if (keyword) {
      // render ra nội dung khi tìm kiếm
      contentItems = contentItems.filter((contentItems) => {
        return (
          contentItems.Id.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.Color.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.ProcessId.toLowerCase().indexOf(keyword) !== -1 ||
          contentItems.Classify.toLowerCase().indexOf(keyword) !== -1 
        );
      }); 
    }
    return (
      <div>
        <section className="content">
        <form className="filter-section form-inline">
          <div className="input-group inputSeach">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.LoadData}
            >
              Làm mới dữ liệu
            </button>
          </div>
          </form>
          {/*-----------------Giao diện table-------------------------------- */}
          <QLTTableContentThe onSearch={this.onSearch}>
            {this.showContentItems(contentItems)}
          </QLTTableContentThe>

          {/*-----------------giao diện chỉnh sửa thông tin thẻ----------------------*/}
          <div className="modal fade" id="modal-edit">
            <form onSubmit={this.createNewCard}>
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
                    <h4 className="modal-title">CHỈNH SỬA THÔNG TIN THẺ</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="usr">ID thẻ (chỉ xem)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="idCard"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="devices">
                        <h5>Tên công nhân: (chỉ xem)</h5>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="idNameEml"
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="usr">Tên thẻ</label>
                      <input
                        type="text"
                        className="form-control"
                        id="idNameCard"
                        name="Id"
                        required
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="area" id="areaDevice">
                        <h5> Công đoạn:</h5>
                      </label>
                      <select
                        className="form-control"
                        id="idSelectProcess"
                        required
                        name="ProcessId"
                        onChange={this.onChange}
                      >
                        <option value="">---Chọn công đoạn---</option>
                        {this.showContentSelectProcess(contentProcess)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="area" id="areaDevice">
                        <h5> Classify (Loại):</h5>
                      </label>
                      <select
                        className="form-control"
                        id="idSelectType"
                        required
                        name="Classify"
                        onChange={this.onChange}
                        disabled
                      >
                        <option value="null">---Chọn loại---</option>
                        {this.showContentSelect(contentTypeSelect)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="area" id="areaDevice">
                        <h5> Màu thẻ:</h5>
                      </label>
                      <select
                        className="form-control"
                        id="idSelectMauThe"
                        name="Color"
                        onChange={this.onChange}
                      >
                        <option value="null">---Chọn màu---</option>
                        <option value="Xanh">Xanh</option>
                        <option value="Đỏ">Đỏ</option>
                        <option value="Vàng">Vàng</option>
                        <option value="Đen">Đen</option>
                        <option value="Trằng">Trắng</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Lưu thay đổi
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
            </form>
          </div>
        </section>
      </div>
    );
  }
  // truyền data ra ngoài table
  showContentItems(contentItems) {
    var result = null;
    if (contentItems.length >= 0) {
      result = contentItems.map((contentItem, index) => {
        return (
          <QLTTableContentItemThe
            key={index}
            contentItem={contentItem}
            index={index}
            getIDChange={this.getIDChange}
            getIDDeleteChange={this.getIDDeleteChange}
          />
        );
      });
    }
    return result;
  }
  /*đổ dữ liệu process vào select */
  showContentSelect(contentModel) {
    var result = null;
    if (contentModel.length >= 0) {
      result = contentModel.map((contentItem, index) => {
        return (
          <option key={index} value={contentItem.Classify}>
            {contentItem.Classify}
          </option>
        );
      });
    }
    return result;
  }
  /*đổ dữ liệu process vào select */
  showContentSelectProcess(contentProcess) {
    var result = null;
    if (contentProcess.length >= 0) {
      result = contentProcess.map((contentItem, index) => {
        return (
          <option key={index} value={contentItem.Id}>
            {contentItem.Name}
          </option>
        );
      });
    }
    return result;
  }
}
export default QuanLyThongTinThe;
