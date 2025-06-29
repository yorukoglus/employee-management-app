import {css} from 'lit';

export const toastStyles = css`
  :host {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: block;
  }

  .toast {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px 20px;
    margin-bottom: 10px;
    min-width: 300px;
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    border-left: 4px solid;
    position: relative;
    overflow: hidden;
  }

  .toast.show {
    transform: translateX(0);
  }

  .toast.success {
    border-left-color: #4caf50;
    background: linear-gradient(135deg, #f8fff8 0%, #ffffff 100%);
  }

  .toast.error {
    border-left-color: #f44336;
    background: linear-gradient(135deg, #fff8f8 0%, #ffffff 100%);
  }

  .toast.info {
    border-left-color: #2196f3;
    background: linear-gradient(135deg, #f8fbff 0%, #ffffff 100%);
  }

  .toast-content {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .toast-icon {
    margin-right: 12px;
    font-size: 20px;
  }

  .toast-message {
    color: #333;
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
  }

  .toast-close {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 18px;
    padding: 0;
    margin-left: 12px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  .toast-close:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .toast::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5));
    width: 100%;
    animation: progressBar 5.1s linear;
  }

  @keyframes progressBar {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

  @media (max-width: 768px) {
    :host {
      top: 10px;
      right: 10px;
      left: 10px;
    }

    .toast {
      min-width: auto;
      max-width: none;
    }
  }
`;
