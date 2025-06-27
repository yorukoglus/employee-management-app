import { i18n } from './i18n.js';

export const I18nMixin = (superClass) => class extends superClass {
  constructor() {
    super();
    this._languageChangeHandler = this._handleLanguageChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('languageChanged', this._languageChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('languageChanged', this._languageChangeHandler);
  }

  _handleLanguageChange() {
    this.requestUpdate();
  }

  t(key, params = {}) {
    return i18n.t(key, params);
  }

  getCurrentLanguage() {
    return i18n.getCurrentLanguage();
  }

  setLanguage(language) {
    i18n.setLanguage(language);
  }
}; 