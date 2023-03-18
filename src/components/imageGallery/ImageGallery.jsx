import Error from '../error/errors';
import Loading from 'components/loading/Loading';
import apiQueries from 'components/servise/apiQueries';
import { Component } from 'react';
import css from '../imageGallery/ImageGallery.module.css';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';
import Button from 'components/button/Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

class ImageGallery extends Component {
  state = {
    articles: [],
    status: STATUS.IDLE,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const currentNume = this.props.searchValue;
    const prevName = prevProps.searchValue;
    const currentPage = this.state.page;
    const prevPage = prevState.page;
    const { page } = this.state;
    console.log(currentNume !== prevName || currentPage !== prevPage);
    if (currentNume !== prevName || currentPage !== prevPage) {
      this.setState({ status: STATUS.PENDING });
      console.log('запрос');
      try {
        const response = await apiQueries(currentNume, page);
        if (response.data.hits.length === 0) {
          return this.setState({ status: STATUS.REJECTED });
        }
        this.setState({ articles: response.data.hits });
        this.setState({ status: STATUS.RESOLVED });
      } catch (error) {
        console.log(error);
      }
    }
  }

  hendleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { articles, status } = this.state;
    if (status === STATUS.IDLE) {
    } else if (status === STATUS.PENDING) {
      return (
        <div className={css.loading}>
          <Loading />
        </div>
      );
    } else if (status === STATUS.REJECTED) {
      Error();
    } else if (status === STATUS.RESOLVED) {
      return (
        <>
          <ul className={css.gallery}>
            <ImageGalleryItem articles={articles} />
          </ul>
          <Button loadMore={this.hendleLoadMore} />
        </>
      );
    }
  }
}

export default ImageGallery;
