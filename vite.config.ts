
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 저장소 명칭을 base 경로로 설정하여 서브디렉토리 배포 대응
  base: '/ad-guard-ai/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        // 빌드 결과물의 경로를 명확하게 관리
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  },
  resolve: {
    alias: {
      // 필요한 경우 별칭 설정을 추가할 수 있습니다.
    },
  },
});
