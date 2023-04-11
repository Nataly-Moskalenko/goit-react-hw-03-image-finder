export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) {
  return (
    <li className="gallery-item">
      <img
        className="gallery-item__image"
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        onClick={onClick}
      />
    </li>
  );
}
