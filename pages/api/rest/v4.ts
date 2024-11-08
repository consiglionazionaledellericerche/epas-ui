// /pages/api/proxy.js
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req:any, res:any) {
  // Recupera la sessione
  const session = await getServerSession(req, res, authOptions)
  let accessToken = session ? session.accessToken : null;
  if (!accessToken) {
    return res.status(401).json({ error: 'Non autenticato' });
  }

  // Configura l'URL di base della tua API esterna
  const epasServiceUrl = process.env.NEXT_PUBLIC_EPAS_SERVICE || 'https://epas-service.devel.iit.cnr.it';

  let reqUrl = '/rest/v4';

  if (req.query.endpoint) {
      const endpoint = decodeURIComponent(req.query.endpoint);
      reqUrl += '/' + endpoint;
  }

  const queryParams = new URLSearchParams(req.query);
  queryParams.delete('endpoint'); // Rimuove il parametro 'endpoint'

  const finalUrl = new URL(epasServiceUrl + reqUrl + (queryParams.toString() ? '?' + queryParams.toString() : ''));

  try {
    const apiResponse = await fetch(finalUrl.toString(), {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) ? JSON.stringify(req.body) : undefined,
    });

    const contentType = apiResponse.headers.get("content-type");
    const data = contentType && contentType.includes("application/json")
      ? await apiResponse.json()
      : await apiResponse.text();

    res.status(apiResponse.status).send(data);

  } catch (error) {
    console.error("Errore nell'inoltro della richiesta:", error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
}
