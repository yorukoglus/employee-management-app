import { css } from 'lit';

export const appNavStyles = css`
  :host {
    display: block;
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    border-bottom: 1.5px solid #f0f0f0;
    font-family: 'Inter', Arial, sans-serif;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    height: 56px;
    max-width: 1200px;
    margin: 0 auto;
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
    cursor: pointer;
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

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #ff6600;
    font-size: 24px;
  }

  /* Tablet responsive */
  @media (max-width: 768px) {
    nav {
      padding: 0 16px;
      height: 64px;
    }

    .nav-links {
      gap: 16px;
    }

    .nav-link {
      font-size: 15px;
      padding: 8px 12px;
    }
  }

  /* Mobile responsive */
  @media (max-width: 600px) {
    nav {
      padding: 0 12px;
      height: 60px;
    }

    .mobile-menu-toggle {
      display: block;
    }

    .nav-links {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      background: #fff;
      flex-direction: column;
      gap: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
    }

    .nav-links.mobile-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-link {
      width: 100%;
      padding: 16px 20px;
      border-bottom: 1px solid #f0f0f0;
      border-radius: 0;
      font-size: 16px;
      justify-content: flex-start;
    }

    .nav-link:last-child {
      border-bottom: none;
    }

    .nav-link.active, .nav-link:hover {
      background: #ffe5d0;
      color: #e65100;
    }
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    nav {
      padding: 0 8px;
      height: 56px;
    }

    .logo-img {
      width: 28px;
      height: 28px;
      font-size: 16px;
    }

    .nav-links {
      top: 56px;
    }
  }
`; 