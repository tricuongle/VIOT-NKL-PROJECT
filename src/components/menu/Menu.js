import React, { Component } from "react";
import TongHop from "../../pages/TongHop";
import FilletVao from "../../pages/GiamSat/FilletVao";
import ThongKe from "../../pages/ThongKe";
import TinhTien from "../../pages/TinhTien";
import QuanLyTramCan from "../../pages/QuanLyTramCan";
import QuanLyCongDoann from "../../pages/QuanLyCongDoann";
import ChonMaCa from "../../pages/SanXuat/ChonMaCa";
import TaoMaCa from "../../pages/SanXuat/TaoMaCa";
import QuanLyMaCa from "../../pages/QuanLyMaCa";
import QuanLyThe from "../../pages/QuanLyThe/QuanLyThe";
import QuanLyCongNhan from "../../pages/QuanLyCongNhan";
import ManghinhSX01SuaCa from "../../pages/HienThiSanXuat/ManghinhSX01SuaCa";
import ManghinhSX02FilletXeBuom from "../../pages/HienThiSanXuat/ManghinhSX02FilletXeBuom";
import ThemThe from "../../pages/QuanLyThe/ThemThe";
import DinhMuc from "../../pages/SanXuat/DinhMuc";
import RawData from "../../pages/RawData";
import LogContentQLCongNhan from "../../pages/HistoryLog/LogQLCongNhan/LogContentQLCongNhan";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogContentQLTramCan from "../../pages/HistoryLog/LogQLTramCan/LogContentQLTramCan";
import LogContentQLCongDoan from "../../pages/HistoryLog/LogQLCongDoan/LogContentQLCongDoan";
import LogContentQLThe from "../../pages/HistoryLog/LogQLThe/LogContentQLThe";
import LogContentQLMaCa from "../../pages/HistoryLog/LogQLMaCa/LogContentQLMaCa";
import LogContentQLDinhMuc from "../../pages/HistoryLog/LogQLDinhMuc/LogContentQLDinhMuc";

class Menu extends Component {
  render() {
    return (
      <Router>
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
                <li className="">
                  <Link to="/Tong-hop" className="linkTo">
                    <i className="fa fa-cubes" aria-hidden="true"></i>{" "}
                    <span>Tổng hợp</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/Raw-data" className="linkTo">
                    <i className="fa fa-dashboard"></i> <span>Raw data</span>
                  </Link>
                </li>

                <li className="">
                  <Link to="/Thong-ke" className="linkTo">
                    <i className="fa fa-calendar"></i>
                    <span>Thống kê</span>
                  </Link>
                </li>
                <li className="treeview">
                  <a>
                    <i className="fa fa-pie-chart"></i>{" "}
                    <span>Quản lý mã cá</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    {/*<li className="">
                      <Link to="/Chon-ma-ca">Chọn mã cá</Link>
                    </li>*/}
                    <li className="">
                      <Link to="/Quan-ly-ma-ca">Tạo mã cá</Link>
                    </li>
                    <li className="">
                      <Link to="/Dinh-muc-ma-ca">Tạo định mức giá mã cá</Link>
                    </li>
                  </ul>
                </li>
                {/*<li className="">
                  <Link to="/Tinh-tien">
                    <i className="fa fa-money" aria-hidden="true"></i>
                    <span>Tính tiền</span>
                  </Link>
                  </li>*/}

                <li className="treeview">
                  <a>
                    <i className="fa fa-industry" aria-hidden="true"></i>
                    <span>Quản lý thẻ</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="">
                      <Link to="/Them-the">Tra cứu-Thêm thẻ</Link>
                    </li>
                    <li className="">
                      <Link to="/Quan-ly-the">Danh sách thẻ</Link>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <Link to="/Quan-Ly-cong-doann">
                    <i className="fa fa fa-tasks" aria-hidden="true"></i>
                    <span>Quản lý công đoạn</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/Quan-Ly-Tram-Can">
                    <i className="fa fa-balance-scale" aria-hidden="true"></i>
                    <span>Quản lý trạm cân</span>
                  </Link>
                </li>

                <li className="">
                  <Link to="/Quan-ly-cong-nhan">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                    <span> Quản lý công nhân </span>
                  </Link>
                </li>

                <li className="treeview">
                  <a>
                    <i className="fa fa-history" aria-hidden="true"></i>{" "}
                    <span>Lịch sử Log</span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-left pull-right"></i>
                    </span>
                  </a>
                  <ul className="treeview-menu">
                    <li className="">
                      <Link to="/Log-Quan-ly-Ma-Ca">Quản lý mã cá</Link>
                    </li>
                    <li className="">
                      <Link to="/Log-Quan-ly-Dinh-Muc">Quản lý định mức</Link>
                    </li>
                    <li className="">
                      <Link to="/Log-Quan-ly-The">Quản lý thẻ</Link>
                    </li>
                    <li className="">
                      <Link to="/Log-Quan-ly-Cong-Doan">Quản lý công đoạn</Link>
                    </li>
                    <li className="">
                      <Link to="/Log-Quan-ly-Can">Quản lý trạm cân</Link>
                    </li>
                    <li className="">
                      <Link to="/Log-Quan-ly-Cn">Quản lý công nhân</Link>
                    </li>
                  </ul>
                </li>
                {/*
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
                </li>*/}
              </ul>
            </section>
          </aside>
        </div>

        <Route path="/Tong-hop" exact component={tongHop} />
        <Route path="/Fillet-vao" exact component={filletVao} />
        <Route path="/Thong-ke" exact component={thongKe} />
        <Route path="/Tinh-tien" exact component={tinhTien} />
        <Route path="/Quan-Ly-Tram-Can" exact component={quanLyTramCan} />
        <Route path="/Quan-Ly-cong-doann" exact component={quanLyCongDoann} />
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
        <Route path="/Quan-ly-ma-ca" exact component={quanLyMaCa} />
        <Route path="/Quan-ly-the" exact component={quanLyThe} />
        <Route path="/Them-the" exact component={themThe} />
        <Route path="/Quan-ly-cong-nhan" exact component={quanLyCongNhan} />
        <Route path="/Dinh-muc-ma-ca" exact component={dinhMuc} />
        <Route path="/Raw-data" exact component={rawData} />
        <Route path="/Log-Quan-ly-Cn" exact component={logContentQLCongNhan} />
        <Route path="/Log-Quan-ly-Can" exact component={logContentQLTramCan} />
        <Route path="/Log-Quan-ly-Cong-Doan" exact component={logContentQLCongDoan} />
        <Route path="/Log-Quan-ly-The" exact component={logContentQLThe} />
        <Route path="/Log-Quan-ly-Ma-Ca" exact component={logContentQLMaCa} />
        <Route path="/Log-Quan-ly-Dinh-Muc" exact component={logContentQLDinhMuc} />
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
const quanLyMaCa = () => {
  return <QuanLyMaCa />;
};

const quanLyTramCan = () => {
  return <QuanLyTramCan />;
};
const quanLyCongDoann = () => {
  return <QuanLyCongDoann />;
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
const themThe = () => {
  return <ThemThe />;
};
const dinhMuc = () => {
  return <DinhMuc />;
};
const rawData = () => {
  return <RawData />;
};
const logContentQLCongNhan = () => {
  return <LogContentQLCongNhan />;
};
const logContentQLTramCan = () => {
  return <LogContentQLTramCan />;
};
const logContentQLCongDoan = () => {
  return <LogContentQLCongDoan />;
};
const logContentQLThe = () => {
  return <LogContentQLThe />;
};
const logContentQLMaCa= () => {
  return <LogContentQLMaCa />;
};
const logContentQLDinhMuc= () => {
  return <LogContentQLDinhMuc />;
};
export default Menu;
