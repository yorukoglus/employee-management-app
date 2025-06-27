import { LitElement, html } from 'lit';
import { pageStyles } from '../shared/page-styles.css.js';
import { icons } from '../shared/icons.js';
import { navigation, routeUtils } from '../shared/utils.js';
import './employee-form.js';
import { employeeService } from '../services/employee-service.js';

export class EmployeeFormPage extends LitElement {
  static properties = {
    employee: { type: Object },
    isEdit: { type: Boolean },
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
    if (this.isEdit) {
      employeeService.updateEmployee(emp);
    } else {
      employeeService.addEmployee(emp);
    }
    navigation.goToEmployeeList();
  }

  _handleNavigateToList() {
    navigation.goToEmployeeList();
  }

  render() {
    return html`
      <div class="page-header">
        ${icons.form}
        ${this.isEdit ? 'Edit Employee' : 'Add Employee'}
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