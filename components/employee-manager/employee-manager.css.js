import { css } from 'lit';

export const employeeManagerStyles = css`
  :host {
    display: block;
    background: #f6f6f6;
    min-height: 100vh;
    font-family: 'Inter', Arial, sans-serif;
  }
  .topbar {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 0 32px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid #f0f0f0;
  }
  .logo-area {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .logo-img {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #ff6600;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .nav-link {
    color: #ff6600;
    font-weight: 500;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .nav-link.active {
    text-decoration: underline;
  }
  .add-btn {
    background-color: #ff6600;
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    margin-left: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s;
  }
  .add-btn:hover {
    background-color: #e65100;
  }
  .user-area {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .user-icon, .lang-icon {
    color: #ff6600;
    font-size: 20px;
    cursor: pointer;
    background: #fff;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .user-icon:hover, .lang-icon:hover {
    background: #ffe5d0;
  }
  .page-header {
    margin: 32px auto 0 auto;
    max-width: 1200px;
    padding: 0 24px;
    color: #ff6600;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -1px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  @media (max-width: 700px) {
    .topbar, .page-header { flex-direction: column; align-items: flex-start; }
    .topbar { height: auto; padding: 12px; }
    .page-header { font-size: 22px; padding: 0 8px; }
  }
`; 