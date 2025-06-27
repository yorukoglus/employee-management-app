import { LitElement, html } from 'lit';
import { pageStyles } from '../shared/page-styles.css.js';
import { icons } from '../shared/icons.js';
import { navigation, confirmations } from '../shared/utils.js';
import { I18nMixin } from '../shared/i18n-mixin.js';
import './employee-list.js';
import { employeeService } from '../services/employee-service.js';

export class EmployeeListPage extends I18nMixin(LitElement) {
  static properties = {
    employees: { type: Array },
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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  _handleDeleteEmployee(e) {
    const emp = e.detail;
    if (confirmations.deleteEmployee(emp)) {
      employeeService.deleteEmployee(emp.id);
    }
  }

  _handleEditEmployee(e) {
    const emp = e.detail;
    navigation.goToEditEmployee(emp.id);
  }

  _handleEmployeeSaved(e) {
    const emp = e.detail;
    if (emp.id) {
      employeeService.updateEmployee(emp);
    } else {
      employeeService.addEmployee(emp);
    }
    navigation.goToEmployeeList();
  }

  render() {
    return html`
      <div class="page-header">
        ${icons.employeeList}
        ${this.t('employeeList')}
      </div>
      <employee-list 
        .employees=${this.employees}
        @edit-employee=${this._handleEditEmployee}
        @delete-employee=${this._handleDeleteEmployee}
        @employee-saved=${this._handleEmployeeSaved}
      ></employee-list>
    `;
  }
}

customElements.define('employee-list-page', EmployeeListPage); 