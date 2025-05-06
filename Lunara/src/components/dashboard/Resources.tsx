import React from 'react';
import { Card } from '../ui/Card';

interface Resource {
  name: string;
  path: string;
}

export const Resources: React.FC = () => {
  const resources: Resource[] = [
    { name: 'Meal Prep', path: '/resources/meal-prep' },
    { name: 'Rest Guides', path: '/resources/rest-guides' },
    { name: 'Herbal Remedies', path: '/resources/herbal-remedies' },
    { name: 'Appointments', path: '/appointments' },
  ];

  return (
    <Card>
      <h2 className="font-serif text-xl text-forest-green mb-4">Resources</h2>
      <ul className="space-y-3">
        {resources.map((resource) => (
          <li key={resource.name}>
            <a 
              href={resource.path}
              className="flex items-center text-brown-dark hover:text-purple transition-colors"
            >
              <span className="mr-2">›</span>
              {resource.name}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}; 