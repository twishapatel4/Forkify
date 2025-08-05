import view from './View';
import icons from 'url:../../img/icons.svg';
class previewView extends view {
  _parentElement = '';
  _generateHTML() {
    const id = window.location.hash.slice(1);
    const data = this._data;
    return `<li class="preview">
            <a class="preview__link ${
              data.id === id ? 'preview__link--active' : ''
            }" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
              </div>
            </a>
          </li>`;
  }
}
export default previewView;
