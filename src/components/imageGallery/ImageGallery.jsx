import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';

export default function ImageGallery({image}) {
  return (
    <ul class="gallery">
      <ImageGalleryItem key={image.id} webformatURL={image.webformatURL}/>
    </ul>
  );
}
