import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');
   
  addHandlerClick(handler) {
      this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
       })
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Only one page
    if (numPages === 1) return '';

    const prevButton = curPage > 1 
      ? this._generateMarkupButton('prev', curPage) 
      : '';

    const nextButton = curPage < numPages 
      ? this._generateMarkupButton('next', curPage) 
      : '';

    return prevButton + nextButton;
}
  _generateMarkupButton(type, curPage) {
    const isNext = type === 'next';
    const goToPage = isNext ? curPage + 1 : curPage - 1;
    return `
      <button data-goto="${goToPage}" class="btn--inline pagination__btn--${type}">
        ${!isNext ? `
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>` : ''}
        <span>Page ${goToPage}</span>
        ${isNext ? `
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>` : ''}
      </button>
    `;
}
};

export default new PaginationView();