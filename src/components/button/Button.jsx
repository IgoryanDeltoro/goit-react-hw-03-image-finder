import css from '../button/Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <>
      <button type="button" className={css.button} onClick={loadMore}>
        Load More
      </button>
    </>
  );
};

export default Button;
