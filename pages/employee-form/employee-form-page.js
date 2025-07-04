import {LitElement, html} from 'lit';
import {pageStyles} from '../shared/page-styles.css.js';
import {navigation, routeUtils} from '../shared/utils.js';
import {I18nMixin} from '../shared/i18n-mixin.js';
import './employee-form.js';
import {employeeService} from '../services/employee-service.js';

export class EmployeeFormPage extends I18nMixin(LitElement) {
  static properties = {
    employee: {type: Object},
    isEdit: {type: Boolean},
  };

  static styles = pageStyles;

  constructor() {
    super();
    this.employee = null;
    this.isEdit = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadEmployeeFromRoute();
  }

  _loadEmployeeFromRoute() {
    this.isEdit = routeUtils.isEditMode();
    if (this.isEdit) {
      const id = routeUtils.getEmployeeIdFromPath();
      this.employee = employeeService.getEmployeeById(id);
    } else {
      this.employee = null;
    }
  }

  _handleEmployeeSaved(e) {
    const emp = e.detail;
    let result = false;

    if (this.isEdit) {
      result = employeeService.updateEmployee(emp);
      if (result) {
        localStorage.setItem(
          'lastOperation',
          JSON.stringify({
            type: 'update',
            success: true,
            message: this.t('employeeUpdatedSuccess'),
          })
        );
      } else {
        localStorage.setItem(
          'lastOperation',
          JSON.stringify({
            type: 'update',
            success: false,
            message: this.t('operationFailed'),
          })
        );
      }
    } else {
      result = employeeService.addEmployee(emp);
      if (result) {
        localStorage.setItem(
          'lastOperation',
          JSON.stringify({
            type: 'add',
            success: true,
            message: this.t('employeeAddedSuccess'),
          })
        );
      } else {
        localStorage.setItem(
          'lastOperation',
          JSON.stringify({
            type: 'add',
            success: false,
            message: this.t('operationFailed'),
          })
        );
      }
    }

    navigation.goToEmployeeList();
  }

  _handleNavigateToList() {
    navigation.goToEmployeeList();
  }

  render() {
    return html`
      <div class="page-header">
        ${this.isEdit ? this.t('editEmployee') : this.t('addEmployee')}
      </div>
      <employee-form
        .employee=${this.employee}
        @employee-saved=${this._handleEmployeeSaved}
        @navigate-to-list=${this._handleNavigateToList}
      ></employee-form>
    `;
  }
}

customElements.define('employee-form-page', EmployeeFormPage);
