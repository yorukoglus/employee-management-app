import { css } from 'lit';

export const pageStyles = css`
  :host {
    display: block;
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 32px;
    background: white;
    border-bottom: 1px solid #e0e0e0;
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .page-content {
    padding: 24px 32px;
  }
`; 