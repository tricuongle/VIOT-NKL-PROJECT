import React, { Component } from "react";

class SearchCongNhan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      filterStatus: -1,
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyword); // truyền ra ngoài
  };
  render() {
    var { keyword, filterStatus } = this.state;
    return (
      <form className="filter-section form-inline">
        
        {/*<div className="filterStatus">
          <select
            name="filterStatus"
            id="input"
            className="form-control"
            value={filterStatus}
            onChange={this.onChange}
          >
            <option value={-1}>Tất cả</option>
            <option value={0}>nghỉ việc</option>
            <option value={1}>đang làm</option>
          </select>
        </div> */}
        {/*
        <div className="input-group inputSeach">
          <input
            name="keyword"
            type="text"
            className="form-control"
            placeholder="tìm kiếm"
            value={keyword}
            onChange={this.onChange}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSearch}
            >
              Tìm kiếm
            </button>
          </span>
        </div>*/}
      </form>
    );
  }
}
export default SearchCongNhan;
