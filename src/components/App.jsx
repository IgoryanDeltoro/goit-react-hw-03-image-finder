import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import Loading from 'components/loading/Loading';
import apiQueries from 'components/servise/apiQueries';
import modal from 'components/modal/modal';

import Button from 'components/button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchValue: '',
    articles: [],
    isLoading: false,
    page: 1,
    totalPaginate: 0,
  };

  componentDidMount() {
    window.addEventListener('click', this.hendleOpeningModal);
  }

  componentDidUpdate(_, prevState) {
    const currentNume = this.state.searchValue;
    const prevName = prevState.searchValue;
    const currentPage = this.state.page;
    const prevPage = prevState.page;

    if (currentNume !== prevName || currentPage !== prevPage) {
      this.setState({ isLoading: true });
      this.hendleRequest();
    }
  }

  hendleRequest = async () => {
    const { page, searchValue } = this.state;
    try {
      const response = await apiQueries(searchValue, page);
      this.setState({ totalPaginate: Math.ceil(response.totalHits / 12) });
      if (response.hits.length === 0) {
        toast('Sorry, There are no images!');
      }
      this.setState(prev => ({
        articles: [...prev.articles, ...response.hits],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentWillUnmount() {
    window.removeEventListener('click', this.hendleOpeningModal);
  }

  hendleOnSubmit = searchValue => {
    this.setState({ searchValue, articles: [], page: 1 });
  };

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
    const { isLoading, page, totalPaginate, articles } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.hendleOnSubmit} />
        <ImageGallery articles={articles} />
        <Loading pending={isLoading} />
        {page < totalPaginate && (
          <> {!isLoading && <Button loadMore={this.hendleLoadMore} />}</>
        )}
        <ToastContainer />
      </>
    );
  }
}

export default App;
