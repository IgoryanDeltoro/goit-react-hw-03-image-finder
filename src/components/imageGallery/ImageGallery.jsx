import css from '../imageGallery/ImageGallery.module.css';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ articles }) => {
  return (
    <ul className={css.gallery}>
      {articles.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  id: PropTypes.number,
};

export default ImageGallery;
