import { css } from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    background: #f6f6f6;
    min-height: 100vh;
    font-family: 'Inter', Arial, sans-serif;
  }
  .form-container {
    max-width: 600px;
    margin: 40px auto 0 auto;
    padding: 32px 28px 28px 28px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }
  .form-header h2 {
    color: #ff6600;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
  .back-btn {
    background-color: #fff;
    color: #ff6600;
    border: 1.5px solid #ff6600;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s, color 0.2s;
  }
  .back-btn:hover {
    background: #ffe5d0;
    color: #e65100;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #222;
    font-size: 15px;
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 12px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    box-sizing: border-box;
    outline: none;
    transition: border 0.2s;
    background: #faf9f8;
  }
  .form-group input:focus,
  .form-group select:focus {
    border-color: #ff6600;
    background: #fff;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 700px) {
    .form-row { grid-template-columns: 1fr; }
    .form-container { padding: 18px 6px; }
  }
  .error-message {
    color: #dc3545;
    font-size: 14px;
    margin-top: 5px;
    display: block;
  }
  .form-group.error input,
  .form-group.error select {
    border-color: #dc3545;
    background: #fff0f3;
  }
  .submit-btn {
    background-color: #ff6600;
    color: #fff;
    border: none;
    padding: 14px 0;
    border-radius: 8px;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    transition: background 0.2s;
  }
  .submit-btn:hover {
    background-color: #e65100;
  }
  .submit-btn:disabled {
    background-color: #f0a366;
    cursor: not-allowed;
  }
  .required {
    color: #ff6600;
    font-size: 16px;
    margin-left: 2px;
  }

  /* Tablet responsive */
  @media (max-width: 768px) {
    .form-container {
      margin: 24px auto 0 auto;
      padding: 24px 20px;
      border-radius: 12px;
    }

    .form-header {
      margin-bottom: 24px;
      padding-bottom: 12px;
    }

    .form-header h2 {
      font-size: 22px;
    }

    .back-btn {
      padding: 6px 12px;
      font-size: 14px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      font-size: 14px;
    }

    .form-group input,
    .form-group select {
      padding: 10px;
      font-size: 14px;
    }

    .submit-btn {
      padding: 12px 0;
      font-size: 16px;
    }
  }

  /* Mobile responsive */
  @media (max-width: 600px) {
    .form-container {
      margin: 16px auto 0 auto;
      padding: 20px 16px;
      border-radius: 8px;
    }

    .form-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 20px;
    }

    .form-header h2 {
      font-size: 20px;
    }

    .back-btn {
      width: 100%;
      justify-content: center;
      padding: 10px;
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .form-group {
      margin-bottom: 14px;
    }

    .form-group input,
    .form-group select {
      padding: 12px;
      font-size: 16px; /* Better for mobile input */
    }

    .submit-btn {
      padding: 14px 0;
      font-size: 16px;
      margin-top: 16px;
    }
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    .form-container {
      margin: 12px auto 0 auto;
      padding: 16px 12px;
    }

    .form-header {
      margin-bottom: 16px;
      gap: 8px;
    }

    .form-header h2 {
      font-size: 18px;
    }

    .form-group {
      margin-bottom: 12px;
    }

    .form-group label {
      font-size: 14px;
      margin-bottom: 6px;
    }

    .form-group input,
    .form-group select {
      padding: 10px;
      font-size: 16px;
    }

    .submit-btn {
      padding: 12px 0;
      font-size: 15px;
    }

    .error-message {
      font-size: 13px;
    }
  }
`; 