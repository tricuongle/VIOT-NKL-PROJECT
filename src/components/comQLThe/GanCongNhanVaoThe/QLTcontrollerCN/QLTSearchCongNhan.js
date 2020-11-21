import React, { Component } from "react";

class QLTSearchCongNhan extends Component {
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

        <div className="input-group inputSeach">
          <input
            name="keyword"
            type="text"
            className="form-control"
            placeholder="tìm kiếm công nhân"
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
        </div>
        <div className="infoCard ">
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-View"
            id="id123"
          >
            Gán công nhân vào thẻ
          </button>
        </div>
        <div className="infoCard ">
          <button
            type="button"
            className="btn btn-primary card card-primary card-outline container-fluid"
            data-toggle="modal"
            data-target="#modal-View"
            id="id123"
          >
            Bỏ gán thẻ
          </button>
        </div>
      </form>
    );
  }
}
export default QLTSearchCongNhan;
