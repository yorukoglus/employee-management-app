import { mockEmployees } from '../employee-manager/mock-employees.js';

class EmployeeService {
  constructor() {
    this.employees = [...mockEmployees];
    this.listeners = [];
  }

  getEmployees() {
    return [...this.employees];
  }

  getEmployeeById(id) {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee) {
    const newEmployee = {
      ...employee,
      id: Date.now()
    };
    this.employees.push(newEmployee);
    this._notifyListeners();
    return newEmployee;
  }

  updateEmployee(employee) {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
      this.employees[index] = { ...employee };
      this._notifyListeners();
      return this.employees[index];
    }
    return null;
  }

  deleteEmployee(id) {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
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
    this.listeners.forEach(callback => callback([...this.employees]));
  }
}

export const employeeService = new EmployeeService(); 