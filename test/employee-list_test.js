import {EmployeeList} from '../pages/employee-list/employee-list.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import sinon from 'sinon';

suite('employee-list', () => {
  let element;
  const mockEmployees = [
    {
      id: 1,
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      department: 'Engineering',
      position: 'Developer',
      dateOfEmployment: '2023-01-15',
      dateOfBirth: '1990-05-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '098-765-4321',
      department: 'Marketing',
      position: 'Manager',
      dateOfEmployment: '2022-08-10',
      dateOfBirth: '1985-12-03',
    },
  ];

  setup(async () => {
    element = await fixture(html`<employee-list></employee-list>`);
    element.employees = mockEmployees;
    await element.updateComplete;
  });

  test('is defined', () => {
    const el = document.createElement('employee-list');
    assert.instanceOf(el, EmployeeList);
  });

  test('has correct default properties', () => {
    assert.deepEqual(element.employees, mockEmployees);
    assert.equal(element.view, 'table');
    assert.equal(element.search, '');
    assert.equal(element.page, 1);
    assert.equal(element.pageSize, 5);
    assert.isFalse(element._showDeleteModal);
    assert.isNull(element._employeeToDelete);
    assert.equal(element.viewMode, 'list');
  });

  test('filters employees correctly', () => {
    element.search = 'john';
    assert.equal(element.filteredEmployees.length, 1);
    assert.equal(element.filteredEmployees[0].firstName, 'John');

    element.search = 'engineering';
    assert.equal(element.filteredEmployees.length, 1);
    assert.equal(element.filteredEmployees[0].department, 'Engineering');

    element.search = '';
    assert.equal(element.filteredEmployees.length, 2);
  });

  test('paginates employees correctly', () => {
    element.pageSize = 1;
    element.page = 1;
    assert.equal(element.paginatedEmployees.length, 1);
    assert.equal(element.paginatedEmployees[0].id, 1);

    element.page = 2;
    assert.equal(element.paginatedEmployees.length, 1);
    assert.equal(element.paginatedEmployees[0].id, 2);
  });

  test('calculates total pages correctly', () => {
    element.pageSize = 1;
    assert.equal(element.totalPages, 2);

    element.pageSize = 5;
    assert.equal(element.totalPages, 1);
  });

  test('navigates to page correctly', () => {
    element.pageSize = 1;
    element.page = 1;

    element._goToPage(2);
    assert.equal(element.page, 2);

    element._goToPage(0); // Invalid page
    assert.equal(element.page, 2); // Should not change

    element._goToPage(3); // Invalid page
    assert.equal(element.page, 2); // Should not change
  });

  test('navigates to previous and next page', () => {
    element.page = 2;
    element.pageSize = 1;
    element.employees = mockEmployees; // 2 employee, pageSize=1, so totalPages=2

    element._previousPage();
    assert.equal(element.page, 1);

    element._nextPage();
    assert.equal(element.page, 2);

    element._nextPage(); // Should not go beyond totalPages
    assert.equal(element.page, 2); // Should stay at max page
  });

  test('changes page size and resets to first page', () => {
    const event = {target: {value: '10'}};
    element.page = 3;

    element._changePageSize(event);

    assert.equal(element.pageSize, 10);
    assert.equal(element.page, 1);
  });

  test('dispatches edit employee event', () => {
    const editSpy = sinon.spy();
    element.addEventListener('edit-employee', editSpy);

    element._editEmployee(mockEmployees[0]);

    assert.isTrue(editSpy.called);
    assert.deepEqual(editSpy.firstCall.args[0].detail, mockEmployees[0]);
  });

  test('shows delete modal when delete is clicked', () => {
    element._deleteEmployee(mockEmployees[0]);

    assert.isTrue(element._showDeleteModal);
    assert.deepEqual(element._employeeToDelete, mockEmployees[0]);
  });

  test('handles modal cancel correctly', () => {
    element._showDeleteModal = true;
    element._employeeToDelete = mockEmployees[0];

    element._handleModalCancel();

    assert.isFalse(element._showDeleteModal);
    assert.isNull(element._employeeToDelete);
  });

  test('handles modal proceed correctly', () => {
    const deleteSpy = sinon.spy();
    element.addEventListener('delete-employee', deleteSpy);
    element._showDeleteModal = true;
    element._employeeToDelete = mockEmployees[0];

    element._handleModalProceed();

    assert.isTrue(deleteSpy.called);
    assert.deepEqual(deleteSpy.firstCall.args[0].detail, mockEmployees[0]);
    assert.isFalse(element._showDeleteModal);
    assert.isNull(element._employeeToDelete);
  });

  test('formats date correctly', () => {
    const dateString = '2023-01-15';
    const formatted = element._formatDate(dateString);
    assert.isString(formatted);
    assert.notEqual(formatted, '');

    const emptyResult = element._formatDate('');
    assert.equal(emptyResult, '');
  });

  test('detects mobile view correctly', () => {
    const originalInnerWidth = window.innerWidth;

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    assert.isTrue(element.isMobile);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    assert.isFalse(element.isMobile);

    // Restore original value
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  test('changes view mode correctly', () => {
    element._setViewMode('grid');
    assert.equal(element.viewMode, 'grid');

    element._setViewMode('list');
    assert.equal(element.viewMode, 'list');
  });

  test('renders with search input', async () => {
    const searchInput = element.shadowRoot.querySelector('.search-input');
    assert.isNotNull(searchInput);
    assert.equal(searchInput.value, '');
  });

  test('updates search when input changes', async () => {
    const searchInput = element.shadowRoot.querySelector('.search-input');
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));

    assert.equal(element.search, 'test');
  });

  test('renders page size selector', async () => {
    const pageSizeSelect =
      element.shadowRoot.querySelector('.page-size-select');
    assert.isNotNull(pageSizeSelect);
    assert.equal(pageSizeSelect.value, '5');
  });

  test('renders view toggle buttons', async () => {
    const listButton = element.shadowRoot.querySelector(
      '.view-toggle-btn.active'
    );
    const gridButton = element.shadowRoot.querySelector(
      '.view-toggle-btn:not(.active)'
    );

    assert.isNotNull(listButton);
    assert.isNotNull(gridButton);
  });

  test('switches view mode when toggle buttons are clicked', async () => {
    const gridButton = element.shadowRoot.querySelector(
      '.view-toggle-btn:not(.active)'
    );
    gridButton.click();
    await element.updateComplete;

    assert.equal(element.viewMode, 'grid');
  });

  test('renders confirm modal when delete modal is shown', async () => {
    element._showDeleteModal = true;
    element._employeeToDelete = mockEmployees[0];
    await element.updateComplete;

    const modal = element.shadowRoot.querySelector('confirm-modal');
    assert.isNotNull(modal);
    assert.isTrue(modal.hasAttribute('open'));
  });

  test('handles window resize events', () => {
    const requestUpdateSpy = sinon.spy(element, 'requestUpdate');

    element._handleResize();

    assert.isTrue(requestUpdateSpy.called);
  });

  test('adds and removes resize event listener', () => {
    const addEventListenerSpy = sinon.spy(window, 'addEventListener');
    const removeEventListenerSpy = sinon.spy(window, 'removeEventListener');

    const newElement = document.createElement('employee-list');
    newElement.connectedCallback();
    newElement.disconnectedCallback();

    assert.isTrue(addEventListenerSpy.calledWith('resize', sinon.match.func));
    assert.isTrue(
      removeEventListenerSpy.calledWith('resize', sinon.match.func)
    );

    addEventListenerSpy.restore();
    removeEventListenerSpy.restore();
  });

  test('search filters by multiple fields', () => {
    element.search = '123-456';
    assert.equal(element.filteredEmployees.length, 1);
    assert.equal(element.filteredEmployees[0].phoneNumber, '123-456-7890');

    element.search = 'jane.smith';
    assert.equal(element.filteredEmployees.length, 1);
    assert.equal(element.filteredEmployees[0].email, 'jane.smith@example.com');
  });

  test('pagination buttons are disabled correctly', async () => {
    element.pageSize = 10; // All employees fit on one page
    await element.updateComplete;

    const prevButton = element.shadowRoot.querySelector('.pagination-btn');
    const nextButton = element.shadowRoot.querySelector(
      '.pagination-btn:last-of-type'
    );

    if (prevButton && nextButton) {
      assert.isTrue(prevButton.hasAttribute('disabled'));
      assert.isTrue(nextButton.hasAttribute('disabled'));
    }
  });
});
