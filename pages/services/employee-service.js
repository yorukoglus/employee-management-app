import {mockEmployees} from '../employee-manager/mock-employees.js';

class EmployeeService {
  constructor() {
    this.employees = this._loadEmployees();
    this.listeners = [];
  }

  _loadEmployees() {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      try {
        return JSON.parse(savedEmployees);
      } catch (error) {
        console.error('Error parsing saved employees:', error);
        return [...mockEmployees];
      }
    }
    return [...mockEmployees];
  }

  _saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  getEmployees() {
    return [...this.employees];
  }

  getEmployeeById(id) {
    const numId = typeof id === 'string' ? Number(id) : id;
    return this.employees.find((emp) => emp.id === numId);
  }

  addEmployee(employee) {
    const newEmployee = {
      ...employee,
      id: Date.now(),
    };
    this.employees.unshift(newEmployee);
    this._saveEmployees();
    this._notifyListeners();
    return newEmployee;
  }

  updateEmployee(employee) {
    const index = this.employees.findIndex((emp) => emp.id === employee.id);
    if (index !== -1) {
      this.employees[index] = {...employee};
      this._saveEmployees();
      this._notifyListeners();
      return this.employees[index];
    }
    return null;
  }

  deleteEmployee(id) {
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      this._saveEmployees();
      this._notifyListeners();
      return true;
    }
    return false;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  _notifyListeners() {
    this.listeners.forEach((callback) => callback([...this.employees]));
  }

  resetToDefault() {
    this.employees = [...mockEmployees];
    this._saveEmployees();
    this._notifyListeners();
  }

  clearAll() {
    this.employees = [];
    this._saveEmployees();
    this._notifyListeners();
  }
}

export const employeeService = new EmployeeService();
