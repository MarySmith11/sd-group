import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        if (this._popup) {
            this._form = this._popup.querySelector('.form');
            this._formElements = Array.from(this._form.elements);
            this._button = this._popup.querySelector('.button_type_form');
        }
    }

    setEventListeners() {
        if (this._popup) {
            super.setEventListeners();
        }

    }

    _getInputValues() {
        this._formValues = {};
        this._formElements.forEach((elem) => {
            this._formValues[elem.name] = elem.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    getFormElement() {
        return this._form;
    }

    getButtonElement() {
        return this._button;
    }
}
