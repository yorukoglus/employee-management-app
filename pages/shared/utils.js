import { Router } from '@vaadin/router';

export const navigation = {
  goToEmployeeList: () => {
    try {
      Router.go('/employees');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = '/employees';
    }
  },
  goToAddEmployee: () => {
    try {
      Router.go('/employees/add');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = '/employees/add';
    }
  },
  goToEditEmployee: (id) => {
    try {
      Router.go(`/employees/edit/${id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.href = `/employees/edit/${id}`;
    }
  }
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