import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://i9b106.p.ssafy.io:8080',
    //     changeOrigin: true,
    //   },
    // },
  },
  css:{
    devSourcemap: true
  }
})
