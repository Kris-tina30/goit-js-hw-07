import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryList = document.querySelector('.gallery');
const cardMarkup = createGalaryItem(galleryItems);
galleryList.insertAdjacentHTML('beforeend', cardMarkup);

galleryList.addEventListener('click', onGallerylistClick);

function createGalaryItem(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join('');
}

function onGallerylistClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const instance = basicLightbox.create(
    `
<img

  src="${event.target.dataset.source}" width="800" height="600"
 
/>
`,
    {
      onShow: () => document.addEventListener('keydown', onKeyEscapeModalClose),
      onClose: () => document.removeEventListener('keydown', onKeyEscapeModalClose),
    }
  );

  instance.show();

  function onKeyEscapeModalClose(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}

console.log(galleryItems);
