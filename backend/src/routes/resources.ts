import express, { Router, Response } from 'express';
import { AuthenticatedRequest } from '../types';

const router: Router = express.Router();

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'breastfeeding' | 'mental_health' | 'nutrition';
  url: string;
}

const mockResources: ResourceItem[] = [
  {
    id: '1',
    title: 'Breastfeeding 101',
    description: 'Comprehensive guide to breastfeeding for new moms',
    category: 'breastfeeding',
    url: 'https://example.com/breastfeeding-101'
  },
  {
    id: '2',
    title: 'Postpartum Nutrition Tips',
    description: 'Essential nutrition tips during postpartum period',
    category: 'nutrition',
    url: 'https://example.com/postpartum-nutrition'
  },
  {
    id: '3',
    title: 'Managing Postpartum Anxiety',
    description: 'Strategies and resources to cope with postpartum anxiety',
    category: 'mental_health',
    url: 'https://example.com/postpartum-anxiety'
  }
];

// Public endpoint – no authentication required
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { category } = req.query;
    let resources = mockResources;
    if (category && typeof category === 'string') {
      resources = mockResources.filter(r => r.category === category);
    }
    return res.json(resources);
  } catch (error) {
    console.error('Get resources error:', error);
    return res.status(500).json({ error: 'Failed to retrieve resources' });
  }
});

// TODO: Implement in Sprint 3
// - GET /resources - List available resources
// - GET /resources/:id - Get specific resource
// - POST /resources - Create new resource (providers/admin)
// - PUT /resources/:id - Update resource
// - DELETE /resources/:id - Delete resource

export default router; 