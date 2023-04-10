export default function ImageGalleryItem({ webformatURL, tags }) {
  return (
    <li className="gallery-item">
      <img className="gallery-item__image" src={webformatURL} alt={tags} />
    </li>
  );
}
