import {LitElement, html, css} from 'lit';
import {I18nMixin} from '../../shared/i18n-mixin.js';

export class Toast extends I18nMixin(LitElement) {
  static properties = {
    message: {type: String},
    type: {type: String}, // 'success', 'error', 'info'
    show: {type: Boolean, state: true},
    _timeoutId: {type: Number, state: true},
  };

  static styles = css`
    :host {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: block;
    }

    .toast {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 16px 20px;
      margin-bottom: 10px;
      min-width: 300px;
      max-width: 400px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      border-left: 4px solid;
      position: relative;
      overflow: hidden;
    }

    .toast.show {
      transform: translateX(0);
    }

    .toast.success {
      border-left-color: #4caf50;
      background: linear-gradient(135deg, #f8fff8 0%, #ffffff 100%);
    }

    .toast.error {
      border-left-color: #f44336;
      background: linear-gradient(135deg, #fff8f8 0%, #ffffff 100%);
    }

    .toast.info {
      border-left-color: #2196f3;
      background: linear-gradient(135deg, #f8fbff 0%, #ffffff 100%);
    }

    .toast-content {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .toast-icon {
      margin-right: 12px;
      font-size: 20px;
    }

    .toast-message {
      color: #333;
      font-size: 14px;
      line-height: 1.4;
      margin: 0;
    }

    .toast-close {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      font-size: 18px;
      padding: 0;
      margin-left: 12px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s;
    }

    .toast-close:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .toast::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5));
      width: 100%;
      animation: progressBar 5.1s linear;
    }

    @keyframes progressBar {
      0% {
        width: 100%;
      }
      100% {
        width: 0%;
      }
    }

    @media (max-width: 768px) {
      :host {
        top: 10px;
        right: 10px;
        left: 10px;
      }

      .toast {
        min-width: auto;
        max-width: none;
      }
    }
  `;

  constructor() {
    super();
    this.message = '';
    this.type = 'info';
    this.show = false;
    this._timeoutId = null;
  }

  _startAutoHide() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    // Auto hide after 5 seconds
    this._timeoutId = setTimeout(() => {
      this.hide();
    }, 5000);
  }

  _getIcon() {
    switch (this.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  }

  _getTypeClass() {
    return this.type || 'info';
  }

  showToast(message, type = 'info') {
    this.message = message;
    this.type = type;
    this.show = true;

    // Ensure the component is rendered before starting auto-hide
    this.updateComplete.then(() => {
      // Start auto-hide after a small delay to ensure animation starts
      setTimeout(() => {
        this._startAutoHide();
      }, 100);
    });
  }

  hide() {
    this.show = false;
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  _handleClose() {
    this.hide();
  }

  render() {
    if (!this.show) {
      return html``;
    }

    return html`
      <div class="toast ${this._getTypeClass()} ${this.show ? 'show' : ''}">
        <div class="toast-content">
          <span class="toast-icon">${this._getIcon()}</span>
          <p class="toast-message">${this.message}</p>
        </div>
        <button
          class="toast-close"
          @click=${this._handleClose}
          title="${this.t('close')}"
        >
          X
        </button>
      </div>
    `;
  }
}

customElements.define('toast-message', Toast);
