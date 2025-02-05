import { createRoot } from 'react-dom/client';

import '@/locales/i18n';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
