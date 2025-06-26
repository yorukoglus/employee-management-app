import { css } from 'lit';

export const appMainStyles = css`
  :host {
    display: block;
    min-height: 100vh;
    background: #f5f5f5;
    font-family: 'Inter', Arial, sans-serif;
  }

  #outlet {
    min-height: calc(100vh - 80px);
    padding: 0;
  }

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    #outlet {
      min-height: calc(100vh - 120px);
      padding: 0 8px;
    }
  }

  @media (max-width: 480px) {
    #outlet {
      padding: 0 4px;
    }
  }
`; 