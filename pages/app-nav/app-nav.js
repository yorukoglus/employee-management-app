import { LitElement, html } from 'lit';
import { appNavStyles } from './app-nav.css.js';
import { I18nMixin } from '../shared/i18n-mixin.js';

export class AppNav extends I18nMixin(LitElement) {
  static properties = {
    active: { type: String }, // e.g. 'list', 'add', 
    _mobileMenuOpen: { type: Boolean, state: true },
  };

  static styles = appNavStyles;

  constructor() {
    super();
    this.active = 'list';
    this._mobileMenuOpen = false;
  }

  _navigate(page) {
    this._mobileMenuOpen = false; // Close mobile menu when navigating
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { page },
      bubbles: true,
      composed: true
    }));
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
          <div class="logo-img">ING</div>
        </div>
        
        <button class="mobile-menu-toggle" @click=${this._toggleMobileMenu}>
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div class="nav-links ${this._mobileMenuOpen ? 'mobile-open' : ''}">
          <a class="nav-link ${this.active === 'list' ? 'active' : ''}" @click=${() => this._navigate('list')} href="#">${this.t('employees')}</a>
          <a class="nav-link ${this.active === 'add' ? 'active' : ''}" @click=${() => this._navigate('add')} href="#">${this.t('addNew')}</a>
          <div class="language-switcher">
            <button 
              class="lang-btn ${currentLang === 'en' ? 'active' : ''}" 
              @click=${() => this._switchLanguage('en')}
              title="English"
            >
              EN
            </button>
            <button 
              class="lang-btn ${currentLang === 'tr' ? 'active' : ''}" 
              @click=${() => this._switchLanguage('tr')}
              title="Türkçe"
            >
              TR
            </button>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav); 