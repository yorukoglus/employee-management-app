import {LitElement, html} from 'lit';
import {employeeListStyles} from './employee-list.css.js';
import {commonStyles} from '../shared/common-styles.css.js';
import {I18nMixin} from '../shared/i18n-mixin.js';
import '../components/confirm-modal/confirm-modal.js';
import {listViewSvg} from '../shared/svgs/list-view.svg.js';
import {gridViewSvg} from '../shared/svgs/grid-view.svg.js';
import {editSvg} from '../shared/svgs/edit.svg.js';
import {deleteSvg} from '../shared/svgs/delete.svg.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';

/**
 * @property {Array} employees
 */
export class EmployeeList extends I18nMixin(LitElement) {
  static properties = {
    employees: {type: Array},
    view: {type: String},
    search: {type: String},
    page: {type: Number},
    pageSize: {type: Number},
    _showDeleteModal: {type: Boolean, state: true},
    _employeeToDelete: {type: Object, state: true},
    viewMode: {type: String, state: true}, // 'list' | 'grid'
  };

  static styles = [employeeListStyles, commonStyles];

  constructor() {
    super();
    this.employees = [];
    this.view = 'table';
    this.search = '';
    this.page = 1;
    this.pageSize = 10;
    this._showDeleteModal = false;
    this._employeeToDelete = null;
    this.viewMode = localStorage.getItem('employeeListViewMode') || 'list';
  }

  get filteredEmployees() {
    if (!this.search.trim()) {
      return this.employees;
    }

    const searchTerm = this.search.toLowerCase();
    return this.employees.filter(
      (emp) =>
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
    this.dispatchEvent(
      new CustomEvent('edit-employee', {
        detail: employee,
        bubbles: true,
        composed: true,
      })
    );
  }

  _deleteEmployee(employee) {
    this._employeeToDelete = employee;
    this._showDeleteModal = true;
  }

  _handleModalCancel() {
    this._showDeleteModal = false;
    this._employeeToDelete = null;
  }

  _handleModalProceed() {
    if (this._employeeToDelete) {
      this.dispatchEvent(
        new CustomEvent('delete-employee', {
          detail: this._employeeToDelete,
          bubbles: true,
          composed: true,
        })
      );
    }
    this._showDeleteModal = false;
    this._employeeToDelete = null;
  }

  _formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }

  get isMobile() {
    return window.innerWidth <= 768;
  }

  _setViewMode(mode) {
    this.viewMode = mode;
    localStorage.setItem('employeeListViewMode', mode);
  }

  render() {
    const filtered = this.filteredEmployees;
    const paginated = this.paginatedEmployees;
    return html`
      <div class="view-toggle-bar">
        <button
          class="view-toggle-btn ${this.viewMode === 'list' ? 'active' : ''}"
          @click=${() => this._setViewMode('list')}
          title=${this.t('listView')}
        >
          ${unsafeSVG(listViewSvg)}
        </button>
        <button
          class="view-toggle-btn ${this.viewMode === 'grid' ? 'active' : ''}"
          @click=${() => this._setViewMode('grid')}
          title=${this.t('gridView')}
        >
          ${unsafeSVG(gridViewSvg)}
        </button>
      </div>
      <div class="search-bar">
        <input
          class="search-input"
          type="text"
          placeholder=${this.t('searchPlaceholder')}
          @input=${(e) => {
            this.search = e.target.value;
            if (this.page !== 1) this.page = 1;
          }}
          value=${this.search}
        />
        <label>
          ${this.t('pageSize')}
          <select
            class="page-size-select"
            @change=${this._changePageSize}
            .value=${this.pageSize + ''}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </label>
        <span class="search-info"
          >${this.t('showingOf', {
            filtered: filtered.length,
            total: this.employees.length,
          })}</span
        >
      </div>
      ${this.viewMode === 'list'
        ? this.isMobile
          ? this._renderMobileCards(paginated)
          : this._renderTable(paginated)
        : this._renderGridCards(paginated)}
      <confirm-modal
        ?open=${this._showDeleteModal}
        .title=${this.t('modalTitle')}
        .message=${this._employeeToDelete
          ? this.t('deleteEmployeeConfirm', {
              firstName: this._employeeToDelete.firstName,
              lastName: this._employeeToDelete.lastName,
            })
          : ''}
        @cancel=${this._handleModalCancel}
        @proceed=${this._handleModalProceed}
      ></confirm-modal>
    `;
  }

  _renderTable(employees) {
    return html`
      <div class="employee-list-container">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr class="table-header">
                <th class="checkbox-cell">
                  <input type="checkbox" disabled />
                </th>
                <th>${this.t('firstName')}</th>
                <th>${this.t('lastName')}</th>
                <th>${this.t('dateOfEmployment')}</th>
                <th>${this.t('dateOfBirth')}</th>
                <th>${this.t('phone')}</th>
                <th>${this.t('email')}</th>
                <th>${this.t('department')}</th>
                <th>${this.t('position')}</th>
                <th>${this.t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map(
                (emp) => html`
                  <tr>
                    <td class="checkbox-cell"><input type="checkbox" /></td>
                    <td>
                      ${emp.firstName ||
                      (emp.name ? emp.name.split(' ')[0] : '')}
                    </td>
                    <td>
                      ${emp.lastName ||
                      (emp.name ? emp.name.split(' ')[1] || '' : '')}
                    </td>
                    <td>${this._formatDate(emp.dateOfEmployment)}</td>
                    <td>${this._formatDate(emp.dateOfBirth)}</td>
                    <td>${emp.phoneNumber || '-'}</td>
                    <td>${emp.email}</td>
                    <td>${emp.department || '-'}</td>
                    <td>${emp.position || '-'}</td>
                    <td>
                      <div class="action-icons">
                        <button
                          class="icon-btn"
                          title=${this.t('edit')}
                          @click=${() => this._editEmployee(emp)}
                        >
                          ${unsafeSVG(editSvg)}
                        </button>
                        <button
                          class="icon-btn"
                          title=${this.t('delete')}
                          @click=${() => this._deleteEmployee(emp)}
                        >
                          ${unsafeSVG(deleteSvg)}
                        </button>
                      </div>
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
        ${this._renderPagination()}
      </div>
    `;
  }

  _renderMobileCards(employees) {
    return html`
      <div>
        <div class="employee-list-container">
          ${employees.map(
            (emp) => html`
              <div class="card">
                <div class="mobile-card-header">
                  <div>
                    <div class="mobile-card-name">
                      ${emp.firstName ||
                      (emp.name ? emp.name.split(' ')[0] : '')}
                      ${emp.lastName ||
                      (emp.name ? emp.name.split(' ')[1] || '' : '')}
                    </div>
                    <div class="mobile-card-department">
                      ${emp.department || 'No Department'}
                    </div>
                  </div>
                </div>
                <div class="mobile-card-details">
                  <div class="mobile-card-detail">
                    <span class="mobile-card-label">${this.t('email')}</span>
                    <span class="mobile-card-value">${emp.email}</span>
                  </div>
                  <div class="mobile-card-detail">
                    <span class="mobile-card-label">${this.t('phone')}</span>
                    <span class="mobile-card-value"
                      >${emp.phoneNumber || 'No phone'}</span
                    >
                  </div>
                  <div class="mobile-card-detail">
                    <span class="mobile-card-label">${this.t('position')}</span>
                    <span class="mobile-card-value"
                      >${emp.position || 'No position'}</span
                    >
                  </div>
                  <div class="mobile-card-detail">
                    <span class="mobile-card-label">Employed</span>
                    <span class="mobile-card-value"
                      >${this._formatDate(emp.dateOfEmployment) ||
                      'Not specified'}</span
                    >
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <button
                    class="btn btn-primary"
                    @click=${() => this._editEmployee(emp)}
                  >
                    ${this.t('edit')}
                  </button>
                  <button
                    class="btn btn-danger"
                    @click=${() => this._deleteEmployee(emp)}
                  >
                    ${this.t('delete')}
                  </button>
                </div>
              </div>
            `
          )}
        </div>
        ${this._renderPagination()}
      </div>
    `;
  }

  _renderGridCards(employees) {
    return html`
      <div>
        <div class="employee-grid-container">
          ${employees.map(
            (emp) => html`
              <div class="card">
                <div class="employee-card-row">
                  <div class="employee-item">
                    <span class="label">${this.t('firstName')}:</span>
                    <div class="value">${emp.firstName}</div>
                  </div>
                  <div class="employee-item">
                    <span class="label">${this.t('lastName')}:</span>
                    <div class="value">${emp.lastName}</div>
                  </div>
                </div>
                <div class="employee-card-row">
                  <div class="employee-item">
                    <span class="label">${this.t('dateOfEmployment')}:</span>
                    <div class="value">
                      ${this._formatDate(emp.dateOfEmployment)}
                    </div>
                  </div>
                  <div class="employee-item">
                    <span class="label">${this.t('dateOfBirth')}:</span>
                    <div class="value">
                      ${this._formatDate(emp.dateOfBirth)}
                    </div>
                  </div>
                </div>
                <div class="employee-card-row">
                  <div class="employee-item">
                    <span class="label">${this.t('phone')}:</span>
                    <div class="value">${emp.phoneNumber}</div>
                  </div>
                  <div class="employee-item">
                    <span class="label">${this.t('email')}:</span>
                    <div class="value">${emp.email}</div>
                  </div>
                </div>
                <div class="employee-card-row">
                  <div class="employee-item">
                    <span class="label">${this.t('department')}:</span>
                    <div class="value">${emp.department}</div>
                  </div>
                  <div class="employee-item">
                    <span class="label">${this.t('position')}:</span>
                    <div class="value">${emp.position}</div>
                  </div>
                </div>
                <div class="employee-card-actions">
                  <button
                    class="btn btn-primary"
                    @click=${() => this._editEmployee(emp)}
                  >
                    <span class="icon">✏️</span> ${this.t('edit')}
                  </button>
                  <button
                    class="btn btn-danger"
                    @click=${() => this._deleteEmployee(emp)}
                  >
                    <span class="icon">🗑️</span> ${this.t('delete')}
                  </button>
                </div>
              </div>
            `
          )}
        </div>
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
        <button
          class="pagination-btn"
          @click=${this._previousPage}
          ?disabled=${this.page <= 1}
        >
          &lt;
        </button>
        ${start > 1 ? html`<span>...</span>` : ''}
        ${pageNumbers.map(
          (num) => html`
            <button
              class="page-number ${this.page === num ? 'active' : ''}"
              @click=${() => this._goToPage(num)}
            >
              ${num}
            </button>
          `
        )}
        ${end < totalPages ? html`<span>...</span>` : ''}
        <button
          class="pagination-btn"
          @click=${this._nextPage}
          ?disabled=${this.page >= totalPages}
        >
          &gt;
        </button>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._handleResize.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._handleResize.bind(this));
  }

  _handleResize() {
    this.requestUpdate();
  }
}

customElements.define('employee-list', EmployeeList);
