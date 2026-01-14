import 'dotenv/config';
import { app } from './src/app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen({ port: PORT, host: '0.0.0.0' })
	.then(() => {
		console.log(`🚀 Server running at http://localhost:${PORT}`);
	})
	.catch((err: any) => {
		console.error('❌ Server failed to start', err);
		process.exit(1);
	});
