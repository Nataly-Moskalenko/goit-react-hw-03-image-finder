import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItem__image}
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        onClick={onClick}
      />
    </li>
  );
}
