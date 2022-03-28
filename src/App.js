import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewStatus: false,
      activeItem: {
        nome: "",
        description: "",
        status: false
      },
      deviceList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("https://sei-ii-app.herokuapp.com/api/devices/")
      .then(res => this.setState({ deviceList: res.data }))
      .catch(err => console.log(err));
  };
  displayStatus = status => {
    if (status) {
      return this.setState({ viewStatus: true });
    }
    return this.setState({ viewStatus: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayStatus(true)}
          className={this.state.viewStatus ? "active" : ""}
        >
          ON
        </span>
        <span
          onClick={() => this.displayStatus(false)}
          className={this.state.viewStatus ? "" : "active"}
        >
          OFF
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewStatus } = this.state;
    const newItems = this.state.deviceList.filter(
      item => item.status === viewStatus
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`device-nome mr-2 ${
            this.state.viewStatus ? "status-device" : ""
          }`}
          title={item.description}
        >
          {item.nome}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`https://sei-ii-app.herokuapp.com/api/devices/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("https://sei-ii-app.herokuapp.com/api/devices/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`https://sei-ii-app.herokuapp.com/api/devices/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { nome: "", description: "", status: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-center my-4">IoT Devices</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add new device
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
