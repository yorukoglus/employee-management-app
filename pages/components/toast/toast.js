import {LitElement, html} from 'lit';
import {I18nMixin} from '../../shared/i18n-mixin.js';
import {toastStyles} from './toasts.css.js';

export class Toast extends I18nMixin(LitElement) {
  static properties = {
    message: {type: String},
    type: {type: String}, // 'success', 'error', 'info'
    show: {type: Boolean, state: true},
    _timeoutId: {type: Number, state: true},
  };

  static styles = toastStyles;

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
