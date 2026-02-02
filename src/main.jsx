import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/Router.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// For Map
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});



const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>

      <AuthProvider>

        <RouterProvider router={router}>

        </RouterProvider>

      </AuthProvider>

    </QueryClientProvider>
  </StrictMode>
)
