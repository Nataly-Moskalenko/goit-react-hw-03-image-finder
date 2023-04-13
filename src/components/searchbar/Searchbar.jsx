import { ImSearch } from 'react-icons/im';
import { Component } from 'react';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      toast.info('Please enter your search query.');
      return;
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
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
            value={searchQuery}
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}
