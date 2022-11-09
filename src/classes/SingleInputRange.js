import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default class SingleInputRange {
    constructor(element) {
        this._input = element;
        this._range = document.querySelector(`.js-range-${element.name}`);
        this._text = element.dataset.text;
        this._min = element.dataset.min;
        this._max = element.dataset.max;
        this._slider = null;
        this._changeTimeout = 0;

        this.initRange();
        this.initChangeEvent();
    }

    initRange() {
        if (this._range) {
            this._slider = noUiSlider.create(this._range, {
                start: +this._input.dataset.start,
                connect: [true, false],

                // Disable animation on value-setting,
                // so the sliders respond immediately.
                animate: false,
                range: {
                    min: +this._input.dataset.min,
                    max: +this._input.dataset.max
                }
            });
            this._input.addEventListener('keydown', this.keyDownHandler.bind(this));
            this._input.addEventListener('input', this.keyUpHandler.bind(this));
        }
    }

    initChangeEvent() {
        if (!this._slider) {
            return;
        }

        this._slider.on('update', (value) => {
            if (value) {
                this.setInputValue(parseInt(value));
            }
        });
    }

    keyDownHandler(event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            (event.keyCode == 65 && event.ctrlKey === true) ||
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
                return;
            }
        }
    }

    keyUpHandler(event) {
        clearTimeout(this._changeTimeout);
        this._changeTimeout = setTimeout(() => {
            let newValue = event.target.value;
            newValue = parseInt(newValue.replace(/\s/g, ''));            
            if (newValue > this._max) {
                newValue = this._max;
            } else if(newValue < this._min || !newValue) {
                newValue = this._min;
            }
            this._slider.set(newValue);
            this.setInputValue(newValue);
        }, 1000);
    }

    setInputValue(newValue) {
        this._input.value = `${Intl.NumberFormat('ru-RU').format(newValue)} ${this._text}`;
    }
}
