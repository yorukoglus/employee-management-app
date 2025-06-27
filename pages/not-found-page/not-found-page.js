import { LitElement, html, css } from 'lit';
import { navigation } from '../shared/utils.js';
import { I18nMixin } from '../shared/i18n-mixin.js';

export class NotFoundPage extends I18nMixin(LitElement) {
  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', Arial, sans-serif;
      background: #f6f6f6;
      min-height: 100vh;
    }

    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 40px 20px;
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }

    .not-found-icon {
      width: 120px;
      height: 120px;
      background: #ff6600;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
      color: white;
      font-size: 48px;
      font-weight: bold;
    }

    .not-found-title {
      font-size: 48px;
      font-weight: 700;
      color: #333;
      margin: 0 0 16px 0;
    }

    .not-found-subtitle {
      font-size: 20px;
      color: #666;
      margin: 0 0 32px 0;
      line-height: 1.5;
    }

    .go-home-btn {
      background: #ff6600;
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: background 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .go-home-btn:hover {
      background: #e65100;
    }

    /* Tablet responsive */
    @media (max-width: 768px) {
      .not-found-container {
        padding: 32px 16px;
      }

      .not-found-icon {
        width: 100px;
        height: 100px;
        font-size: 40px;
        margin-bottom: 24px;
      }

      .not-found-title {
        font-size: 36px;
      }

      .not-found-subtitle {
        font-size: 18px;
        margin-bottom: 24px;
      }

      .go-home-btn {
        padding: 14px 28px;
        font-size: 15px;
      }
    }

    /* Mobile responsive */
    @media (max-width: 600px) {
      .not-found-container {
        padding: 24px 12px;
      }

      .not-found-icon {
        width: 80px;
        height: 80px;
        font-size: 32px;
        margin-bottom: 20px;
      }

      .not-found-title {
        font-size: 28px;
        margin-bottom: 12px;
      }

      .not-found-subtitle {
        font-size: 16px;
        margin-bottom: 20px;
      }

      .go-home-btn {
        padding: 12px 24px;
        font-size: 14px;
        width: 100%;
        max-width: 200px;
      }
    }

    /* Small mobile devices */
    @media (max-width: 480px) {
      .not-found-container {
        padding: 20px 8px;
      }

      .not-found-icon {
        width: 70px;
        height: 70px;
        font-size: 28px;
        margin-bottom: 16px;
      }

      .not-found-title {
        font-size: 24px;
      }

      .not-found-subtitle {
        font-size: 15px;
        margin-bottom: 16px;
      }

      .go-home-btn {
        padding: 10px 20px;
        font-size: 13px;
      }
    }
  `;

  constructor() {
    super();
    console.log('NotFoundPage component created');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('NotFoundPage component connected');
  }

  _goHome() {
    console.log('Navigating to employee list');
    navigation.goToEmployeeList();
  }

  render() {
    console.log('Rendering NotFoundPage');
    return html`
      <div class="not-found-container">
        <div class="not-found-icon">404</div>
        <h1 class="not-found-title">${this.t('pageNotFound')}</h1>
        <p class="not-found-subtitle">
          ${this.t('pageNotFoundSubtitle')}
        </p>
        <button class="go-home-btn" @click=${this._goHome}>
          ${this.t('goToEmployeeList')}
        </button>
      </div>
    `;
  }
}

customElements.define('not-found-page', NotFoundPage); 