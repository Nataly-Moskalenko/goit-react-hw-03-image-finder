import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import { Component } from 'react';
import apiService from 'services/api';

export class App extends Component {
  state = {
    showModal: false,
    images: null,
    loading: false,
    searchQuery: '',
    largeImageURL: '',
    error: '',
  };

  async componentDidUpdate(prevState) {
    // this.setState({ loading: true });
    if (prevState.searchQuery !== this.state.searchQuery) {
      await apiService(this.state.searchQuery)
        // await fetch(
        //   `https://pixabay.com/api/?q=${this.state.searchQuery}&page=1&key=33747694-4a7d646e14d783512846269ff&image_type=photo&orientation=horizontal&per_page=12`
        // )
        // .then(res => res.json())
        .then(data => this.setState({ images: data.hits }))
      // .finally(() => this.setState({ loading: false }));
    }
  }

  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (this.state.showModal === false) {
      this.setState({ largeImageURL: e.target.dataset.source });
    }
  };

  handleSearchbarSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { showModal, loading, largeImageURL, images } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {loading && <p>Loading...</p>}
        {images && <ImageGallery images={images} onClick={this.toggleModal} />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            // tags={this.state.images.tags}
          />
        )}
      </div>
    );
  }
}
