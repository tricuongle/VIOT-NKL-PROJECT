import "./App.css";
import React, { Component } from "react";
import Menu from "./components/menu/Menu";
class App extends Component {
  render() {
    return (
      <div>
        <Menu></Menu>

        <footer className="main-footer">
          <strong>
            Copyright &copy;2020{" "}
            <a href="https://iotvn.vn/">VIOT</a>.{' '}
          </strong>
           All rights reserved.
        </footer>
      </div>
    );
  }
}
export default App;
