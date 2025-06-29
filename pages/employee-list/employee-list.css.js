import {css} from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    background: #f6f6f6;
    position: relative;
    height: 100%;
  }

  .employee-list-container {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    padding: 32px 24px;
    .table-wrapper {
      max-height: calc(100vh - 360px);
      overflow: auto;
    }
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

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .table-header {
    color: #ff6600;
    font-weight: 600;
    font-size: 15px;
    background: #faf9f8;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  th,
  td {
    padding: 16px 12px;
    text-align: left;
    font-size: 15px;
    white-space: nowrap;
  }

  th {
    background: #faf9f8;
    color: #ff6600;
    font-weight: 600;
    border-bottom: 2px solid #f0f0f0;
  }

  thead th {
    position: sticky;
    top: 0;
    background: #faf9f8;
    z-index: 2;
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

  input[type='checkbox'] {
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
    th,
    td {
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
      height: calc(100vh - 330px);
      overflow: auto;
    }
    .search-bar {
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
    .card {
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
      height: calc(100vh - 300px);
      overflow: auto;
    }
    .card {
      padding: 12px;
    }
    .mobile-card-details {
      grid-template-columns: 1fr;
      gap: 6px;
    }
    .mobile-card-actions {
      flex-direction: column;
    }
    .pagination {
      gap: 4px;
    }
    .page-number {
      padding: 6px 8px;
      font-size: 13px;
    }
  }

  .view-toggle-bar {
    position: absolute;
    right: 0;
    top: -80px;

    display: flex;
    align-items: center;
    gap: 16px;
    margin: 24px 0 8px 0;
  }
  .view-toggle-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    transition: background 0.2s;
    opacity: 0.6;
  }
  .view-toggle-btn.active,
  .view-toggle-btn:hover {
    background: #fff3e6;
    opacity: 1;
  }
  .employee-grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 24px;
    margin: 32px 0 0 0;
    max-height: calc(100vh - 360px);
    overflow-y: auto;
  }

  @media (max-width: 900px) {
    .employee-grid-container {
      grid-template-columns: 1fr;
      gap: 20px 0;
    }
  }
  @media (min-width: 1200px) {
    .employee-grid-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1650px) {
    .employee-grid-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .employee-card-row {
    display: flex;
    gap: 24px;
    font-size: 15px;
    color: #222;
    margin-bottom: 2px;
    .employee-item {
      overflow: hidden;
      .label {
        color: gray;
      }
      div.value {
        font-weight: 600;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .employee-card-row > div {
    flex: 1;
  }
  .employee-card-actions {
    display: flex;
    gap: 16px;
    margin-top: 10px;
  }
`;
