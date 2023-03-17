import { Component } from 'react';
import css from '../searchbar/Searchbar.module.css';
import SearchForm from './form/SearchForm';

class Searchbar extends Component {
  state = {
    search: '',
  };

  hendleInputValue = event => {
    const value = event.target.value;
    this.setState({ search: value });
  };
  hendleOnSubmit = event => {
    event.preventDefault();
    const search = this.state.search.trim();
    if (search !== '') {
      this.props.onSubmit(search);
      this.reset();
    }
  };
  reset = () => {
    this.setState({ search: '' });
  };
  render() {
    const { search } = this.state;

    return (
      <>
        <header className={css.Searchbar}>
          <SearchForm
            search={search}
            onSubmit={this.hendleOnSubmit}
            onChange={this.hendleInputValue}
          />
        </header>
      </>
    );
  }
}

export default Searchbar;
