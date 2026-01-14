import Fastify, { FastifyInstance } from 'fastify';
import { skinportRoutes } from './routers/skinport';
import { userRoutes } from './routers/users';

export const app: FastifyInstance = Fastify({
	logger: true,
});

app.register(skinportRoutes, { prefix: '/skinport' });
app.register(userRoutes, { prefix: '/users' });

app.get('/health', async () => ({ status: 'ok' }));

app.setErrorHandler((error: any, _, reply) => {
	app.log.error(error);
	reply.status(error.statusCode || 500).send({
		error: error.message || 'Internal Server Error',
	});
});
