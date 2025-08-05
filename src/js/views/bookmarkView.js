import previewView from './previewView';
// const prev = new previewView();
class bookmarkView extends previewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmark found';
  _message = '';
  _generateHTML() {
    //now these will not work
    // return this._data.map(this._generateMarkUpPreview).join('');
    return this._data
      .map(bookmark => super._generateHTML.call({ _data: bookmark }))
      .join('');
  }
  // _generateMarkUpPreview(result) {
  //   const id = window.location.hash.slice(1);
  //   return `<li class="preview">
  //           <a class="preview__link ${
  //             result.id === id ? 'preview__link--active' : ''
  //           }" href="#${result.id}">
  //             <figure class="preview__fig">
  //               <img src="${result.image}" alt="Test" />
  //             </figure>
  //             <div class="preview__data">
  //               <h4 class="preview__title">${result.title}</h4>
  //               <p class="preview__publisher">${result.publisher}</p>
  //             </div>
  //           </a>
  //         </li>`;
  // }
}
export default new bookmarkView();
//bookmarkview and the results view are similar so what we can do is have the common parent class to these views and so it willl later extend the child class
