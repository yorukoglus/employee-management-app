import { LitElement, html } from 'lit';
import { confirmModalStyles } from './confirm-modal.css.js';
import { commonStyles } from '../../shared/common-styles.css.js';
import { I18nMixin } from '../../shared/i18n-mixin.js';

export class ConfirmModal extends I18nMixin(LitElement) {
  static properties = {
    open: { type: Boolean },
    title: { type: String },
    message: { type: String },
  };

  static styles = [confirmModalStyles, commonStyles];

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.message = '';
  }

  _close() {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
  }

  _proceed() {
    this.dispatchEvent(new CustomEvent('proceed', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title">${this.title}</span>
          <button class="close-btn" @click=${this._close} title=${this.t('close')}>&#10005;</button>
        </div>
        <div class="modal-message">${this.message}</div>
        <div class="modal-actions">
          <button class="btn btn-danger" @click=${this._proceed}>${this.t('proceed')}</button>
          <button class="btn btn-outline" @click=${this._close}>${this.t('cancel')}</button>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-modal', ConfirmModal); 