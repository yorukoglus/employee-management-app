import { LitElement, html } from 'lit';
import { navigation } from '../shared/utils.js';

export class NotFoundPage extends LitElement {
  _goHome() {
    navigation.goToEmployeeList();
  }

  render() {
    return html`
      <div style="text-align: center; padding: 2rem;">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <button @click=${this._goHome} style="
          background: #ff6600;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        ">
          Go to Employee List
        </button>
      </div>
    `;
  }
}

customElements.define('not-found-page', NotFoundPage); 