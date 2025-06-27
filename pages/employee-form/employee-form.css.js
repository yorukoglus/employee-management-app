import { css } from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    background: #fafafa;
    min-height: 100vh;
    font-family: 'Inter', Arial, sans-serif;
  }
  .form-container {
    max-width: 92vw;
    width: 92vw;
    min-width: 320px;
    margin: 40px auto 0 auto;
    padding: 40px 32px 48px 32px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    border: none;
  }
  .form-header {
    margin-bottom: 32px;
    padding-bottom: 0;
    border-bottom: none;
    font-size: 24px;
    font-weight: 700;
    color: #ff6600;
    text-align: left;
  }
  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 32px 32px;
    align-items: start;
    justify-items: stretch;
    margin-bottom: 40px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .form-group label {
    font-weight: 500;
    color: #222;
    font-size: 15px;
    margin-bottom: 2px;
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 10px 12px;
    border: 1.2px solid #bdbdbd;
    border-radius: 3px;
    font-size: 15px;
    background: #fff;
    outline: none;
    transition: border 0.2s;
  }
  .form-group input:focus,
  .form-group select:focus {
    border-color: #ff6600;
  }
  .form-group.error input,
  .form-group.error select {
    border-color: #dc3545;
    background: #fff0f3;
  }
  .error-message {
    color: #dc3545;
    font-size: 13px;
    margin-top: 2px;
  }
  .form-actions {
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-top: 16px;
  }
  @media (max-width: 1100px) {
    .form-container {
      padding: 32px 12px 36px 12px;
    }
    form {
      gap: 24px 16px;
    }
  }
  @media (max-width: 900px) {
    form {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(5, auto);
    }
    .form-actions {
      grid-column: 1 / span 2;
    }
  }
  @media (max-width: 600px) {
    .form-container {
      padding: 12px 2vw 18px 2vw;
      margin: 16px auto 0 auto;
    }
    .form-header {
      font-size: 20px;
      margin-bottom: 18px;
    }
    form {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(8, auto);
      gap: 16px 0;
    }
    .form-actions {
      grid-column: 1 / span 1;
      flex-direction: column;
      gap: 16px;
    }
  }
`; 