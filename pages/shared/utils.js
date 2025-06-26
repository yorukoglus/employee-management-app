import { Router } from '@vaadin/router';

export const navigation = {
  goToEmployeeList: () => Router.go('/employees'),
  goToAddEmployee: () => Router.go('/employees/add'),
  goToEditEmployee: (id) => Router.go(`/employees/edit/${id}`)
};

export const confirmations = {
  deleteEmployee: (employee) => {
    return window.confirm(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`
    );
  },
  
  updateEmployee: () => {
    return window.confirm('Are you sure you want to update this employee record?');
  }
};

export const routeUtils = {
  getEmployeeIdFromPath: () => {
    const path = window.location.pathname;
    if (path.startsWith('/employees/edit/')) {
      return path.split('/').pop();
    }
    return null;
  },
  
  isEditMode: () => {
    return window.location.pathname.startsWith('/employees/edit/');
  }
}; 