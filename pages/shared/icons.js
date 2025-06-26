import { html } from 'lit';

export const icons = {
  employeeList: html`
    <svg width="28" height="28" fill="none" stroke="#ff6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="20" height="20" rx="6"/>
      <path d="M8 10h8M8 14h8M8 18h4"/>
    </svg>
  `,
  
  form: html`
    <svg width="28" height="28" fill="none" stroke="#ff6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  `
}; 