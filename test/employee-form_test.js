import {EmployeeForm} from '../pages/employee-form/employee-form.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import sinon from 'sinon';
import {i18n} from '../pages/shared/i18n.js';

suite('employee-form', () => {
  let element;
  const mockEmployee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    department: 'Engineering',
    position: 'Developer',
    dateOfEmployment: '2023-01-15',
    dateOfBirth: '1990-05-20',
  };

  setup(async () => {
    i18n.setLanguage('tr');
    element = await fixture(html`<employee-form></employee-form>`);
  });

  test('is defined', () => {
    const el = document.createElement('employee-form');
    assert.instanceOf(el, EmployeeForm);
  });

  test('has correct default properties', () => {
    assert.isNull(element.employee);
    assert.deepEqual(element.errors, {});
    assert.isArray(element.departments);
    assert.isArray(element.positions);
    assert.isFalse(element._editMode);
  });

  test('initializes form data correctly', () => {
    const initialData = element._getInitialFormData();
    assert.equal(initialData.firstName, '');
    assert.equal(initialData.lastName, '');
    assert.equal(initialData.email, '');
    assert.equal(initialData.phoneNumber, '');
    assert.equal(initialData.department, '');
    assert.equal(initialData.position, '');
    assert.equal(initialData.dateOfEmployment, '');
    assert.equal(initialData.dateOfBirth, '');
  });

  test('updates form data when employee property changes', async () => {
    element.employee = mockEmployee;
    await element.updateComplete;

    assert.deepEqual(element._formData, mockEmployee);
    assert.isTrue(element._editMode);
  });

  test('resets form data when employee is null', async () => {
    element.employee = mockEmployee;
    await element.updateComplete;

    element.employee = null;
    await element.updateComplete;

    assert.deepEqual(element._formData, element._getInitialFormData());
    assert.isFalse(element._editMode);
  });

  test('validates required fields correctly', () => {
    const isValid = element._validateForm();
    assert.isFalse(isValid);
    assert.property(element.errors, 'firstName');
    assert.property(element.errors, 'lastName');
    assert.property(element.errors, 'email');
    assert.property(element.errors, 'phoneNumber');
    assert.property(element.errors, 'department');
    assert.property(element.errors, 'position');
    assert.property(element.errors, 'dateOfEmployment');
    assert.property(element.errors, 'dateOfBirth');
  });

  test('validates firstName minimum length', () => {
    element._formData.firstName = 'A';
    const isValid = element._validateForm();
    assert.isFalse(isValid);
    assert.property(element.errors, 'firstName');
  });

  test('validates lastName minimum length', () => {
    element._formData.lastName = 'B';
    const isValid = element._validateForm();
    assert.isFalse(isValid);
    assert.property(element.errors, 'lastName');
  });

  test('validates email format', () => {
    element._formData.email = 'invalid-email';
    const isValid = element._validateForm();
    assert.isFalse(isValid);
    assert.property(element.errors, 'email');
  });

  test('validates phone number format', () => {
    element._formData.phoneNumber = 'invalid-phone';
    const isValid = element._validateForm();
    assert.isFalse(isValid);
    assert.property(element.errors, 'phoneNumber');
  });

  test('validates date of employment is not in future', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    element._formData.dateOfEmployment = futureDate.toISOString().split('T')[0];

    const isValid = element._validateForm();
    assert.isFalse(isValid);
    assert.property(element.errors, 'dateOfEmployment');
  });

  test('validates date of birth age range', () => {
    const tooYoungDate = new Date();
    tooYoungDate.setFullYear(tooYoungDate.getFullYear() - 10);
    element._formData.dateOfBirth = tooYoungDate.toISOString().split('T')[0];

    const isValid = element._validateForm();
    assert.isFalse(isValid);
    assert.property(element.errors, 'dateOfBirth');
  });

  test('validates complete form successfully', () => {
    element._formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      department: 'Engineering',
      position: 'Developer',
      dateOfEmployment: '2023-01-15',
      dateOfBirth: '1990-05-20',
    };

    const isValid = element._validateForm();
    assert.isTrue(isValid);
    assert.deepEqual(element.errors, {});
  });

  test('updates field and clears error', () => {
    element.errors.firstName = 'Error message';
    element._updateField('firstName', 'John');

    assert.equal(element._formData.firstName, 'John');
    assert.notProperty(element.errors, 'firstName');
  });

  test('dispatches employee-saved event on successful submit', async () => {
    const savedSpy = sinon.spy();
    element.addEventListener('employee-saved', savedSpy);

    element._formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      department: 'Engineering',
      position: 'Developer',
      dateOfEmployment: '2023-01-15',
      dateOfBirth: '1990-05-20',
    };

    const event = {preventDefault: sinon.spy()};
    await element._handleSubmit(event);

    assert.isTrue(event.preventDefault.called);
    assert.isTrue(savedSpy.called);
    assert.property(savedSpy.firstCall.args[0].detail, 'id');
    assert.property(savedSpy.firstCall.args[0].detail, 'name');
  });

  test('dispatches navigate-to-list event on submit', async () => {
    const navigateSpy = sinon.spy();
    element.addEventListener('navigate-to-list', navigateSpy);

    element._formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      department: 'Engineering',
      position: 'Developer',
      dateOfEmployment: '2023-01-15',
      dateOfBirth: '1990-05-20',
    };

    const event = {preventDefault: sinon.spy()};
    await element._handleSubmit(event);

    assert.isTrue(navigateSpy.called);
  });

  test('dispatches navigate-to-list event on cancel', () => {
    const navigateSpy = sinon.spy();
    element.addEventListener('navigate-to-list', navigateSpy);

    element._navigateToList();

    assert.isTrue(navigateSpy.called);
  });

  test('renders form fields correctly', async () => {
    const firstNameInput =
      element.shadowRoot.querySelector('input[type="text"]');
    const emailInput = element.shadowRoot.querySelector('input[type="email"]');
    const phoneInput = element.shadowRoot.querySelector('input[type="tel"]');
    const employmentDateInput =
      element.shadowRoot.querySelector('input[type="date"]');
    const positionSelect = element.shadowRoot.querySelector('select');

    assert.isNotNull(firstNameInput);
    assert.isNotNull(emailInput);
    assert.isNotNull(phoneInput);
    assert.isNotNull(employmentDateInput);
    assert.isNotNull(positionSelect);
  });

  test('shows error messages when validation fails', async () => {
    // Set invalid data
    element.formData = {
      firstName: '',
      lastName: '',
      email: 'invalid-email',
      phoneNumber: '123',
      department: '',
      position: '',
      dateOfEmployment: '',
      dateOfBirth: '',
    };

    await element.updateComplete;

    // Trigger validation
    element._validateForm();
    await element.updateComplete;

    // Check for error messages
    const errorElements = element.shadowRoot.querySelectorAll('.error-message');
    assert.isTrue(errorElements.length > 0);
  });

  test('applies error class to form groups with errors', async () => {
    // Set invalid data
    element.formData = {
      firstName: '',
      lastName: '',
      email: 'invalid-email',
      phoneNumber: '123',
      department: '',
      position: '',
      dateOfEmployment: '',
      dateOfBirth: '',
    };

    await element.updateComplete;

    // Trigger validation
    element._validateForm();
    await element.updateComplete;

    // Check for error classes
    const formGroups = element.shadowRoot.querySelectorAll('.form-group');
    const hasErrorClass = Array.from(formGroups).some((group) =>
      group.classList.contains('error')
    );
    assert.isTrue(hasErrorClass);
  });

  test('updates form data when input changes', async () => {
    const firstNameInput =
      element.shadowRoot.querySelector('input[type="text"]');
    firstNameInput.value = 'John';
    firstNameInput.dispatchEvent(new Event('input'));

    assert.equal(element._formData.firstName, 'John');
  });

  test('generates employee name correctly', async () => {
    element._formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      department: 'Engineering',
      position: 'Developer',
      dateOfEmployment: '2023-01-15',
      dateOfBirth: '1990-05-20',
    };

    const event = {preventDefault: sinon.spy()};
    const savedSpy = sinon.spy();
    element.addEventListener('employee-saved', savedSpy);

    await element._handleSubmit(event);

    assert.equal(savedSpy.firstCall.args[0].detail.name, 'John Doe');
  });

  test('generates new id in add mode', async () => {
    const originalDateNow = Date.now;
    const mockTimestamp = 1234567890;
    Date.now = () => mockTimestamp;

    element._formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      department: 'Engineering',
      position: 'Developer',
      dateOfEmployment: '2023-01-15',
      dateOfBirth: '1990-05-20',
    };

    const event = {preventDefault: sinon.spy()};
    const savedSpy = sinon.spy();
    element.addEventListener('employee-saved', savedSpy);

    await element._handleSubmit(event);

    assert.equal(savedSpy.firstCall.args[0].detail.id, mockTimestamp);

    Date.now = originalDateNow;
  });

  test('prevents form submission when validation fails', async () => {
    const event = {preventDefault: sinon.spy()};
    const savedSpy = sinon.spy();
    element.addEventListener('employee-saved', savedSpy);

    await element._handleSubmit(event);

    assert.isTrue(event.preventDefault.called);
    assert.isFalse(savedSpy.called);
  });
});
