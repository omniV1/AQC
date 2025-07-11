import React from 'react';
import { Link } from 'react-router-dom';

interface PostPreview {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

const samplePosts: PostPreview[] = [
  {
    id: 1,
    title: 'When Your "Baby Blues" Are More Than Just The Blues',
    date: '05/23/2025',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.',
  },
  {
    id: 2,
    title: 'Who Am I Now? Postpartum Shifts in Identity',
    date: '05/23/2025',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.',
  },
  {
    id: 3,
    title: 'What Rest Looks Like in Real Life',
    date: '05/23/2025',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.',
  },
];

// New helper to truncate excerpt text
const truncateText = (text: string, wordLimit: number = 30): string => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const BlogPage: React.FC = () => {
  return (
    <section className="max-w-full md:max-w-[1076px] mx-auto px-4 md:px-8 pt-[200px] md:pt-[220px] pb-32 text-[#4E1B00]">
  
      {/* Use grid to show two cards per row on medium screens and center items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 justify-items-center">
        {samplePosts.map((post) => (
          <article
            key={post.id}
            className={`bg-[#FAF7F2] shadow-[0_4px_19px_rgba(78,27,0,0.17)] px-6 py-5 md:px-8 md:py-6 rounded-md relative`}
          >
            {/* Date & decorative line */}
            <div className="flex items-center gap-3 mb-3">
              <p className="font-['Lusitana'] text-[16px] text-[#BCADA5] tracking-wide">
                {post.date}
              </p>
              <span className="h-px flex-1 bg-[#A1AEAF] block" />
            </div>

            {/* Title */}
            <h2 className="font-['Lusitana'] text-[26px] md:text-[28px] tracking-wide mb-3 leading-snug">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="font-['Luxurious_Roman'] text-[18px] leading-snug mb-6 max-w-3xl">
              {truncateText(post.excerpt, 20)}
            </p>

            {/* Read more pill */}
            <Link
              to={`/blog/${post.id}`}
              className="px-6 py-2 rounded-full bg-[#DED7CD] text-[#AA6641] font-['Luxurious_Roman'] text-[18px] tracking-wide border border-[#CAC3BC] shadow-inner transition hover:opacity-90"
            >
              Read More
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPage; 