import {css} from 'lit';

export const commonStyles = css`
  .card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1.5px solid #e0e0e0;
    padding: 22px 20px 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    padding: 8px 18px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    justify-content: center;
    text-align: center;
  }

  .btn-primary {
    background: #3a237e;
    color: #fff;
  }
  .btn-primary:hover {
    background: #24125a;
  }
  .btn-danger {
    background: #ff6600;
    color: #fff;
  }
  .btn-danger:hover {
    background: #e65100;
  }
  .btn-outline {
    background: #fff;
    color: #3a237e;
    border: 1.5px solid #3a237e;
  }
  .btn-outline:hover {
    background: #f3f0ff;
    color: #1a0e4a;
  }

  @media (max-width: 600px) {
    .card {
      padding: 14px 8px 12px 8px;
    }
    .btn {
      width: 100%;
      font-size: 15px;
      padding: 8px 0;
    }
  }
`;
