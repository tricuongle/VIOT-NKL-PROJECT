import React, { Component } from "react";
import TongHop from "../../pages/TongHop";
import FilletVao from "../../pages/GiamSat/FilletVao";
import ThongKe from "../../pages/ThongKe";
import TinhTien from "../../pages/TinhTien";
import QuanLyTramCan from "../../pages/QuanLyTramCan";
import QuanLyKhuVuc from "../../pages/QuanLyKhuVuc";
import ChonMaCa from "../../pages/SanXuat/ChonMaCa";
import TaoMaCa from "../../pages/SanXuat/TaoMaCa";
import QuanLyCongDoan from "../../pages/QuanLyCongDoan";
import QuanLyThe from "../../pages/QuanLyThe";
import QuanLyCongNhan from "../../pages/QuanLyCongNhan";
import ManghinhSX01SuaCa from "../../pages/HienThiSanXuat/ManghinhSX01SuaCa";
import ManghinhSX02FilletXeBuom from "../../pages/HienThiSanXuat/ManghinhSX02FilletXeBuom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import $ from "jquery";
class Menu extends Component {

  render() {
    return (
      <Router >
        <div className="wrapper">
          <header className="main-header">
            <Link to="/Tong-hop" className="logo">
              <span className="logo-mini">
                <img src="../dist/img/Artboard-1iotvn.png" />
              </span>
              <span className="logo-lg">
                <img src="../dist/img/Artboard-1iotvn.png" />
              </span>
            </Link>
            <nav className="navbar navbar-static-top">
              <a
                className="sidebar-toggle"
                data-toggle="push-menu"
                role="button"
              >
                <span className="sr-only">Toggle navigation</span>
              </a>

              <div className="navbar-title">
                <span className="navbar-title-text"> VIOT SMART FACTORY </span>
                <br />
                <span>Giải pháp cho nhà máy chế biến thủy sản</span>
              </div>

              <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                  <li className="dropdown user user-menu">
                    <a className="dropdown-toggle" data-toggle="dropdown">
                      <img
                        src="../dist/img/Artboard-1iotvn.jpg"
                        className="user-image"
                        alt="User Image"
                      />
                      <span className="hidden-xs">Quản trị</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="user-header">
                        <img
                          src="../dist/img/Artboard-1iotvn.jpg"
                          className="img-circle"
                          alt="User Image"
                        />
                        <p>
                          Administrator
                          <small>Last Activity: May. 2020</small>
                        </p>
                      </li>
                      <li className="user-footer">
                        <div className="pull-left">
                          <a className="btn btn-default btn-flat">Hồ sơ</a>
                        </div>
                        <div className="pull-right">
                          <a className="btn btn-default btn-flat">Đăng xuất</a>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <aside className="main-sidebar">
            <section className="sidebar">
              <ul className="sidebar-menu" data-widget="tree">
                <li className="active">
                  <Link to="/Tong-hop" className="linkTo">
                    <i className="fa fa-dashboard"></i> <span>Tổng hợp</span>
                  </Link>
                </li>
                <li className="treeview">
                  <a>
                    <i className="fa fa-pie-chart"></i> <span>Giám sát</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="">
                      <Link to="/Fillet-vao">Fillet - vào</Link>
                    </li>
                    <li className="">
                      <a href="../giam-sat/fillet-ra.html">Fillet - ra</a>
                    </li>
                    <li className="">
                      <a href="../giam-sat/xe-buom-vao.html">Xẻ bướm - vào</a>
                    </li>
                    <li className="">
                      <a href="../giam-sat/xe-buom-ra.html">Xẻ bướm - ra</a>
                    </li>
                    <li className="">
                      <a href="../giam-sat/sua-ca-1.html">Sửa cá 1</a>
                    </li>
                    <li className="">
                      <a href="../giam-sat/sua-ca-2.html">Sửa cá 2</a>
                    </li>
                    <li className="">
                      <a href="../giam-sat/sua-ca-ra.html">Sửa cá - ra</a>
                    </li>
                    <li className="">
                      <a href="../giam-sat/sua-ca-phan-size.html">
                        Sửa cá - phân size
                      </a>
                    </li>
                    <li className="">
                      <a href="../giam-sat/phu-pham-ban.html">Phụ phẩm - bán</a>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <Link to="/Thong-ke" className="linkTo">
                    <i className="fa fa-calendar"></i>
                    <span>Thống kê</span>
                  </Link>
                </li>
                <li className="treeview">
                  <a>
                    <i className="fa fa-pie-chart"></i> <span>Sản xuất</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="">
                      <Link to="/Chon-ma-ca">Chọn mã cá</Link>
                    </li>
                    <li className="">
                      <Link to="/Tao-ma-ca">Tạo mã cá</Link>
                    </li>
                  </ul>
                </li>
                <li className="treeview">
                  <a>
                    <i className="fa fa-industry" aria-hidden="true"></i>
                    <span>Andon</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="">
                      <Link to="/Mang-hinh-SX-01-Sua-Ca">Sửa cá</Link>
                    </li>
                    <li className="">
                      <Link to="/Mang-hinh-SX-02-Fillet-Xe-Buom">
                        Fillet-xẻ bướm
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <Link to="/Tinh-tien">
                    <i className="fa fa-money" aria-hidden="true"></i>
                    <span>Tính tiền</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/Quan-ly-the">
                    <i className="fa fa-address-card-o" aria-hidden="true"></i>
                    <span>Quản lý thẻ</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/Quan-ly-cong-doan">
                    <i className="fa fa-id-card-o" aria-hidden="true"></i>
                    <span>Quản lý công đoạn</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/Quan-Ly-Khu-Vuc">
                    <i className="fa fa fa-tasks" aria-hidden="true"></i>
                    <span>Quản lý khu vực</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/Quan-Ly-Tram-Can">
                    <i className="fa fa-balance-scale" aria-hidden="true"></i>
                    <span>Quản lý trạm cân</span>
                  </Link>
                </li>
                <li className="">
                  <Link  to="/Quan-ly-cong-nhan" >
                    <i className="fa fa-user-circle"></i>
                    Quản lý công nhân
                  </Link>
                </li>
                <li className="">
                  <a>
                    <i className="fa fa-users"></i> <span>Access controll</span>
                  </a>
                </li>
                <li className="">
                  <a>
                    <i className="fa fa-cogs"></i>
                    <span>Cấu hình thiết bị</span>
                  </a>
                </li>
                <li className="treeview">
                  <a>
                    <i className="fa fa-info-circle"></i> <span>Liên hệ</span>
                  </a>
                </li>
              </ul>
            </section>
          </aside>
        </div>

        <Route path="/Tong-hop" exact component={tongHop} />
        <Route path="/Fillet-vao" exact component={filletVao} />
        <Route path="/Thong-ke" exact component={thongKe} />
        <Route path="/Tinh-tien" exact component={tinhTien} />
        <Route path="/Quan-Ly-Tram-Can" exact component={quanLyTramCan} />
        <Route path="/Quan-Ly-Khu-Vuc" exact component={quanLyKhuVuc} />
        <Route path="/Chon-ma-ca" exact component={chonMaCa} />
        <Route path="/Tao-ma-ca" exact component={taoMaCa} />
        <Route
          path="/Mang-hinh-SX-01-Sua-Ca"
          exact
          component={mangHinhSX01SuaCa}
        />
        <Route
          path="/Mang-hinh-SX-02-Fillet-Xe-Buom"
          exact
          component={manghinhSX02FilletXeBuom}
        />
        <Route path="/Quan-ly-cong-doan" exact component={quanLyCongDoan} />
        <Route path="/Quan-ly-the" exact component={quanLyThe} />
        <Route path="/Quan-ly-cong-nhan" exact component={quanLyCongNhan} />
      </Router>
    );
  }
}
const tongHop = () => {
  return <TongHop />;
};
const filletVao = () => {
  return <FilletVao />;
};
const thongKe = () => {
  return <ThongKe />;
};
const tinhTien = () => {
  return <TinhTien />;
};
const quanLyThe = () => {
  return <QuanLyThe />;
};
const quanLyCongDoan = () => {
  return <QuanLyCongDoan />;
};

const quanLyTramCan = () => {
  return <QuanLyTramCan />;
};
const quanLyKhuVuc = () => {
  return <QuanLyKhuVuc />;
};
const chonMaCa = () => {
  return <ChonMaCa />;
};
const taoMaCa = () => {
  return <TaoMaCa />;
};
const mangHinhSX01SuaCa = () => {
  return <ManghinhSX01SuaCa />;
};
const manghinhSX02FilletXeBuom = () => {
  return <ManghinhSX02FilletXeBuom />;
};
const quanLyCongNhan = () => {
  return <QuanLyCongNhan />;
};

export default Menu;
