import { LitElement, html } from 'lit';
import { employeeFormStyles } from './employee-form.css.js';
import { commonStyles } from '../shared/common-styles.css.js';
import { confirmations } from '../shared/utils.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object }, // If null, add mode; if object, edit mode
    errors: { type: Object },
    departments: { type: Array },
    positions: { type: Array },
    _formData: { type: Object, state: true },
    _editMode: { type: Boolean, state: true },
  };

  static styles = [employeeFormStyles, commonStyles];

  constructor() {
    super();
    this.employee = null;
    this.errors = {};
    this.departments = ['Analytics', 'Tech'];
    this.positions = ['Junior', 'Medior', 'Senior'];
    this._formData = this._getInitialFormData();
    this._editMode = false;
  }

  updated(changedProps) {
    if (changedProps.has('employee')) {
      if (this.employee) {
        this._formData = { ...this.employee };
        this._editMode = true;
      } else {
        this._formData = this._getInitialFormData();
        this._editMode = false;
      }
    }
  }

  _getInitialFormData() {
    return {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: '',
      position: ''
    };
  }

  _validateForm() {
    const errors = {};
    // First Name validation
    if (!this._formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (this._formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    // Last Name validation
    if (!this._formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (this._formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    // Date of Employment validation
    if (!this._formData.dateOfEmployment) {
      errors.dateOfEmployment = 'Date of employment is required';
    } else {
      const employmentDate = new Date(this._formData.dateOfEmployment);
      const today = new Date();
      if (employmentDate > today) {
        errors.dateOfEmployment = 'Date of employment cannot be in the future';
      }
    }
    // Date of Birth validation
    if (!this._formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(this._formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 100) {
        errors.dateOfBirth = 'Employee must be between 18 and 100 years old';
      }
    }
    // Phone Number validation
    if (!this._formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(this._formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
        errors.phoneNumber = 'Please enter a valid phone number';
      }
    }
    // Email validation
    if (!this._formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this._formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    // Department validation
    if (!this._formData.department) {
      errors.department = 'Department is required';
    }
    // Position validation
    if (!this._formData.position) {
      errors.position = 'Position is required';
    }
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  _updateField(field, value) {
    this._formData = { ...this._formData, [field]: value };
    if (this.errors[field]) {
      delete this.errors[field];
      this.errors = { ...this.errors };
    }
  }

  async _handleSubmit(e) {
    e.preventDefault();
    if (!this._validateForm()) return;
    let confirmed = true;
    if (this._editMode) {
      confirmed = confirmations.updateEmployee();
    }
    if (!confirmed) return;
    // Create or update employee object
    const employeeObj = {
      ...this._formData,
      id: this._editMode && this.employee && this.employee.id ? this.employee.id : Date.now(),
      name: `${this._formData.firstName} ${this._formData.lastName}`,
    };
    this.dispatchEvent(new CustomEvent('employee-saved', {
      detail: employeeObj,
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new CustomEvent('navigate-to-list', {
      bubbles: true,
      composed: true
    }));
  }

  _navigateToList() {
    this.dispatchEvent(new CustomEvent('navigate-to-list', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="form-container">
        <form @submit=${this._handleSubmit}>
          <div class="form-group ${this.errors.firstName ? 'error' : ''}">
            <label>First Name</label>
            <input 
              type="text" 
              .value=${this._formData.firstName}
              @input=${e => this._updateField('firstName', e.target.value)}
              placeholder="First Name"
            />
            ${this.errors.firstName ? html`<span class="error-message">${this.errors.firstName}</span>` : ''}
          </div>
          <div class="form-group ${this.errors.lastName ? 'error' : ''}">
            <label>Last Name</label>
            <input 
              type="text" 
              .value=${this._formData.lastName}
              @input=${e => this._updateField('lastName', e.target.value)}
              placeholder="Last Name"
            />
            ${this.errors.lastName ? html`<span class="error-message">${this.errors.lastName}</span>` : ''}
          </div>
          <div class="form-group ${this.errors.dateOfEmployment ? 'error' : ''}">
            <label>Date of Employment</label>
            <input 
              type="date" 
              .value=${this._formData.dateOfEmployment}
              @input=${e => this._updateField('dateOfEmployment', e.target.value)}
            />
            ${this.errors.dateOfEmployment ? html`<span class="error-message">${this.errors.dateOfEmployment}</span>` : ''}
          </div>
          <div class="form-group ${this.errors.dateOfBirth ? 'error' : ''}">
            <label>Date of Birth</label>
            <input 
              type="date" 
              .value=${this._formData.dateOfBirth}
              @input=${e => this._updateField('dateOfBirth', e.target.value)}
            />
            ${this.errors.dateOfBirth ? html`<span class="error-message">${this.errors.dateOfBirth}</span>` : ''}
          </div>
          <div class="form-group ${this.errors.phoneNumber ? 'error' : ''}">
            <label>Phone</label>
            <input 
              type="tel" 
              .value=${this._formData.phoneNumber}
              @input=${e => this._updateField('phoneNumber', e.target.value)}
              placeholder="Phone"
            />
            ${this.errors.phoneNumber ? html`<span class="error-message">${this.errors.phoneNumber}</span>` : ''}
          </div>
          <div class="form-group ${this.errors.email ? 'error' : ''}">
            <label>Email</label>
            <input 
              type="email" 
              .value=${this._formData.email}
              @input=${e => this._updateField('email', e.target.value)}
              placeholder="Email"
            />
            ${this.errors.email ? html`<span class="error-message">${this.errors.email}</span>` : ''}
          </div>
          <div class="form-group ${this.errors.department ? 'error' : ''}">
            <label>Department</label>
            <input 
              type="text" 
              .value=${this._formData.department}
              @input=${e => this._updateField('department', e.target.value)}
              placeholder="Department"
            />
            ${this.errors.department ? html`<span class="error-message">${this.errors.department}</span>` : ''}
          </div>
          <div class="form-group ${this.errors.position ? 'error' : ''}">
            <label>Position</label>
            <select 
              .value=${this._formData.position}
              @change=${e => this._updateField('position', e.target.value)}
            >
              <option value="">Please Select</option>
              ${this.positions.map(pos => html`
                <option value=${pos}>${pos}</option>
              `)}
            </select>
            ${this.errors.position ? html`<span class="error-message">${this.errors.position}</span>` : ''}
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-danger">Save</button>
            <button type="button" class="btn btn-outline" @click=${this._navigateToList}>Cancel</button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('employee-form', EmployeeForm); 