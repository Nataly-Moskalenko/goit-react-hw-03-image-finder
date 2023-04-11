import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}
