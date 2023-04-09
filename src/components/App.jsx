import Searchbar from './searchbar/Searchbar';
// import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import { Component } from 'react';

export class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar />
        {/* <ImageGallery image={}/> */}
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        {showModal && <Modal onClose={this.toggleModal} />}        
      </div>
    );
  }
}
