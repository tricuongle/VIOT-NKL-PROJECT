import React, { Component } from "react";

class SearchThe extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  onSearch = () => {
    this.props.onSearch(this.state.keyword); // truyền ra ngoài
  };
  render() {
    var { keyword } = this.state;
    return <form className="filter-section form-inline"></form>;
  }
}
export default SearchThe;
