import React, { Component } from "react";

class SearchThe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
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
    return (
      <form className="filter-section form-inline">

        
        <div className="infoCard ">
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-View"
            id="id123"
          >
            Thêm thẻ
          </button>
        </div>
      </form>
    );
  }
}
export default SearchThe;
