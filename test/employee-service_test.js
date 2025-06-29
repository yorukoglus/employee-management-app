import {employeeService} from '../pages/services/employee-service.js';
import {assert} from '@open-wc/testing';
import sinon from 'sinon';

suite('employee-service', () => {
  let originalDateNow;
  let localStorageStub;

  setup(() => {
    localStorageStub = {
      getItem: sinon.stub(),
      setItem: sinon.stub(),
      removeItem: sinon.stub(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageStub,
      writable: true,
    });

    // Reset service to initial state
    employeeService.employees = [];
    employeeService.listeners = [];

    // Mock Date.now for consistent testing
    originalDateNow = Date.now;
    Date.now = () => 1234567890;
  });

  teardown(() => {
    Date.now = originalDateNow;
    delete window.localStorage;
  });

  test('is defined', () => {
    assert.isDefined(employeeService);
    assert.isFunction(employeeService.getEmployees);
    assert.isFunction(employeeService.getEmployeeById);
    assert.isFunction(employeeService.addEmployee);
    assert.isFunction(employeeService.updateEmployee);
    assert.isFunction(employeeService.deleteEmployee);
    assert.isFunction(employeeService.subscribe);
  });

  test('getEmployees returns empty array initially', () => {
    const employees = employeeService.getEmployees();
    assert.isArray(employees);
    assert.equal(employees.length, 0);
  });

  test('getEmployees returns copy of employees array', () => {
    const originalEmployee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(originalEmployee);

    const employees = employeeService.getEmployees();
    assert.equal(employees.length, 1);
    assert.notStrictEqual(employees, employeeService.employees);

    // Modifying returned array should not affect original
    employees.push({id: 2, name: 'Jane Smith'});
    assert.equal(employeeService.employees.length, 1);
  });

  test('getEmployeeById returns employee when found', () => {
    const employee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(employee);

    const found = employeeService.getEmployeeById(1);
    assert.deepEqual(found, employee);
  });

  test('getEmployeeById returns employee when id is string', () => {
    const employee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(employee);

    const found = employeeService.getEmployeeById('1');
    assert.deepEqual(found, employee);
  });

  test('getEmployeeById returns undefined when employee not found', () => {
    const found = employeeService.getEmployeeById(999);
    assert.isUndefined(found);
  });

  test('addEmployee adds employee with generated id', () => {
    const employee = {name: 'John Doe', email: 'john@example.com'};

    const added = employeeService.addEmployee(employee);

    assert.equal(added.id, 1234567890);
    assert.equal(added.name, 'John Doe');
    assert.equal(added.email, 'john@example.com');
    assert.equal(employeeService.employees.length, 1);
  });

  test('addEmployee notifies listeners', () => {
    const listener = sinon.spy();
    employeeService.subscribe(listener);

    const employee = {name: 'John Doe'};
    employeeService.addEmployee(employee);

    assert.isTrue(listener.called);
    assert.equal(listener.firstCall.args[0].length, 1);
  });

  test('updateEmployee updates existing employee', () => {
    const originalEmployee = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    };
    employeeService.employees.push(originalEmployee);

    const updatedEmployee = {
      id: 1,
      name: 'John Smith',
      email: 'johnsmith@example.com',
    };
    const result = employeeService.updateEmployee(updatedEmployee);

    assert.deepEqual(result, updatedEmployee);
    assert.equal(employeeService.employees[0].name, 'John Smith');
    assert.equal(employeeService.employees[0].email, 'johnsmith@example.com');
  });

  test('updateEmployee returns null when employee not found', () => {
    const employee = {id: 999, name: 'John Doe'};
    const result = employeeService.updateEmployee(employee);

    assert.isNull(result);
    assert.equal(employeeService.employees.length, 0);
  });

  test('updateEmployee notifies listeners', () => {
    const originalEmployee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(originalEmployee);

    const listener = sinon.spy();
    employeeService.subscribe(listener);

    const updatedEmployee = {id: 1, name: 'John Smith'};
    employeeService.updateEmployee(updatedEmployee);

    assert.isTrue(listener.called);
  });

  test('deleteEmployee removes employee when found', () => {
    const employee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(employee);

    const result = employeeService.deleteEmployee(1);

    assert.isTrue(result);
    assert.equal(employeeService.employees.length, 0);
  });

  test('deleteEmployee returns false when employee not found', () => {
    const result = employeeService.deleteEmployee(999);

    assert.isFalse(result);
    assert.equal(employeeService.employees.length, 0);
  });

  test('deleteEmployee notifies listeners', () => {
    const employee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(employee);

    const listener = sinon.spy();
    employeeService.subscribe(listener);

    employeeService.deleteEmployee(1);

    assert.isTrue(listener.called);
    assert.equal(listener.firstCall.args[0].length, 0);
  });

  test('subscribe adds listener and returns unsubscribe function', () => {
    const listener = sinon.spy();
    const unsubscribe = employeeService.subscribe(listener);

    assert.equal(employeeService.listeners.length, 1);
    assert.isFunction(unsubscribe);
  });

  test('unsubscribe removes listener', () => {
    const listener = sinon.spy();
    const unsubscribe = employeeService.subscribe(listener);

    assert.equal(employeeService.listeners.length, 1);

    unsubscribe();

    assert.equal(employeeService.listeners.length, 0);
  });

  test('unsubscribe removes correct listener when multiple exist', () => {
    const listener1 = sinon.spy();
    const listener2 = sinon.spy();

    employeeService.subscribe(listener1);
    const unsubscribe2 = employeeService.subscribe(listener2);

    assert.equal(employeeService.listeners.length, 2);

    unsubscribe2();

    assert.equal(employeeService.listeners.length, 1);
    assert.equal(employeeService.listeners[0], listener1);
  });

  test('_notifyListeners calls all listeners with employee copy', () => {
    const listener1 = sinon.spy();
    const listener2 = sinon.spy();

    employeeService.subscribe(listener1);
    employeeService.subscribe(listener2);

    const employee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(employee);

    employeeService._notifyListeners();

    assert.isTrue(listener1.called);
    assert.isTrue(listener2.called);

    const employeesCopy1 = listener1.firstCall.args[0];
    const employeesCopy2 = listener2.firstCall.args[0];

    assert.notStrictEqual(employeesCopy1, employeeService.employees);
    assert.notStrictEqual(employeesCopy2, employeeService.employees);
    assert.deepEqual(employeesCopy1, employeeService.employees);
    assert.deepEqual(employeesCopy2, employeeService.employees);
  });

  test('listeners are notified in correct order', () => {
    const notifications = [];
    const listener1 = () => notifications.push('listener1');
    const listener2 = () => notifications.push('listener2');

    employeeService.subscribe(listener1);
    employeeService.subscribe(listener2);

    employeeService.addEmployee({name: 'John Doe'});

    assert.deepEqual(notifications, ['listener1', 'listener2']);
  });

  test('unsubscribe during notification does not break', () => {
    let unsubscribe;
    const listener1 = sinon.spy();
    const listener2 = () => {
      unsubscribe();
    };

    employeeService.subscribe(listener1);
    unsubscribe = employeeService.subscribe(listener2);

    employeeService.addEmployee({name: 'John Doe'});

    assert.isTrue(listener1.called);
    assert.equal(employeeService.listeners.length, 1);
  });

  test('addEmployee adds employee to beginning of array', () => {
    const employee1 = {name: 'John Doe'};
    const employee2 = {name: 'Jane Smith'};

    employeeService.addEmployee(employee1);
    employeeService.addEmployee(employee2);

    assert.equal(employeeService.employees.length, 2);
    assert.equal(employeeService.employees[0].name, 'Jane Smith');
    assert.equal(employeeService.employees[1].name, 'John Doe');
  });

  test('addEmployee saves to localStorage', () => {
    const employee = {name: 'John Doe'};

    employeeService.addEmployee(employee);

    assert.isTrue(localStorageStub.setItem.called);
    assert.equal(localStorageStub.setItem.firstCall.args[0], 'employees');
  });

  test('updateEmployee saves to localStorage', () => {
    const employee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(employee);

    employeeService.updateEmployee({id: 1, name: 'John Smith'});

    assert.isTrue(localStorageStub.setItem.called);
    assert.equal(localStorageStub.setItem.firstCall.args[0], 'employees');
  });

  test('deleteEmployee saves to localStorage', () => {
    const employee = {id: 1, name: 'John Doe'};
    employeeService.employees.push(employee);

    employeeService.deleteEmployee(1);

    assert.isTrue(localStorageStub.setItem.called);
    assert.equal(localStorageStub.setItem.firstCall.args[0], 'employees');
  });

  test('loads employees from localStorage when available', async () => {
    const savedEmployees = [
      {id: 1, name: 'John Doe'},
      {id: 2, name: 'Jane Smith'},
    ];
    localStorageStub.getItem.returns(JSON.stringify(savedEmployees));

    // Create a new service instance to test loading
    const {employeeService: newService} = await import(
      '../pages/services/employee-service.js'
    );

    assert.equal(newService.employees.length, 2);
    assert.equal(newService.employees[0].name, 'John Doe');
  });

  test('loads default employees when localStorage is empty', async () => {
    localStorageStub.getItem.returns(null);

    // Create a new service instance to test loading
    const {employeeService: newService} = await import(
      '../pages/services/employee-service.js'
    );

    assert.isTrue(newService.employees.length > 0);
  });

  test('resetToDefault resets to mock employees', () => {
    const employee = {name: 'John Doe'};
    employeeService.addEmployee(employee);

    employeeService.resetToDefault();

    assert.isTrue(localStorageStub.setItem.called);
    assert.equal(employeeService.employees.length, 200); // Default mock employees count
  });

  test('clearAll removes all employees', () => {
    const employee = {name: 'John Doe'};
    employeeService.addEmployee(employee);

    employeeService.clearAll();

    assert.equal(employeeService.employees.length, 0);
    assert.isTrue(localStorageStub.setItem.called);
  });
});
