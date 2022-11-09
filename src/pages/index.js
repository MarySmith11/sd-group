import 'swiper/css';
import 'swiper/css/effect-fade';
import '@fancyapps/ui/dist/fancybox.css';
import '../styles/main.scss';

import WOW from 'wow.js';
import customSelect from 'custom-select';

import FixedHeader from '../classes/FixedHeader.js';
import BurgerMenu from '../classes/BurgerMenu.js';
import Contacts from '../classes/Contacts.js';
import PopupWithForm from '../classes/PopupWithForm.js';
import Progress from '../classes/Progress.js';
import ProjectPage from '../classes/ProjectPage.js';
import AboutPage from '../classes/AboutPage.js';
import FancyModals from '../classes/FancyModals.js';
import SingleInputRange from '../classes/SingleInputRange.js';

window.SingleInputRange = SingleInputRange;
window.customSelect = customSelect;

const minTabletWidth = 768;

const forcedOriginalScale = (className) => {  
    const App = document.querySelector(`.${className}`);
    App.style.zoom = 1 / devicePixelRatio;
}

document.addEventListener('DOMContentLoaded', () => {    
    if (window.innerWidth > 1365) {
        forcedOriginalScale('page');
    }
    

    // Левое меню открывающееся по клику на бургер
    const menu = new BurgerMenu();
    menu.setEventListeners();

    // Фиксированная шапка
    const header = new FixedHeader(20, 'header', 'header_state_scrolled');
    header.setEventListeners();

    // Карта в контактах
    const map = document.getElementById('yamap');
    if (map) {
        new Contacts('yamap');
    }

    // Попап заказать звонок
    const callbackPopup = new PopupWithForm('.popup_type_callback');
    callbackPopup.setEventListeners();
    const desktopCallbackOpener = document.querySelector('.header__callback-button');
    const mobileCallbackOpener = document.querySelector('.header__phone');
    const defaultCallbackOpeners = document.querySelectorAll('.js-callback-button');
    if (desktopCallbackOpener) {
        desktopCallbackOpener.addEventListener('click', () => {
            if (window.innerWidth < minTabletWidth) {
                return;
            }

            callbackPopup.open();
        });
    }
    if (mobileCallbackOpener) {
        mobileCallbackOpener.addEventListener('click', () => {
            if (window.innerWidth >= minTabletWidth) {
                return;
            }

            callbackPopup.open();
        });
    }
    if (defaultCallbackOpeners) {
        Array.from(defaultCallbackOpeners).forEach((item) => {
            item.addEventListener('click', callbackPopup.open.bind(callbackPopup));
        });
    }

    // Стилизация селектов
    const customSelectConfig = {
        containerClass: 'form__select-container',
        openerClass: 'form__select-opener',
        panelClass: 'form__select-panel',
        optionClass: 'form__select-option',
        optgroupClass: 'form__select-optgroup',
        isSelectedClass: 'form__select_selected',
        hasFocusClass: 'form__select_focus',
        isDisabledClass: 'form__select_disabled',
        isOpenClass: 'form__select_open'
    };
    const customSelectList = document.querySelectorAll('.js-custom-select');
    if (customSelectList) {
        Array.from(customSelectList).forEach(item => {
            customSelect(item, customSelectConfig);
        });
    }
    const filterSelectConfig = {
        containerClass: 'filter__select-container',
        openerClass: 'filter__select-opener',
        panelClass: 'filter__select-panel',
        optionClass: 'filter__select-option',
        optgroupClass: 'filter__select-optgroup',
        isSelectedClass: 'filter__select_selected',
        hasFocusClass: 'filter__select_focus',
        isDisabledClass: 'filter__select_disabled',
        isOpenClass: 'filter__select_open'
    };
    const filterSelectList = document.querySelectorAll('.filter__select');
    if (filterSelectList) {
        Array.from(filterSelectList).forEach(item => {
            customSelect(item, filterSelectConfig);
        });
    }

    // Анимации
    const wow = new WOW();
    wow.init(
        {
            animateClass: 'animated',
            mobile: true,
            offset: '300'
        }
    );

    // Блоки хода строительства
    new Progress();

    // Страница проекта
    new ProjectPage();

    // О компании
    new AboutPage();

    // Модальные окна
    new FancyModals();

    // Калькулятор ипотеки
    // new Calc();

    const burgerButton = document.querySelector('.header__menu-button_type_burger');
    const filterButton = document.querySelector('.projects__filter-button');
    if (filterButton) {
        filterButton.addEventListener('click', () => {
            const filterBlock = document.querySelector('.filter');
            if (filterBlock) {
                filterBlock.classList.add('filter_mobile');
            }
            burgerButton.classList.add('-filter-opened');
        });
    }

    const filterCloseButton = document.querySelector('.filter__mobile-button');
    if (filterCloseButton) {
        filterCloseButton.addEventListener('click', () => {
            const filterBlock = document.querySelector('.filter');
            if (filterBlock) {
                filterBlock.classList.remove('filter_mobile');
            }
            burgerButton.classList.remove('-filter-opened');
        });
    }
});
