import Error from '../error/errors';
import Loading from 'components/loading/Loading';
import apiQueries from 'components/servise/apiQueries';
import { Component } from 'react';
import css from '../imageGallery/ImageGallery.module.css';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';
import Button from 'components/button/Button';
import modal from 'components/modal/modal';

class ImageGallery extends Component {
  state = {
    articles: [],
    isLoading: false,
    page: 1,
  };

  componentDidMount() {
    window.addEventListener('click', this.hendleOpeningModal);
  }

  async componentDidUpdate(prevProps, prevState) {
    const currentNume = this.props.searchValue;
    const prevName = prevProps.searchValue;
    const currentPage = this.state.page;
    const prevPage = prevState.page;
    const { page } = this.state;

    if (currentNume !== prevName || currentPage !== prevPage) {
      this.setState({ isLoading: true });
      try {
        const response = await apiQueries(currentNume, page);
        if (response.data.hits.length === 0) {
          Error();
        }
        this.setState(prev => ({
          articles: [...prev.articles, ...response.data.hits],
        }));
        this.setState({ isLoading: false });
      } catch (error) {
        console.log(error);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hendleOpeningModal);
  }

  hendleOpeningModal = event => {
    const { articles } = this.state;
    const { src } = event.target;
    if (event.target.nodeName === 'IMG') {
      const filtred = articles.find(el => el.webformatURL === src);
      modal(filtred);
    }
  };

  hendleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { articles, isLoading } = this.state;
    return (
      <>
        <ul className={css.gallery}>
          <ImageGalleryItem articles={articles} />
        </ul>
        <div className={css.loading}>
          <Loading pending={isLoading} />
        </div>
        {articles.length > 1 && (
          <> {!isLoading && <Button loadMore={this.hendleLoadMore} />}</>
        )}
      </>
    );
  }
}

export default ImageGallery;
