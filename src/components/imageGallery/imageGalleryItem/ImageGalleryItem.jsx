import css from '../imageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ articles }) => {
  return (
    <>
      {articles.map(({ id, webformatURL, tags }) => (
        <li key={id} className={css.galleryItem}>
          <img className={css.image} src={webformatURL} alt={tags} />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;
