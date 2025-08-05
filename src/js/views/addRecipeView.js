import view from './View';
import icons from 'url:../../img/icons.svg';
class addRecipeView extends view {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe Added successfully';
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleclasses() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    console.log(this);
    this._btnOpen.addEventListener('click', this.toggleclasses.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleclasses.bind(this));
    this._overlay.addEventListener('click', this.toggleclasses.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr); //fromEntries takes array of entries and convert it to oobject
      handler(data);
    });
  }
}
export default new addRecipeView();
