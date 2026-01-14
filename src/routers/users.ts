import { FastifyInstance } from 'fastify';
import { pool } from '../lib/db/index';

interface WithdrawParams {
	id: string;
}

interface WithdrawBody {
	amount: number;
}

export async function userRoutes(app: FastifyInstance) {
	app.post('/:id/withdraw', async (request, reply) => {
		const { id } = request.params as WithdrawParams;
		const { amount } = request.body as WithdrawBody;

		const userId = Number(id);

		if (amount <= 0)
			return reply.status(400).send({ error: 'Amount must be > 0' });

		const client = await pool.connect();
		try {
			await client.query('BEGIN');

			const { rows } = await client.query(
				'SELECT balance FROM users WHERE id = $1 FOR UPDATE',
				[userId],
			);

			if (!rows[0]) {
				await client.query('ROLLBACK');
				return reply.status(404).send({ error: 'User not found' });
			}

			const balance = Number(rows[0].balance);

			if (balance < amount) {
				await client.query('ROLLBACK');
				return reply.status(400).send({ error: 'Insufficient balance' });
			}

			await client.query(
				'UPDATE users SET balance = balance - $1 WHERE id = $2',
				[amount, userId],
			);

			await client.query('COMMIT');
			return { success: true, remaining_balance: balance - amount };
		} catch (err) {
			await client.query('ROLLBACK');
			throw err;
		} finally {
			client.release();
		}
	});
}
