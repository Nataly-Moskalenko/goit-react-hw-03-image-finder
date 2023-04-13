import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import { Component } from 'react';
import apiService from 'services/api';
import Loader from './loader/Loader';
import Button from './button/Button';

export class App extends Component {
  state = {
    showModal: false,
    images: [],
    searchQuery: '',
    error: null,
    page: 1,
    totalImages: 0,
    showImage: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.searchQuery !== this.state.searchQuery &&
        prevProps.images !== this.state.images) ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      try {
        const data = await apiService(this.state.searchQuery, this.state.page);
        this.setState({ totalImages: data.totalHits });
        if (data.totalHits === 0) {
          this.setState({ images: [] });
          window.alert(
            `Sorry, there are no images with ${this.state.searchQuery}. Please try again.`
          );
          return;
        }
        this.setState({
          images: [...this.state.images, ...data.hits],
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    if (this.state.showModal === false) {
      this.setState({ showImage: e.target });
    }
  };

  handleSearchbarSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(state => {
      return {
        page: state.page + 1,
      };
    });
  };

  render() {
    const { showModal, images, showImage, error, loading, totalImages } =
      this.state;

    return (
      <div className="app">
        {error && <p>{error.message}</p>}
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {loading && <Loader />}
        {images && <ImageGallery images={images} onClick={this.toggleModal} />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={showImage.dataset.source}
            tags={showImage.tags}
          />
        )}
        {totalImages > images.length && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
