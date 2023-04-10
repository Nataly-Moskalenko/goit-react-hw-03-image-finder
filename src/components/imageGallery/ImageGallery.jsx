import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <ul className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          tags={image.tags}
        />
      ))}
    </ul>
  );
}
