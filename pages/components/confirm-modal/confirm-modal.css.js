import {css} from 'lit';

export const confirmModalStyles = css`
  :host {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.18);
    visibility: hidden;
    pointer-events: none;
  }
  :host([open]) {
    visibility: visible;
    pointer-events: auto;
  }
  .modal {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    min-width: 340px;
    max-width: 95vw;
    padding: 28px 28px 24px 28px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .modal-title {
    color: #ff6600;
    font-size: 22px;
    font-weight: 700;
    margin: 0;
  }
  .close-btn {
    background: none;
    border: none;
    color: #ff6600;
    font-size: 22px;
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
    transition: color 0.2s;
  }
  .close-btn:hover {
    color: #e65100;
  }
  .modal-message {
    color: #333;
    font-size: 15px;
    margin-bottom: 24px;
    margin-top: 4px;
  }
  .modal-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: stretch;
  }
  @media (max-width: 480px) {
    .modal {
      min-width: 0;
      padding: 16px 6px 12px 6px;
    }
    .modal-title {
      font-size: 18px;
    }
    .modal-message {
      font-size: 14px;
    }
    .modal-actions {
      flex-direction: column;
      gap: 10px;
    }
  }
`;
