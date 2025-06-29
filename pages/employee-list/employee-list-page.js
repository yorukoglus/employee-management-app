import {LitElement, html} from 'lit';
import {pageStyles} from '../shared/page-styles.css.js';
import {navigation} from '../shared/utils.js';
import {I18nMixin} from '../shared/i18n-mixin.js';
import './employee-list.js';
import {employeeService} from '../services/employee-service.js';
import '../components/toast/toast.js';

export class EmployeeListPage extends I18nMixin(LitElement) {
  static properties = {
    employees: {type: Array},
  };

  static styles = pageStyles;

  constructor() {
    super();
    this.employees = employeeService.getEmployees();
    this._unsubscribe = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._unsubscribe = employeeService.subscribe((employees) => {
      this.employees = employees;
    });

    this._checkPendingToast();
  }

  _checkPendingToast() {
    const lastOperation = localStorage.getItem('lastOperation');
    if (lastOperation) {
      try {
        const operation = JSON.parse(lastOperation);
        const toastType = operation.success ? 'success' : 'error';
        this._showToast(operation.message, toastType);
        localStorage.removeItem('lastOperation');
      } catch (error) {
        console.error('Error parsing lastOperation:', error);
        localStorage.removeItem('lastOperation');
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  _handleDeleteEmployee(e) {
    const emp = e.detail;
    const result = employeeService.deleteEmployee(emp.id);
    if (result) {
      this._showToast(this.t('employeeDeletedSuccess'), 'success');
    } else {
      this._showToast(this.t('operationFailed'), 'error');
    }
  }

  _handleEditEmployee(e) {
    const emp = e.detail;
    navigation.goToEditEmployee(emp.id);
  }

  _handleEmployeeSaved(e) {
    const emp = e.detail;
    let result = false;

    if (emp.id) {
      result = employeeService.updateEmployee(emp);
      if (result) {
        this._showToast(this.t('employeeUpdatedSuccess'), 'success');
      } else {
        this._showToast(this.t('operationFailed'), 'error');
      }
    } else {
      result = employeeService.addEmployee(emp);
      if (result) {
        this._showToast(this.t('employeeAddedSuccess'), 'success');
      } else {
        this._showToast(this.t('operationFailed'), 'error');
      }
    }

    navigation.goToEmployeeList();
  }

  _showToast(message, type = 'info') {
    this.updateComplete.then(() => {
      const toast = this.shadowRoot.querySelector('toast-message');
      if (toast) {
        toast.showToast(message, type);
      }
    });
  }

  render() {
    return html`
      <div class="page-header">${this.t('employeeList')}</div>
      <employee-list
        .employees=${this.employees}
        @edit-employee=${this._handleEditEmployee}
        @delete-employee=${this._handleDeleteEmployee}
        @employee-saved=${this._handleEmployeeSaved}
      ></employee-list>
      <toast-message></toast-message>
    `;
  }
}

customElements.define('employee-list-page', EmployeeListPage);
