import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@api': path.resolve(__dirname, './src/api'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@constants': path.resolve(__dirname, './src/constants'),
			'@features': path.resolve(__dirname, './src/features'),
			'@store': path.resolve(__dirname, './src/store'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@app-types': path.resolve(__dirname, './src/types'),
			'@utils': path.resolve(__dirname, './src/utils')
		}
	}
})
