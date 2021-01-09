import React, { Component, useState } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
import QLTTableContentItemCongNhan from "../QLTableItems/QLTTableContentItemCongNhan";
import QLTTableContentCongNhan from "./QLTTableContentCongNhan";
import QLTTableContentNewCard from "./QLTTableContentNewCard";
import QLTTableContentItemNewCard from "../QLTableItems/QLTTableContentItemNewCard";
import * as Config from "../../../../untils/Config";
import $, { data } from "jquery";
var JsonValue;
var ArrayValue = [];
var load = [];
class QuanLyThongTinCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
      contentItemsSortMax: [],
      contentItemss: [],
      contentNewCard: [],
      contentEmployee: [],
      keyword: "",
      status: 1,
      idNewCard: "",
      nameCard: "",
      contentGetTableEmp: {
        idNameEmp: "",
        colorCard: "",
        idProcess: "",
        typeModel: "",
        status: "",
      },
    };
  }
  // input tìm kiếm thông tin nhân viên
  // nhân dữ liệu từ con
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase(),
    });
  };

  componentDidMount = () => {
    /*------------Lấy danh sách Newcard ---------------- */
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=NewCard",
      data: null,
    })
      .then((res) => {
        var valueNewCard = res.data;
        var arrayNewCard = [];
        for (var k = 0; k < valueNewCard.length; k++) {
          var ObjValueNewCard = JSON.parse(valueNewCard[k]);
          arrayNewCard.push(ObjValueNewCard);
        }
        arrayNewCard.sort().reverse(); // sort đảo mảng
        this.setState({
          contentNewCard: arrayNewCard,
        });
        $("#tableData").DataTable({
          searching: false,
          ordering: false,
          dom: "Bfrtip",
          scrollX: true,
          scrollY: 150,
        });
      })

      .catch((err) => {
        console.log(err);
      });
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
        for (var i = 0; i < res.data.length; i++) {
          JsonValue = JSON.parse(res.data[i]);
          if (JsonValue.IsLock == true) {
            ArrayValue.push(JsonValue);
          }
        }
        this.setState({
          contentItems: ArrayValue,
          contentItemsSortMax: ArrayValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*-----------hàm nhận value newCard từ table newCard và lưu vào state----------------- */
  OnGetValueColorProcessType = (idNameEmp, status, color, idProcess, Type) => {
    this.createNameCard();
    this.setState((preState) => ({
      contentGetTableEmp: {
        ...preState.contentGetTableEmp,
        idNameEmp: idNameEmp,
        colorCard: color,
        idProcess: idProcess,
        typeModel: Type,
        status: status,
      },
    }));
  };
  /*-------------tạo name card tự động ----------------- */
  createNameCard = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data?token=" +
        `${Config.TOKEN}` +
        "&Classify=Card",
      data: null,
    })
      .then((res) => {
        var count = res.data.length + 1;
        var nameCard = "Thẻ số 0" + count;
        this.setState({
          nameCard: nameCard,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*-------------Hàm thêm thẻ vào công nhân------------- */
  createNewCard = (idNewCard) => {
    var { contentGetTableEmp, nameCard } = this.state;
    var date = new Date();
    var dateNew = date.valueOf();
    console.log(contentGetTableEmp.status);
    if (
      contentGetTableEmp.idNameEmp == "" ||
      //contentGetTableEmp.colorCard == "" ||
      contentGetTableEmp.idProcess == "" ||
      // contentGetTableEmp.typeModel == "" ||
      contentGetTableEmp.status == false
    ) {
      alert("Vui lòng chọn đầy đủ thông tin, hoặc công nhân đã nghỉ!");
    } else {
      var valueCard =
        '{"Id":"' +
        nameCard +
        '","Employee":"' +
        contentGetTableEmp.idNameEmp +
        '","Color":"' +
        contentGetTableEmp.colorCard +
        '","RegistTime":' +
        dateNew +
        ',"Status":"Release","ProcessId":"' +
        contentGetTableEmp.idProcess +
        '","ModelId":"","Classify":"' +
        contentGetTableEmp.typeModel +
        '","RFID":"' +
        idNewCard +
        '","CurrentRecord":""}';
      //--------------Thêm thẻ mới ---------------------
      axios({
        method: "POST",
        url: `${Config.API_URL}` + "/api/data?token=" + `${Config.TOKEN}`,
        data: {
          Key: idNewCard,
          Classify: "Card",
          Value: valueCard,
          Description: "Card Ngọc Kim Loan",
        },
      }).then((res) => {
        alert("Gán thẻ RFID " + nameCard + " vào nhân viên thành công!");
        //--------Xóa thẻ RFID ở table newCard -----------
        axios({
          method: "DELETE",
          url:
            `${Config.API_URL}` +
            "/api/data/key?token=" +
            `${Config.TOKEN}` +
            "&classify=NewCard&key=" +
            idNewCard,
          data: null,
        })
          .then((res) => {
            console.log("Xóa thẻ RFID ở NewCard thành công!");
            this.LoadData();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  // hàm nhân id NewCard và  goi hàm tạo card mới và xóa thẻ RFID newCard.
  getValueNewCard = (idNewCard) => {
    this.setState({
      idNewCard: idNewCard,
    });
    var CreateRFIDNewEmp = window.confirm(
      "Gán công nhân vào thẻ RFID " + idNewCard + " này?"
    );
    if (CreateRFIDNewEmp) {
      this.createNewCard(idNewCard);
    }
  };
  deleteRFID = (idNewCard) => {
    var DeleteRFIDNewCard = window.confirm(
      "Bạn có đồng ý xóa thông tin thẻ RFID " + idNewCard + " này không?"
    );
    if (DeleteRFIDNewCard) {
      this.onDeleteNewCardRFID(idNewCard);
    }
  };

  onDeleteNewCardRFID = (idNewCardRFID) => {
    //--------Xóa thẻ RFID ở table newCard -----------
    axios({
      method: "DELETE",
      url:
        `${Config.API_URL}` +
        "/api/data/key?token=" +
        `${Config.TOKEN}` +
        "&classify=NewCard&key=" +
        idNewCardRFID,
      data: null,
    })
      .then((res) => {
        this.LoadData();
        console.log("Xóa thẻ RFID thành công!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteAllNewCard = () => {
    var DeleteRFIDNewCard = window.confirm(
      "Bạn có đồng ý xóa tất cả thông tin thẻ RFID  đã quét không?"
    );
    if (DeleteRFIDNewCard) {
      axios({
        method: "DELETE",
        url:
          `${Config.API_URL}` +
          "/api/data/classify?token=" +
          `${Config.TOKEN}` +
          "&classify=NewCard",
        data: null,
      })
        .then((res) => {
          console.log("Xóa all thẻ RFID thành công!");
          this.LoadData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // --------------------load dữ liệu lại-------------------------
  dataTableLoad = () => {
    axios({
      method: "GET",
      url:
        `${Config.API_URL}` +
        "/api/data/Values?token=" +
        `${Config.TOKEN}` +
        "&Classify=NewCard",
      data: null,
    })
      .then((res) => {
        var valueNewCard = res.data;
        var arrayNewCard = [];
        for (var k = 0; k < valueNewCard.length; k++) {
          var ObjValueNewCard = JSON.parse(valueNewCard[k]);
          arrayNewCard.push(ObjValueNewCard);
        }
        arrayNewCard.sort().reverse(); // sort đảo mảng
        this.setState({
          contentNewCard: arrayNewCard,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  LoadData = () => {
    this.setState({
      contentNewCard: load,
    });
    this.dataTableLoad();
  };
  HoanVi = (a, b) => {
    var temp;
    temp = a;
    a = b;
    b = temp;
  };
  /*------------------------------------- */
  render() {
    //setTimeout(this.componentDidMount,500);
    var {
      contentItemss,
      contentItems,
      contentItemsSortMax,
      keyword,
      status,
      contentNewCard,
      idNewCard,
    } = this.state;
    // hàm xử lý tìm kiếm công nhân
    if (keyword) {
      // chuyển cardNo về kiểu int để sort
      for (var g in contentItemsSortMax) {
        contentItemsSortMax[g].CardNo = parseInt(contentItemsSortMax[g].CardNo);
      }
      // xếp mảng theo tăng dần
      var temp;
      for (var i = 0; i < contentItemsSortMax.length; i++) {
        for (var j = i + 1; j < contentItemsSortMax.length; j++) {
          if (contentItemsSortMax[i].CardNo < contentItemsSortMax[j].CardNo) {
            temp = contentItemsSortMax[i];
            contentItemsSortMax[i] = contentItemsSortMax[j];
            contentItemsSortMax[j] = temp;
          }
        }
      }
      // chuyển cardNo về kiêu string để tìm kiếm
      for (var g in contentItemsSortMax) {
        contentItemsSortMax[g].CardNo = contentItemsSortMax[g].CardNo + "";
      }
      console.log(contentItemsSortMax);
      contentItemss = contentItemsSortMax.filter((contentItemsSortMax) => {
        return (
          //contentItemsSortMax.Id.toLowerCase().indexOf(keyword) !== -1 ||
          contentItemsSortMax.Name.toLowerCase().indexOf(keyword) !== -1 ||
          //contentItemsSortMax.CMND.toLowerCase().indexOf(keyword) !== -1 ||
          contentItemsSortMax.CardNo.toLowerCase().indexOf(keyword) !== -1
        );
      });
      contentItemsSortMax = contentItemsSortMax.filter((contentItemsSortMax) => {
        if (status === -1) {
          return contentItemsSortMax;
        } else {
          return contentItemsSortMax.IsLock === (status === 1 ? true : false);
        }
      });
    }

    return (
      <div>
        <section className="content">
          <form className="filter-section form-inline">
            <div className="input-group inputSeach">
              <button
                type="button"
                className="btn btn-danger"
                id="btnThem"
                onClick={this.deleteAllNewCard}
              >
                Xóa tất cả thẻ RFID đã quét
              </button>
            </div>
            <div className="input-group inputSeach">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.LoadData}
              >
                Làm mới dữ liệu
              </button>
            </div>
          </form>

          {/*đổ dữ liệu Newcard vào talbe NewCard */}
          <QLTTableContentNewCard>
            {this.showContentItemsNewCard(contentNewCard)}
          </QLTTableContentNewCard>

          {/*đổ dữ liệu công nhân sau khi tìm kiếm vào talbe */}
          <p>
            Gợi ý: Tìm công nhân, gõ họ tên, hoặc số thẻ nhân viên, sau đó
            chọn thông tin cần thiết vd: Nếu mã CN = 01 gõ 1 để tìm.
          </p>
          <QLTTableContentCongNhan onSearch={this.onSearch}>
            {this.showContentItems(contentItemss)}
          </QLTTableContentCongNhan>
        </section>
      </div>
    );
  }
  // hiện thị lên table
  showContentItems(contentItemss) {
    contentItemss.sort().reverse(); // sort đảo mảng
    var result = null;
    if ((contentItemss.length = 1)) {
      result = contentItemss.map((contentItem, index) => {
        return (
          <QLTTableContentItemCongNhan
            key={index}
            contentItem={contentItem}
            OnGetValueColorProcessType={this.OnGetValueColorProcessType}
          />
        );
      });
    }
    return result;
  }
  // hiện thị lên table
  showContentItemsNewCard(contentNewCard) {
    var result = null;
    if (contentNewCard.length >= 0) {
      result = contentNewCard.map((contentItem, index) => {
        return (
          <QLTTableContentItemNewCard
            key={index}
            index={index}
            contentItem={contentItem}
            getValueNewCard={this.getValueNewCard}
            deleteRFID={this.deleteRFID}
          />
        );
      });
    }
    return result;
  }
}
export default QuanLyThongTinCongNhan;
