import { LitElement, html } from 'lit';
import { employeeListStyles } from './employee-list.css.js';

export class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    view: { type: String },
    search: { type: String },
    page: { type: Number },
    pageSize: { type: Number },
  };

  static styles = employeeListStyles;

  constructor() {
    super();
    this.employees = [];
    this.view = 'table';
    this.search = '';
    this.page = 1;
    this.pageSize = 5;
  }

  get filteredEmployees() {
    if (!this.search.trim()) {
      return this.employees;
    }
    
    const searchTerm = this.search.toLowerCase();
    return this.employees.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.department.toLowerCase().includes(searchTerm) ||
      emp.email.toLowerCase().includes(searchTerm) ||
      (emp.firstName && emp.firstName.toLowerCase().includes(searchTerm)) ||
      (emp.lastName && emp.lastName.toLowerCase().includes(searchTerm)) ||
      (emp.phoneNumber && emp.phoneNumber.includes(searchTerm))
    );
  }

  get paginatedEmployees() {
    const filtered = this.filteredEmployees;
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filtered.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  _goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
    }
  }

  _previousPage() {
    this._goToPage(this.page - 1);
  }

  _nextPage() {
    this._goToPage(this.page + 1);
  }

  _changePageSize(e) {
    this.pageSize = parseInt(e.target.value);
    this.page = 1;
  }

  _editEmployee(employee) {
    this.dispatchEvent(new CustomEvent('edit-employee', {
      detail: employee,
      bubbles: true,
      composed: true
    }));
  }

  _deleteEmployee(employee) {
    this.dispatchEvent(new CustomEvent('delete-employee', {
      detail: employee,
      bubbles: true,
      composed: true
    }));
  }

  _formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }

  render() {
    const filtered = this.filteredEmployees;
    const paginated = this.paginatedEmployees;
    
    return html`
      <div class="search-bar">
        <input 
          class="search-input"
          type="text" 
          placeholder="Search by name, department, email, or phone..." 
          @input=${e => this.search = e.target.value}
          value=${this.search}
        />
        <label>
          Page size:
          <select class="page-size-select" @change=${this._changePageSize} .value=${this.pageSize}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </label>
        <span class="search-info">Showing ${filtered.length} of ${this.employees.length} employees</span>
      </div>
      ${this._renderTable(paginated)}
      ${this._renderMobileCards(paginated)}
    `;
  }

  _renderTable(employees) {
    return html`
      <div class="employee-list-container">
        <table>
          <thead>
            <tr class="table-header">
              <th class="checkbox-cell"><input type="checkbox" disabled /></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Employment</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${employees.map(emp => html`
              <tr>
                <td class="checkbox-cell"><input type="checkbox" /></td>
                <td>${emp.firstName || (emp.name ? emp.name.split(' ')[0] : '')}</td>
                <td>${emp.lastName || (emp.name ? emp.name.split(' ')[1] || '' : '')}</td>
                <td>${this._formatDate(emp.dateOfEmployment)}</td>
                <td>${this._formatDate(emp.dateOfBirth)}</td>
                <td>${emp.phoneNumber || '-'}</td>
                <td>${emp.email}</td>
                <td>${emp.department || '-'}</td>
                <td>${emp.position || '-'}</td>
                <td>
                  <div class="action-icons">
                    <button class="icon-btn" title="Edit" @click=${() => this._editEmployee(emp)}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                    </button>
                    <button class="icon-btn" title="Delete" @click=${() => this._deleteEmployee(emp)}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M5 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
        ${this._renderPagination()}
      </div>
    `;
  }

  _renderMobileCards(employees) {
    return html`
      <div class="employee-list-container">
        ${employees.map(emp => html`
          <div class="mobile-card">
            <div class="mobile-card-header">
              <div>
                <div class="mobile-card-name">${emp.firstName || (emp.name ? emp.name.split(' ')[0] : '')} ${emp.lastName || (emp.name ? emp.name.split(' ')[1] || '' : '')}</div>
                <div class="mobile-card-department">${emp.department || 'No Department'}</div>
              </div>
            </div>
            <div class="mobile-card-details">
              <div class="mobile-card-detail">
                <span class="mobile-card-label">Email</span>
                <span class="mobile-card-value">${emp.email}</span>
              </div>
              <div class="mobile-card-detail">
                <span class="mobile-card-label">Phone</span>
                <span class="mobile-card-value">${emp.phoneNumber || 'No phone'}</span>
              </div>
              <div class="mobile-card-detail">
                <span class="mobile-card-label">Position</span>
                <span class="mobile-card-value">${emp.position || 'No position'}</span>
              </div>
              <div class="mobile-card-detail">
                <span class="mobile-card-label">Employed</span>
                <span class="mobile-card-value">${this._formatDate(emp.dateOfEmployment) || 'Not specified'}</span>
              </div>
            </div>
            <div class="mobile-card-actions">
              <button class="mobile-action-btn" @click=${() => this._editEmployee(emp)}>
                Edit
              </button>
              <button class="mobile-action-btn delete" @click=${() => this._deleteEmployee(emp)}>
                Delete
              </button>
            </div>
          </div>
        `)}
        ${this._renderPagination()}
      </div>
    `;
  }

  _renderPagination() {
    const totalPages = this.totalPages;
    if (totalPages <= 1) return '';
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, this.page - 2);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return html`
      <div class="pagination">
        <button class="pagination-btn" @click=${this._previousPage} ?disabled=${this.page <= 1}>&lt;</button>
        ${start > 1 ? html`<span>...</span>` : ''}
        ${pageNumbers.map(num => html`
          <button class="page-number ${this.page === num ? 'active' : ''}" @click=${() => this._goToPage(num)}>${num}</button>
        `)}
        ${end < totalPages ? html`<span>...</span>` : ''}
        <button class="pagination-btn" @click=${this._nextPage} ?disabled=${this.page >= totalPages}>&gt;</button>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList); 