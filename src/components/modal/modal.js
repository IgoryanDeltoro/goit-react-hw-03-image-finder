import * as basicLightbox from 'basiclightbox';

const body = document.querySelector('body');

function modal(img) {
  if (img === undefined) {
    return;
  }
  const instance = basicLightbox.create(
    `<div class='backdrop'>
      <div class='modal'>
       <img src="${img.largeImageURL}" width="800" height="600">
      </div>
    </div>
`,
    {
      onShow: () => {
        window.addEventListener('keydown', hendleEventKeydown);
        document.addEventListener('click', hendleEventKeydown);
      },
      onClose: () => {
        window.removeEventListener('keydown', hendleEventKeydown);
        document.removeEventListener('click', hendleEventKeydown);
      },
    }
  );
  instance.show();

  body.classList.toggle('no-scroll');

  function hendleEventKeydown(event) {
    if (event.code !== 'Escape' && event.target.nodeName === 'IMG') {
      return;
    }
    instance.close();
    body.classList.remove('no-scroll');
  }
}
export default modal;
