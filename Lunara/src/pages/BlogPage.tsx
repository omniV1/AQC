import React from 'react';

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

const BlogPage: React.FC = () => {
  return (
    <section className="max-w-[1076px] mx-auto px-4 md:px-8 pt-32 pb-40 text-[#4E1B00]">
  
      <div className="flex flex-col gap-14">
        {samplePosts.map((post) => (
          <article
            key={post.id}
            className={`bg-[#FAF7F2] shadow-[0_4px_19px_rgba(78,27,0,0.17)] px-10 py-8 md:py-10 rounded-md relative`}
          >
            {/* Date & decorative line */}
            <div className="flex items-center gap-4 mb-4">
              <p className="font-['Lusitana'] text-[18px] text-[#BCADA5] tracking-wide">
                {post.date}
              </p>
              <span className="h-px flex-1 bg-[#A1AEAF] block" />
            </div>

            {/* Title */}
            <h2 className="font-['Lusitana'] text-[34px] md:text-[36px] tracking-wide mb-6 leading-snug">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="font-['Luxurious_Roman'] text-[24px] leading-snug mb-10 max-w-4xl">
              {post.excerpt}
            </p>

            {/* Read more pill */}
            <button
              className="px-8 py-3 rounded-full bg-[#DED7CD] text-[#AA6641] font-['Luxurious_Roman'] text-[21px] tracking-wide border border-[#CAC3BC] shadow-inner transition disabled:opacity-70"
              disabled
            >
              Read More
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPage; 