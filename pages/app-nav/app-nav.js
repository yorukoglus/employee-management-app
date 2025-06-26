import { LitElement, html } from 'lit';
import { appNavStyles } from './app-nav.css.js';

export class AppNav extends LitElement {
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

  render() {
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
          <a class="nav-link ${this.active === 'list' ? 'active' : ''}" @click=${() => this._navigate('list')} href="#">Employees</a>
          <a class="nav-link ${this.active === 'add' ? 'active' : ''}" @click=${() => this._navigate('add')} href="#">Add New</a>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav); 