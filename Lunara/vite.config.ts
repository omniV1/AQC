import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'; // No longer needed for alias
// import { fileURLToPath } from 'url'; // No longer needed for alias

// Get current directory path in ES module scope - No longer needed for alias
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: { // Removed alias section
  //   alias: {
  //     // Force resolving react-icons to the installed package
  //     'react-icons': path.resolve(__dirname, 'node_modules/react-icons'),
  //   },
  // },
})
