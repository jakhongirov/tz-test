import axios from 'axios';
import { SkinportItem } from '../types/skinport';
import { getCache, setCache } from '../cache/skinport.cache';

const CACHE_KEY = 'skinport_items';
const CACHE_TTL = 60_000; // 1 minute

export async function getSkinportItems(
	appId = 730,
	currency = 'USD',
): Promise<SkinportItem[]> {
	const cached = getCache<SkinportItem[]>(CACHE_KEY);
	if (cached) return cached;

	try {
		const response = await axios.get(`https://api.skinport.com/v1/items`, {
			params: { app_id: appId, currency },
			timeout: 5000,
		});

		const items = response.data;

		const result: SkinportItem[] = items.map((item: any) => ({
			market_hash_name: item.market_hash_name,
			min_price_tradable: Number(item.min_price),
			min_price_not_tradable: Number(item.min_price_untradable),
		}));

		setCache(CACHE_KEY, result, CACHE_TTL);

		return result;
	} catch (err: any) {
		if (err.response) {
			throw new Error(`Skinport API error: ${err.response.status}`);
		} else if (err.request) {
			throw new Error('Skinport API no response');
		} else {
			throw new Error(`Skinport API failed: ${err.message}`);
		}
	}
}
