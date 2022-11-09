export default class Popup {

    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._escClickHandler = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add('popup_state_opened');
      document.addEventListener('keydown', this._escClickHandler);
    }
  
    close() {
      document.removeEventListener('keydown', this._escClickHandler);
      this._popup.classList.remove('popup_state_opened');
    }
  
    setEventListeners() {
      if (this._popup) {
        this._popup.querySelector('.popup__close-btn').addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
      }
    }
  
    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  
    _handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    }
  }
  