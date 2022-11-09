export default class FixedHeader {
    constructor(headerScrollTopFixedState, headerClass, scrolledClass) {
        this._header = document.querySelector(`.${headerClass}`);
        this._scrolledClass = scrolledClass;
        this._scrollTopHeight = headerScrollTopFixedState;

        this._changeCurrentScrollState(window.scrollY);
    }

    setEventListeners() {
        window.addEventListener('scroll', this._fixedHeaderHandler.bind(this));
    }

    _changeCurrentScrollState(currentScrollTop) {
        const addScrolledClass = currentScrollTop > this._scrollTopHeight;
        if (addScrolledClass && !this._header.classList.contains(this._scrolledClass)) {
            this._header.classList.add(this._scrolledClass);
        } else if (!addScrolledClass && this._header.classList.contains(this._scrolledClass)) {
            this._header.classList.remove(this._scrolledClass);
        }
    }

    _fixedHeaderHandler(e) {
        const currentScrollTop = window.scrollY;
        this._changeCurrentScrollState(currentScrollTop);
    }
}
