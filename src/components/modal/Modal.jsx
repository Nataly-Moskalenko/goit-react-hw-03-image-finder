import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img
            src={this.props.largeImageURL}
            alt={this.props.tags}
            width="1280"
            // height="720"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
