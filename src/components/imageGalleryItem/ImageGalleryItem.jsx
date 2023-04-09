export default function ImageGalleryItem({ webformatURL }) {
  return (
    <li class="gallery-item">
      <img src={webformatURL} alt="" />
    </li>
  );
}
