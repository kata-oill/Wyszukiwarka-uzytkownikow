class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const {
      searchText
    } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url).then(response => response.json()).then(responseJson => this.setState({
      users: responseJson.items
    }));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      onSubmit: event => this.onSubmit(event)
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "searchText"
    }, "Search by user name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "searchText",
      onChange: event => this.onChangeHandle(event),
      value: this.state.searchText
    })), /*#__PURE__*/React.createElement(UsersList, {
      users: this.state.users
    }));
  }

}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => /*#__PURE__*/React.createElement(User, {
      key: user.id,
      user: user
    }));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, this.users);
  }

}

class User extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      src: this.props.user.avatar_url,
      style: {
        maxWidth: '100px'
      }
    }), /*#__PURE__*/React.createElement("a", {
      href: this.props.user.html_url,
      target: "_blank"
    }, this.props.user.login));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
