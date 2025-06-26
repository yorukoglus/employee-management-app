import { LitElement, html } from 'lit';
import { appNavStyles } from './app-nav.css.js';

export class AppNav extends LitElement {
  static properties = {
    active: { type: String }, // e.g. 'list', 'add', 
  };

  static styles = appNavStyles;

  constructor() {
    super();
    this.active = 'list';
  }

  _navigate(page) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { page },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <nav>
        <div class="logo-area">
          <div class="logo-img">ING</div>
        </div>
        <div class="nav-links">
          <a class="nav-link ${this.active === 'list' ? 'active' : ''}" @click=${() => this._navigate('list')} href="#">Employees</a>
          <a class="nav-link ${this.active === 'add' ? 'active' : ''}" @click=${() => this._navigate('add')} href="#">Add New</a>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav); 