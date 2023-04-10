import { ImSearch } from 'react-icons/im';
import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      window.alert('Please enter your search query');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="search-button">
            <ImSearch className="search-icon" />
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}
