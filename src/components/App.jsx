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
    images: null,
    searchQuery: '',
    error: null,
    page: 1,
    showImage: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery &&
      prevProps.images !== this.state.images
    ) {
      this.setState({ status: 'pending' });
      await apiService(this.state.searchQuery, this.state.page)
        .then(data => this.setState({ images: data.hits, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  toggleModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (this.state.showModal === false) {
      this.setState({ showImage: e.target });
    }
  };

  handleSearchbarSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleLoadMore = () => {
    // this.setState(prev =>({number: prev.number + 1}))
    this.setState(prevState => {
      console.log(this.state.page);
      return { page: prevState.page + 1 };
    });
    // this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { showModal, images, showImage, error, status } = this.state;
    if (status === 'idle') {
      return (
        <div className="app">
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="app">
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          <Loader />
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className="app">
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          <p>{error.message}</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="app">
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          <ImageGallery images={images} onClick={this.toggleModal} />
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              largeImageURL={showImage.dataset.source}
              tags={showImage.tags}
            />
          )}
          <Button onClick={this.handleLoadMore} />
        </div>
      );
    }

    // return (
    //   <div className="app">
    //     {error && <p>{error.message}</p>}
    //     <Searchbar onSubmit={this.handleSearchbarSubmit} />
    //     {loading && <Loader />}
    //     {images && <ImageGallery images={images} onClick={this.toggleModal} />}
    //     {showModal && (
    //       <Modal
    //         onClose={this.toggleModal}
    //         largeImageURL={showImage.dataset.source}
    //         tags={showImage.tags}
    //       />
    //     )}
    //   </div>
    // );
  }
}
