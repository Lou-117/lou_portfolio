import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  // 👇 这里必须修改为你的 GitHub 仓库名，例如 '/my-website/'
  base: '/lou_portfolio/', 
})