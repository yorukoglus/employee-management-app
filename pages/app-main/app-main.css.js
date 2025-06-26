import { css } from 'lit';

export const appMainStyles = css`
  :host {
    display: block;
    min-height: 100vh;
    background: #f5f5f5;
  }

  #outlet {
    min-height: calc(100vh - 80px);
  }
`; 