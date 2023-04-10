import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import { Component } from 'react';

export class App extends Component {
  state = {
    showModal: false,
    images: null,
    loading: false,
    searchQuery: '',
  };

  // KEY_API = '33747694-4a7d646e14d783512846269ff';
  // BASE_URL = 'https://pixabay.com/api/';

  componentDidMount() {
    // this.state.loading = true;
    this.setState({ loading: true });
    fetch(
      'https://pixabay.com/api/?q=dog&page=1&key=33747694-4a7d646e14d783512846269ff&image_type=photo&orientation=horizontal&per_page=12'
    )
      .then(res => res.json())
      .then(data => this.setState({ images: data.hits }))
      .finally(() => this.setState({ loading: false }));
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleSearchbarSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { showModal } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {this.state.loading && <p>Loading...</p>}
        {this.state.images && <ImageGallery images={this.state.images} />}
        {/* <ImageGallery searchQuery={this.state.searchQuery} /> */}

        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        {showModal && <Modal onClose={this.toggleModal} />}
      </div>
    );
  }
}
