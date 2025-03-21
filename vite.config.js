import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    // base: '/17-march',
    plugins: [
        tailwindcss(),
        react(),
        VitePWA({
            workbox: {
                globPatterns: ['**/*'],
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) => {
                            return true
                        },
                        handler: 'NetworkFirst', // Try network first, fallback to cache if offline
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 50, // Limit cache size
                                maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
                            },
                            networkTimeoutSeconds: 5, // Wait 5s before falling back to cache
                        },
                    }
                ],
            },
            includeAssets: ['**/*'],
            manifest: {
                theme_color: "#f69435",
                background_color: "#f69435",
                display: "standalone",
                scope: "/",
                start_url: "/",
                short_name: "Vite PWA",
                description: "Vite PWA Demo",
                name: "Vite PWA",
                icons: [
                ],
            },
            devOptions: {
                enabled: true, // Enable PWA in development
                type: 'module',
            },
        })
    ],
});

