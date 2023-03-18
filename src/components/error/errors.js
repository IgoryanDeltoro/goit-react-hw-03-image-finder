import { Report } from 'notiflix';

export default function Error() {
  Report.info(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
