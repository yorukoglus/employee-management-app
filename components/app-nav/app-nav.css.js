import { css } from 'lit';

export const appNavStyles = css`
  :host {
    display: block;
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    border-bottom: 1.5px solid #f0f0f0;
    font-family: 'Inter', Arial, sans-serif;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    height: 56px;
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
    padding: 6px 10px;
    border-radius: 6px;
    transition: background 0.2s, color 0.2s;
  }
  .nav-link.active, .nav-link:hover {
    background: #ffe5d0;
    color: #e65100;
    text-decoration: underline;
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
  @media (max-width: 700px) {
    nav { flex-direction: column; align-items: flex-start; height: auto; padding: 12px; }
    .nav-links { gap: 12px; }
  }
`; 