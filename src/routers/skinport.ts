import { FastifyInstance } from 'fastify';
import { getSkinportItems } from '../services/skinport.service';

export async function skinportRoutes(app: FastifyInstance) {
	app.get('/items', async (request, reply) => {
		const { app_id, currency } = request.query as {
			app_id?: number;
			currency?: string;
		};
		try {
			const items = await getSkinportItems(app_id ?? 730, currency ?? 'USD');
			return reply.send(items);
		} catch (err: any) {
			return reply
				.status(500)
				.send({ error: err.message || 'Failed to fetch items' });
		}
	});
}
