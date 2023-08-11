// 로컬 환경 (로컬에서 개발할 때만 주석해제하고, 푸쉬는 아래 설정으로 !)
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // proxy: {
//     //   '/api': {
//     //     target: 'http://i9b106.p.ssafy.io:8080',
//     //     changeOrigin: true,
//     //   },
//     // },
//   },
//   css:{
//     devSourcemap: true
//   }
// })


// 배포 환경
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    https: {
      key: 'privkey.pem',
      cert: 'fullchain.pem',
    },
  },
  plugins: [ react() ],
})
