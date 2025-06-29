import {css} from 'lit';

export const pageStyles = css`
  :host {
    display: block;
    font-family: 'Inter', Arial, sans-serif;
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 32px;
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0 auto;
  }

  .page-content {
    padding: 24px 32px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Tablet responsive */
  @media (max-width: 768px) {
    .page-header {
      padding: 20px 16px;
      font-size: 22px;
      gap: 10px;
    }

    .page-content {
      padding: 20px 16px;
    }
  }

  /* Mobile responsive */
  @media (max-width: 600px) {
    .page-header {
      padding: 16px 12px;
      font-size: 20px;
      gap: 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .page-content {
      padding: 16px 12px;
    }
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    .page-header {
      padding: 12px 8px;
      font-size: 18px;
    }

    .page-content {
      padding: 12px 8px;
    }
  }
`;
