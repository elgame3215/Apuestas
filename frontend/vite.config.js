import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import tailwindCss from '@tailwindcss/vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		base: '/Apuestas/',
		define: {
			__APP_ENV__: JSON.stringify(env.APP_ENV),
		},
		plugins: [
			react(),
			tailwindCss(),
			vitePluginImp({
				libList: [
					{
						libName: 'antd',
						style(name) {
							return `antd/es/${name}/style/css.js`;
						},
					},
				],
				removeOriginImport: true,
			}),
			viteCompression({ algorithm: 'gzip', ext: '.gz' }),
		],
		server: {
			proxy: {
				'/api': {
					target: env.VITE_BACKEND_HOST,
					changeOrigin: true,
					secure: false,
				},
			},
		},
	};
});
