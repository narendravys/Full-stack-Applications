import axios from "axios";
import { Trash } from 'bootstrap-icons/react-icons';
import React, { Component } from "react";


class TdlistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdlists: [],
      newTodo: "",
    };
  }

  loadTdlists() {
    axios
      .get("http://localhost:5000/api/version1/tdlists")
      .then((res) => {
        this.setState({ tdlists: res.data });
      })
      .catch((error) => console.log(error));
  }

  createTodo = () => {
        debugger
    if (this.state.newTodo.trim() !== "") {
      const newTodo = { title: this.state.newTodo, completed: false };
      debugger
      axios
        .post("http://localhost:5000/api/version1/tdlists", newTodo, { withCredentials: true })
        .then((res) => {
          console.log("Todo created successfully:", res.data);
        })
        .catch((error) => console.log("Error creating todo:", error));

      this.setState((prevState) => ({
        tdlists: [...prevState.tdlists, newTodo],
        newTodo: "",
      }));
    }
  };

  deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/version1/tdlists/${id}`)
      .then((res) => {
        console.log("Todo deleted successfully:", res.data);
      })
      .catch((error) => console.log("Error deleting todo:", error));

    this.setState((prevState) => ({
      tdlists: prevState.tdlists.filter((todo) => todo.id !== id),
    }));
  };

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  componentDidMount() {
    this.loadTdlists();
  }

  render() {
    return (
      <div>
        <div className="taskContainer">
          <input
            className="newTask"
            type="text"
            placeholder="Input a New Task"
            maxLength="75"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
          />
          <div className="text-center">
          <button className="btn btn-success mb-3 mt-1"onClick={this.createTodo}>
            Create Todo
          </button>
          </div>
        </div>
        <div className="wrapItems my-3 ms-2 border border-dark">
          <ul className="listItems">
            {this.state.tdlists.map((tdlist) => (
              <li className="item" key={tdlist.id}>
                <input className="itemCheckbox ms-3 my-3" type="checkbox" />
                <label className="itemDisplay">{tdlist.title}</label>
                <button
                  onClick={() => this.deleteTodo(tdlist.id)}
                >
                  <Trash color="red" size={24} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TdlistsContainer;
