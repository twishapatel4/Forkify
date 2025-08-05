import icons from 'url:../../img/icons.svg';
export default class view {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markUp = this._generateHTML();

    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const newmarkUp = this._generateHTML();
    const newDOM = document.createRange().createContextualFragment(newmarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements);
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //console.log(newElements.isEqualNode(curEl));
      //Update the text content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild &&
        newEl.textContent.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //update the attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(curEl.attributes).forEach(attr => {
          if (!newEl.hasAttribute(attr.name)) {
            curEl.setAttribute(attr.name, attr.value);
          }
        });
      }
    });
  }

  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
