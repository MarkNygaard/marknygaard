import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Check that body is not empty
    const body = req.body;
    if (!body) {
      res.status(400).send('Bad request (no body)');
      return;
    }

    // Get the slug to revalidate from body
    const slugToRevalidate = body.slugToRevalidate;
    if (slugToRevalidate) {
      await res.revalidate(`/blog/${slugToRevalidate}`);
      return res.json({ revalidated: true });
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
