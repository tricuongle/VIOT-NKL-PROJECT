import React, { Component } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import TableContentTaoMaCa from "../../components/comSanXuat/comTaoMaCa/tableContentChonMaCa/TableContentTaoMaCa";

class TaoMaCa extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>TẠO MÃ CÁ</h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
              </a>
            </li>
            <li className="active">Tạo mã cá</li>
          </ol>
        </section>
        <section className="content">
          <form className="filter-section form-inline">
            <div className="infoCard ">
              <button
                type="button"
                className="btn btn-primary card card-primary card-outline container-fluid"
                data-toggle="modal"
                data-target="#modal-create"
                id="id123"
              >
                Thêm mã cá
              </button>
            </div>
          </form>
          <TableContentTaoMaCa></TableContentTaoMaCa>
          <div className="modal fade" id="modal-create">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header ">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                  <h4 className="modal-title ">Tạo mới mã cá</h4>
                </div>
                <div className="modal-body">
                  <div className="tenMaCa form-group">
                    <label htmlFor="devices">
                      <h5>ID mã cá: </h5>
                    </label>
                    <br />
                    <input type="text" className="  form-control " />
                  </div>
                  <div className="tenMaCa form-group">
                    <label htmlFor="devices">
                      <h5>Tên mã cá: </h5>
                    </label>
                    <br />
                    <input type="text" className="  form-control " />
                  </div>
                  <div className="form-group">
                    <div className="themDinhGia-group">
                      <div className="tenDinhGia">
                        <label>
                          <h5>Tên định giá </h5>
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          required="required"
                        />
                      </div>
                      <div className="khoiLuongMaCa">
                        <label>
                          <h5>Khối lượng rổ (Kg) </h5>
                        </label>
                        <br />
                        <input
                          type="number"
                          className="form-control"
                          min="0.1"
                          required="required"
                        />
                      </div>
                      <div className="dinhGiaMaCa">
                        <label>
                          <h5>Định giá (Vnđ) </h5>
                        </label>
                        <br />
                        <input
                          type="number"
                          min="1000"
                          className="form-control"
                        />
                      </div>
                      <br />
                      <button
                        type="button"
                        className="btn btn-large   btn-primary btnThemDonGia "
                      >
                        Thêm
                      </button>
                    </div>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Tên định giá</th>
                          <th>Khối lượng rổ (KG)</th>
                          <th>Đơn giá (VNĐ)</th>
                          <th>Sửa/xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Rổ abc</td>
                          <td>5</td>
                          <td>23000</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary "
                              data-toggle="modal"
                              data-target="#modal-Delete"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btnXoaDinhMuc"
                              data-toggle="modal"
                              data-target="#modal-Delete"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    Tạo mới
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
          <div className="modal fade" id="modal-edit">
          <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header ">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                  <h4 className="modal-title ">Tạo mới mã cá</h4>
                </div>
                <div className="modal-body">
                  <div className="tenMaCa form-group">
                    <label htmlFor="devices">
                      <h5>ID mã cá: </h5>
                    </label>
                    <br />
                    <input type="text" className="  form-control " disabled />
                  </div>
                  <div className="tenMaCa form-group">
                    <label htmlFor="devices">
                      <h5>Tên mã cá: </h5>
                    </label>
                    <br />
                    <input type="text" className="  form-control " disabled/>
                  </div>
                  <div className="form-group">
                    <div className="themDinhGia-group">
                      <div className="tenDinhGia">
                        <label>
                          <h5>Tên định giá </h5>
                        </label>
                        <br />
                        <input
                          type="text"
                          className="form-control"
                          required="required"
                        />
                      </div>
                      <div className="khoiLuongMaCa">
                        <label>
                          <h5>Khối lượng rổ (Kg) </h5>
                        </label>
                        <br />
                        <input
                          type="number"
                          className="form-control"
                          min="0.1"
                          required="required"
                        />
                      </div>
                      <div className="dinhGiaMaCa">
                        <label>
                          <h5>Định giá (Vnđ) </h5>
                        </label>
                        <br />
                        <input
                          type="number"
                          min="1000"
                          className="form-control"
                        />
                      </div>
                      <br />
                      <button
                        type="button"
                        className="btn btn-large   btn-primary btnThemDonGia "
                      >
                        Thêm
                      </button>
                    </div>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Tên định giá</th>
                          <th>Khối lượng rổ (KG)</th>
                          <th>Đơn giá (VNĐ)</th>
                          <th>Sửa/xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Rổ abc</td>
                          <td>5</td>
                          <td>23000</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary "
                              data-toggle="modal"
                              data-target="#modal-Delete"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btnXoaDinhMuc"
                              data-toggle="modal"
                              data-target="#modal-Delete"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    Sửa mã cá
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
                  <h4 className="modal-title">Xóa mã cá</h4>
                </div>
                <div className="modal-body">
                  <h5>Cảnh báo! Bạn có đồng ý xóa mã cá này không?</h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    Xóa mã cá
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
}
export default TaoMaCa;
