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

var JsonValue;
var ArrayValue = [];

class QuanLyThongTinCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentItems: [],
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
        status: '',
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
        this.setState({
          contentNewCard: arrayNewCard,
        });
        console.log(this.state.contentNewCard);
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
          ArrayValue.push(JsonValue);
        }
        this.setState({
          contentItems: ArrayValue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  reloadTableNewCard = () => {
    setTimeout(this.componentDidMount, 500);
  };
  /*-----------hàm nhận value newCard từ table newCard và lưu vào state----------------- */
  OnGetValueColorProcessType = (idNameEmp,status , color, idProcess, Type) => {
    console.log(status);
    this.createNameCard();
    this.setState((preState) => ({
      contentGetTableEmp: {
        ...preState.contentGetTableEmp,
        idNameEmp: idNameEmp,
        colorCard: color,
        idProcess: idProcess,
        typeModel: Type,
        status: status
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
      contentGetTableEmp.colorCard == "" ||
      contentGetTableEmp.idProcess == "" ||
      contentGetTableEmp.typeModel == "" ||
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
        '","CurrentRecode":""}';
      console.log(valueCard);
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
            this.reloadTableNewCard();
            console.log("Xóa thẻ RFID ở NewCard thành công!");
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
        setTimeout(this.componentDidMount, 500);
        console.log("Xóa thẻ RFID thành công!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteAllNewCard=()=>{
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
          setTimeout(this.componentDidMount, 500);
          console.log("Xóa thẻ RFID thành công!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    //setTimeout(this.componentDidMount,500);
    var {
      contentItemss,
      contentItems,
      keyword,
      status,
      contentNewCard,
      idNewCard,
    } = this.state;
    // hàm xử lý tìm kiếm công nhân
    if (keyword) {
      // render ra nội dung khi tìm kiếm
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
                onClick={this.reloadTableNewCard}
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
            Gợi ý: Gõ họ tên, hoặc số CMND để tìm công nhân,
            <br /> sau đó chọn thông tin cần thiết.
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
