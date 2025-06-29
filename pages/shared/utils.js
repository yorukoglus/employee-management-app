import {Router} from '@vaadin/router';

export const navigation = {
  goToEmployeeList: () => {
    try {
      Router.go('/employees');
    } catch (error) {
      console.error('Navigation error:', error);
      Router.go('/employees');
    }
  },
  goToAddEmployee: () => {
    try {
      Router.go('/employees/add');
    } catch (error) {
      console.error('Navigation error:', error);
      Router.go('/employees/add');
    }
  },
  goToEditEmployee: (id) => {
    try {
      Router.go(`/employees/edit/${id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      Router.go(`/employees/edit/${id}`);
    }
  },
  goToHome: () => {
    try {
      Router.go('/');
    } catch (error) {
      console.error('Navigation error:', error);
      Router.go('/');
    }
  },
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
  },

  isValidRoute: (path) => {
    const validRoutes = ['/', '/employees', '/employees/add'];

    // Check exact matches
    if (validRoutes.includes(path)) {
      return true;
    }

    // Check dynamic routes like /employees/edit/:id
    if (path.startsWith('/employees/edit/')) {
      const id = path.split('/').pop();
      return id && !isNaN(id);
    }

    return false;
  },

  redirectToValidRoute: (invalidPath) => {
    console.warn(`Invalid route: ${invalidPath}, redirecting to home`);
    navigation.goToHome();
  },
};
