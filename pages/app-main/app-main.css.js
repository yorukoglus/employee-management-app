import {css} from 'lit';

export const appMainStyles = css`
  :host {
    display: block;
    background: #f5f5f5;
  }

  #outlet {
    min-height: 0;
    padding: 0 40px;
    height: calc(100vh - 65px);
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
