import { LitElement, html } from 'lit';
import { employeeManagerStyles } from './employee-manager.css.js';
import { mockEmployees } from './mock-employees.js';
import '../app-nav/app-nav.js';
import '../employee-list/employee-list.js';
import '../employee-form/employee-form.js';

export class EmployeeManager extends LitElement {
  static properties = {
    employees: { type: Array },
    currentView: { type: String },
    selectedEmployee: { type: Object },
  };

  static styles = employeeManagerStyles;

  constructor() {
    super();
    this.employees = mockEmployees;
    this.currentView = 'list'; // 'list', 'add', 'edit'
    this.selectedEmployee = null;
  }

  _handleDeleteEmployee(e) {
    const emp = e.detail;
    const confirmed = window.confirm(`Are you sure you want to delete ${emp.firstName} ${emp.lastName}? This action cannot be undone.`);
    if (confirmed) {
      this.employees = this.employees.filter(x => x.id !== emp.id);
    }
  }

  _handleNavigateToList() {
    this.currentView = 'list';
    this.selectedEmployee = null;
  }

  _showAddEmployee() {
    this.currentView = 'add';
    this.selectedEmployee = null;
  }

  _showEditEmployee(e) {
    this.selectedEmployee = e.detail;
    this.currentView = 'edit';
  }

  _handleEmployeeSaved(e) {
    const emp = e.detail;
    const idx = this.employees.findIndex(x => x.id === emp.id);
    if (idx !== -1) {
      // Update
      this.employees = [
        ...this.employees.slice(0, idx),
        emp,
        ...this.employees.slice(idx + 1)
      ];
    } else {
      // Add
      this.employees = [...this.employees, emp];
    }
    this.selectedEmployee = null;
  }

  _handleNav(e) {
    const page = e.detail.page;
    if (page === 'list') {
      this.currentView = page;
      this.selectedEmployee = null;
    } else if (page === 'add') {
      this._showAddEmployee();
    }
  }

  render() {
    return html`
      <app-nav .active=${this.currentView === 'edit' ? 'list' : this.currentView} @navigate=${this._handleNav}></app-nav>
      <div class="page-header">
        <svg width="28" height="28" fill="none" stroke="#ff6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="20" height="20" rx="6"/><path d="M8 10h8M8 14h8M8 18h4"/></svg>
        Employee List
      </div>
      ${this.currentView === 'list' ? html`
        <employee-list 
          .employees=${this.employees}
          @edit-employee=${this._showEditEmployee}
          @delete-employee=${this._handleDeleteEmployee}
          @employee-saved=${this._handleEmployeeSaved}
          @navigate-to-list=${this._handleNavigateToList}
        ></employee-list>
      ` : this.currentView === 'add' || this.currentView === 'edit' ? html`
        <employee-form
          .employee=${this.currentView === 'edit' ? this.selectedEmployee : null}
          @employee-saved=${this._handleEmployeeSaved}
          @navigate-to-list=${this._handleNavigateToList}
        ></employee-form>
      ` : ''}
    `;
  }
}

customElements.define('employee-manager', EmployeeManager); 