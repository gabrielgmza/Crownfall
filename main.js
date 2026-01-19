import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import htm from 'htm';
import App from './App.js';

const html = htm.bind(createElement);
const rootElement = document.getElementById('root');

if (!rootElement) throw new Error("FATAL: No root element found");

const root = createRoot(rootElement);

root.render(
    html`
        <${StrictMode}>
            <${App} />
        </${StrictMode}>
    `
);