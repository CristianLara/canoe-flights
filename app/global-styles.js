import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;

    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    // font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }



  ///////// Custom Rangeslider Styles /////////

  .rangeslider {
    background-color: rgb(70, 70, 70) !important;
  }

  .rangeslider__fill {
    background-color: #3498db !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0) !important;
  }

  .rangeslider__handle {
    background-color: rgb(70, 70, 70) !important;
    border-width: 0px !important;
  }

  .rangeslider__handle:hover {
    background-color: rgb(80, 80, 80) !important;
  }

  .rangeslider-horizontal .rangeslider__handle:after {
    content: '' !important;
    width: 0px !important;
  }

  .rangeslider-horizontal .rangeslider__handle {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  }

  .rangeslider__labels .rangeslider__label-item {
      color: white !important;
  }

  /////////////////////////////////////////////
`;
