import { ThreeDots } from 'react-loader-spinner';
import css from '../loading/Loading.module.css';

const Loading = ({ pending }) => {
  return (
    <>
      <div className={css.loading}>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={pending}
        />
      </div>
    </>
  );
};

export default Loading;
