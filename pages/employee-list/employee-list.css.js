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
  .table-header {
    color: #ff6600;
    font-weight: 600;
    font-size: 15px;
    background: #faf9f8;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
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
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 32px 0 0 0;
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
  .search-bar {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .search-input {
    flex: 1;
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
  .employee-details {
    font-size: 13px;
    color: #888;
    margin-top: 2px;
  }
`; 