import apiQueries from 'components/servise/apiQueries';
import { Component } from 'react';
import css from '../imageGallery/ImageGallery.module.css';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    articles: [],
    error: '',
  };

  async componentDidUpdate(prevProps) {
    const currentNume = this.props.searchValue;
    const prevName = prevProps.searchValue;

    if (currentNume !== prevName) {
      try {
        const response = await apiQueries(currentNume);
        this.setState({ articles: response.data.hits });
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  render() {
    const { articles } = this.state;
    return (
      <ul className={css.gallery}>
        <ImageGalleryItem articles={articles} />
      </ul>
    );
  }
}

export default ImageGallery;
