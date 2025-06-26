import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { appMainStyles } from './app-main.css.js';
import { navigation } from '../shared/utils.js';
import '../app-nav/app-nav.js';
import '../employee-list/employee-list-page.js';
import '../employee-form/employee-form-page.js';
import '../not-found-page/not-found-page.js';

export class AppMain extends LitElement {
  static properties = {
    currentRoute: { type: String },
  };

  static styles = appMainStyles;

  constructor() {
    super();
    this.currentRoute = '/';
    this.router = null;
  }

  firstUpdated() {
    this._setupRouter();
  }

  _setupRouter() {
    this.router = new Router(this.shadowRoot.querySelector('#outlet'));
    
    this.router.setRoutes([
      {
        path: '/',
        redirect: '/employees'
      },
      {
        path: '/employees',
        component: 'employee-list-page'
      },
      {
        path: '/employees/add',
        component: 'employee-form-page'
      },
      {
        path: '/employees/edit/:id',
        component: 'employee-form-page'
      },
      {
        path: '(.*)',
        component: 'not-found-page'
      }
    ]);

    this.router.subscribe((location) => {
      this.currentRoute = location.pathname;
    });

    this.router.addEventListener('vaadin-router-error', (event) => {
      console.error('Router error:', event.detail);
    });
  }

  _handleNav(e) {
    const page = e.detail.page;
    if (page === 'list') {
      navigation.goToEmployeeList();
    } else if (page === 'add') {
      navigation.goToAddEmployee();
    }
  }

  render() {
    return html`
      <app-nav 
        .active=${this._getActiveNav()} 
        @navigate=${this._handleNav}
      ></app-nav>
      <div id="outlet"></div>
    `;
  }

  _getActiveNav() {
    if (this.currentRoute === '/employees') {
      return 'list';
    } else if (this.currentRoute === '/employees/add') {
      return 'add';
    } else if (this.currentRoute.startsWith('/employees/edit/')) {
      return 'list';
    }
    return 'list';
  }
}

customElements.define('app-main', AppMain); 