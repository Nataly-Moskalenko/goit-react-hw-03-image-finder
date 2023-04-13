import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import { Component } from 'react';
import apiService from 'services/api';
import Loader from './loader/Loader';
import Button from './button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const { images, searchQuery, page } = this.state;
    if (
      (prevState.searchQuery !== searchQuery && prevProps.images !== images) ||
      prevState.page !== page
    ) {
      this.setState({ loading: true });
      try {
        const data = await apiService(searchQuery, page);
        if (data.totalHits === 0) {
          this.setState({ images: [] });
          toast.info(
            `Sorry, there are no images with ${searchQuery}. Please try again.`
          );
          return;
        }
        this.setState({ images: [...images, ...data.hits] });
        this.setState({ totalImages: data.totalHits });
      } catch (error) {
        this.setState({ error });
        toast.error('Sorry, an error occurred. Please try again.');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  toggleModal = e => {
    const { showModal } = this.state;
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    if (showModal === false) {
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
    const { showModal, images, showImage, loading, totalImages, error } = this.state;

    return (
      <div className="app">
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
        {totalImages > images.length && !error && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        <ToastContainer />        
      </div>
    );
  }
}
