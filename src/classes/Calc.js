import SingleInputRange from './SingleInputRange.js';

export default class Calc {
    constructor() {
        if (!document.querySelector('.calc')) {
            return;
        }

        this._percentInput = document.querySelector('.calc__results-row-input[name="percent"]');
        this._paymentInput = document.querySelector('.calc__results-row-input[name="payment"]');

        this._sumInput = document.querySelector('.calc__selectors-row-input[name="cost"]');
        this._sumRange = null;
        this._contributionInput = document.querySelector('.calc__selectors-row-input[name="contribution"]');
        this._contributionRange = null;
        this._termInput = document.querySelector('.calc__selectors-row-input[name="term"]');
        this._termRange = null;

        this.initPlugins();
        this.initEventListeners();
        this.calcResults();
    }

    initEventListeners() {
        this._sumInput.addEventListener('change', this.calcResults.bind(this));
        this._contributionInput.addEventListener('change', this.calcResults.bind(this));
        this._termInput.addEventListener('change', this.calcResults.bind(this));

        this._percentInput.addEventListener('keydown', this.percentKeyDownHandler.bind(this));
        this._percentInput.addEventListener('input', this.keyUpHandler.bind(this));
        this._percentInput.addEventListener('blur', this.blurHandler.bind(this));

        this._sumRange._range.noUiSlider.on('change.one', this.calcResults.bind(this));
        this._termRange._range.noUiSlider.on('change.one', this.calcResults.bind(this));
        this._contributionRange._range.noUiSlider.on('change.one', this.calcResults.bind(this));
    }

    calcResults() {
        const sum = this.getNumberValue(this._sumInput);
        const contribution = this.getNumberValue(this._contributionInput);
        const term = this.getNumberValue(this._termInput);
        const percent = this.getFloatValue(this._percentInput);

        const monthPercent = (percent / 12 / 100);
        const allPercent = (1 + monthPercent) ^ (term * 12);

        const result = ((sum - contribution) * monthPercent * allPercent) / (allPercent - 1);
        this._paymentInput.value = `${Intl.NumberFormat('ru-RU').format(parseInt(result))} руб/мес`;
    }

    initPlugins() {
        this._sumRange = new SingleInputRange(this._sumInput);
        this._contributionRange = new SingleInputRange(this._contributionInput);
        this._termRange = new SingleInputRange(this._termInput);
    }

    getNumberValue(input) {
        return parseInt(input.value.replace(/\s/g, ''))
    }

    getFloatValue(input) {
        const value = input.value.replace(',', '.');
        return parseFloat(value)
    }

    percentKeyDownHandler(event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            (event.keyCode == 65 && event.ctrlKey === true) ||
            (event.keyCode >= 35 && event.keyCode <= 39) || (event.key == ',') || (event.key == '.')) {
            return;
        } else {
            // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
                return;
            }
        }
    }

    setInputValue(newValue) {
        this._percentInput.value = `${newValue} %`;
    }

    keyUpHandler(event) {
        clearTimeout(this._changeTimeout);
        this._changeTimeout = setTimeout(() => {
            let newValue = event.target.value;
            newValue = event.target.value.replace(',', '.');
            newValue = parseFloat(newValue.replace(/[^.\d]/g, ''));
            if (newValue > 50) {
                newValue = 50;
            } else if (newValue < 1 || !newValue) {
                newValue = 1;
            }
            this.setInputValue(newValue);
            this.calcResults();
        }, 1000);
    }

    blurHandler(event) {
        let newValue = event.target.value;
        newValue = event.target.value.replace(',', '.');
        newValue = parseFloat(newValue.replace(/\s/g, ''));
        if (newValue > 50) {
            newValue = 50;
        } else if (newValue < 1 || !newValue) {
            newValue = 1;
        }
        this.setInputValue(newValue);
        this.calcResults();
    }
}
