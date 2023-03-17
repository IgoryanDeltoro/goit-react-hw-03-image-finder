import css from '../form/SearchForm.module.css';
const SearchForm = ({ search, onSubmit, onChange }) => {
  return (
    <>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={onChange}
        />
      </form>
    </>
  );
};

export default SearchForm;
