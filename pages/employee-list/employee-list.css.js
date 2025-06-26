import { css } from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    background: #f6f6f6;
    min-height: 100vh;
    font-family: 'Inter', Arial, sans-serif;
  }

  .employee-list-container {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    padding: 32px 24px;
    margin: 32px auto;
    max-width: 1200px;
  }

  .search-bar {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .search-input {
    flex: 1;
    min-width: 200px;
    padding: 10px 16px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    outline: none;
    transition: border 0.2s;
  }

  .search-input:focus {
    border-color: #ff6600;
  }

  .page-size-select {
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 15px;
    color: #ff6600;
    background: #fff;
    outline: none;
    margin-left: 8px;
  }

  .search-info {
    color: #888;
    font-size: 14px;
    white-space: nowrap;
  }

  /* Table Styles */
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .table-header {
    color: #ff6600;
    font-weight: 600;
    font-size: 15px;
    background: #faf9f8;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  th, td {
    padding: 16px 12px;
    text-align: left;
    font-size: 15px;
  }

  th {
    background: #faf9f8;
    color: #ff6600;
    font-weight: 600;
    border-bottom: 2px solid #f0f0f0;
  }

  tr {
    border-bottom: 1px solid #f0f0f0;
  }

  tr:last-child {
    border-bottom: none;
  }

  td {
    color: #222;
    background: #fff;
  }

  .checkbox-cell {
    width: 36px;
    text-align: center;
  }

  input[type="checkbox"] {
    accent-color: #ff6600;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1.5px solid #ff6600;
  }

  .action-icons {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: #ff6600;
    font-size: 18px;
    transition: color 0.2s;
  }

  .icon-btn:hover {
    color: #e65100;
  }

  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 32px 0 0 0;
    flex-wrap: wrap;
  }

  .pagination-btn {
    background: none;
    border: none;
    color: #ff6600;
    font-size: 18px;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .pagination-btn[disabled] {
    color: #ccc;
    cursor: not-allowed;
  }

  .page-number {
    background: none;
    border: none;
    color: #222;
    font-size: 16px;
    font-weight: 500;
    margin: 0 2px;
    padding: 6px 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .page-number.active {
    background: #ff6600;
    color: #fff;
  }

  .employee-details {
    font-size: 13px;
    color: #888;
    margin-top: 2px;
  }

  /* Mobile Card View */
  .mobile-card {
    display: none;
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    border: 1px solid #f0f0f0;
  }

  .mobile-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .mobile-card-name {
    font-weight: 600;
    font-size: 16px;
    color: #222;
    margin-bottom: 4px;
  }

  .mobile-card-department {
    font-size: 14px;
    color: #ff6600;
    font-weight: 500;
  }

  .mobile-card-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 14px;
  }

  .mobile-card-detail {
    display: flex;
    flex-direction: column;
  }

  .mobile-card-label {
    font-size: 12px;
    color: #888;
    margin-bottom: 2px;
  }

  .mobile-card-value {
    color: #222;
    font-weight: 500;
  }

  .mobile-card-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .mobile-action-btn {
    background: #ff6600;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .mobile-action-btn:hover {
    background: #e65100;
  }

  .mobile-action-btn.delete {
    background: #dc3545;
  }

  .mobile-action-btn.delete:hover {
    background: #c82333;
  }

  /* Tablet responsive */
  @media (max-width: 1024px) {
    .employee-list-container {
      margin: 24px auto;
      padding: 24px 20px;
    }

    .search-bar {
      gap: 12px;
    }

    .search-input {
      min-width: 180px;
    }

    th, td {
      padding: 12px 8px;
      font-size: 14px;
    }
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .employee-list-container {
      margin: 16px auto;
      padding: 20px 16px;
      border-radius: 12px;
    }

    .search-bar {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .search-input {
      min-width: auto;
    }

    .search-info {
      text-align: center;
      white-space: normal;
    }

    /* Hide table on mobile */
    table {
      display: none;
    }

    /* Show mobile cards */
    .mobile-card {
      display: block;
    }

    .pagination {
      gap: 6px;
      margin: 24px 0 0 0;
    }

    .page-number {
      padding: 8px 10px;
      font-size: 14px;
    }
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    .employee-list-container {
      margin: 12px auto;
      padding: 16px 12px;
    }

    .mobile-card {
      padding: 12px;
    }

    .mobile-card-details {
      grid-template-columns: 1fr;
      gap: 6px;
    }

    .mobile-card-actions {
      flex-direction: column;
    }

    .mobile-action-btn {
      width: 100%;
      padding: 10px;
    }

    .pagination {
      gap: 4px;
    }

    .page-number {
      padding: 6px 8px;
      font-size: 13px;
    }
  }
`; 