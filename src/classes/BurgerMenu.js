export default class BurgerMenu {
    constructor() {
        this._burgerButton = document.querySelector('.header__menu-button_type_burger');
        this._menu = document.querySelector('.mobile-menu');
        this._innerPart = this._menu.querySelector('.mobile-menu__inner');
        this._minTabletWidth = 768;

        this._outerClickMenu = this._closeMenuOnOuterClick.bind(this);

        this._setLeftHeaderPosition();
    }

    setEventListeners() {
        this._burgerButton.addEventListener('click', this._toggleMenu.bind(this));
        window.addEventListener('resize', this._setLeftHeaderPosition.bind(this));
    }

    _toggleMenu() {
        const needOpen = !this._menu.classList.contains('mobile-menu_opened');
        this._menu.classList.toggle('mobile-menu_opened');
        this._burgerButton.querySelector('.header__menu-button-text').textContent = (needOpen) ? 'Закрыть' : 'Меню';
        this._burgerButton.classList.toggle('header__menu-button_type_burger-opened', needOpen);

        if (needOpen) {
            setTimeout(() => {
                document.addEventListener('click', this._outerClickMenu);
            }, 500);
        } else {
            document.removeEventListener('click', this._outerClickMenu);
        }
    }

    _setLeftHeaderPosition() {
        if (window.innerWidth >= this._minTabletWidth) {
            const rect = this._burgerButton.getBoundingClientRect();
            if (rect.left) {
                this._innerPart.style.paddingLeft = `${rect.left}px`;
            }
        } else {
            this._innerPart.style.paddingLeft = 0;
        }
    }

    _closeMenuOnOuterClick(e) {
        const target = e.target;
        const menu = target.closest('.mobile-menu');
        const header = target.closest('.header__left');
        if (menu || header) {
            return;
        }

        this._toggleMenu();
    }
}
