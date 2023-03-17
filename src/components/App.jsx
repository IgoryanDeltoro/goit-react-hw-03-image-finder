import { Component } from 'react';
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';

class App extends Component {
  state = {
    searchValue: '',
  };

  hendleOnSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.hendleOnSubmit} />
        <ImageGallery searchValue={this.state.searchValue} />
      </>
    );
  }
}

export default App;
