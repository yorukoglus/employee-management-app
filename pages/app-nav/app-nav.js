import {LitElement, html} from 'lit';
import {appNavStyles} from './app-nav.css.js';
import {I18nMixin} from '../shared/i18n-mixin.js';
import {menuSvg} from '../shared/svgs/menu.svg.js';
import {flagEnSvg} from '../shared/svgs/flag-en.svg.js';
import {flagTrSvg} from '../shared/svgs/flag-tr.svg.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';

export class AppNav extends I18nMixin(LitElement) {
  static properties = {
    active: {type: String},
    _mobileMenuOpen: {type: Boolean, state: true},
  };

  static styles = appNavStyles;

  constructor() {
    super();
    this.active = 'list';
    this._mobileMenuOpen = false;
  }

  _navigate(page) {
    this._mobileMenuOpen = false;
    this.active = page;
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: {page},
        bubbles: true,
        composed: true,
      })
    );
  }

  _toggleMobileMenu() {
    this._mobileMenuOpen = !this._mobileMenuOpen;
  }

  _switchLanguage(lang) {
    this.setLanguage(lang);
  }

  render() {
    const currentLang = this.getCurrentLanguage();
    return html`
      <nav>
        <div class="logo-area">
          <div class="logo-img">
            <img src="../../assets/logo-small.jpg" alt="logo" />
          </div>
          ING
        </div>
        <button class="mobile-menu-toggle" @click=${this._toggleMobileMenu}>
          ${unsafeSVG(menuSvg)}
        </button>

        <div class="nav-links ${this._mobileMenuOpen ? 'mobile-open' : ''}">
          <a
            class="nav-link ${this.active === 'list' ? 'active' : ''}"
            @click=${() => this._navigate('list')}
            href="#"
            >${this.t('employees')}</a
          >
          <a
            class="nav-link ${this.active === 'add' ? 'active' : ''}"
            @click=${() => this._navigate('add')}
            href="#"
            >${this.t('addNew')}</a
          >
          <div class="language-switcher">
            <button
              class="lang-btn ${currentLang === 'en' ? 'active' : ''}"
              @click=${() => this._switchLanguage('en')}
              title="English"
            >
              ${unsafeSVG(flagEnSvg)}
            </button>
            <button
              class="lang-btn ${currentLang === 'tr' ? 'active' : ''}"
              @click=${() => this._switchLanguage('tr')}
              title="Türkçe"
            >
              ${unsafeSVG(flagTrSvg)}
            </button>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);
