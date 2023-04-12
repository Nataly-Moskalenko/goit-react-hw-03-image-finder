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
    showImage: null,
    loading: false,
    // status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.searchQuery !== this.state.searchQuery &&
        prevProps.images !== this.state.images) ||
      prevState.page !== this.state.page
    ) {
      // this.setState({ status: 'pending' });
      this.setState({ loading: true });
      await apiService(this.state.searchQuery, this.state.page)
        .then(data =>
          this.setState({
            images: [...this.state.images, ...data.hits],
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(this.setState({ loading: false }));
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
    this.setState({ searchQuery });
  };

  handleLoadMore = () => {
    this.setState(state => {
      return {
        page: state.page + 1,
      };
    });
  };

  render() {
    const { showModal, images, showImage, error, loading } = this.state;
    // if (status === 'idle') {
    //   return (
    //     <div className="app">
    //       <Searchbar onSubmit={this.handleSearchbarSubmit} />
    //     </div>
    //   );
    // }
    // if (status === 'pending') {
    //   return (
    //     <div className="app">
    //       <Searchbar onSubmit={this.handleSearchbarSubmit} />
    //       <Loader />
    //     </div>
    //   );
    // }
    // if (status === 'rejected') {
    //   return (
    //     <div className="app">
    //       <Searchbar onSubmit={this.handleSearchbarSubmit} />
    //       <p>{error.message}</p>
    //     </div>
    //   );
    // }
    // if (status === 'resolved') {
    //   return (
    //     <div className="app">
    //       <Searchbar onSubmit={this.handleSearchbarSubmit} />
    //       <ImageGallery images={images} onClick={this.toggleModal} />
    //       {showModal && (
    //         <Modal
    //           onClose={this.toggleModal}
    //           largeImageURL={showImage.dataset.source}
    //           tags={showImage.tags}
    //         />
    //       )}
    //       <Button handleLoadMore={this.handleLoadMore} />
    //     </div>
    //   );
    // }

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
        {images.length >= 12 && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
}
