import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  date: string;
  content: string[]; // paragraphs
}

// Placeholder blog posts – in a real app this would come from an API or context
const posts: Post[] = [
  {
    id: 1,
    title: 'When Your "Baby Blues" Are More Than Just The Blues',
    date: '05/23/2025',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      'Etiam ut pulvinar augue. Proin quis maximus velit. Mauris ac justo quis lectus malesuada bibendum. Nulla facilisi.',
      'Curabitur euismod, ligula vitae gravida lacinia, purus arcu molestie augue, vitae facilisis turpis elit a magna.',
    ],
  },
  {
    id: 2,
    title: 'Who Am I Now? Postpartum Shifts in Identity',
    date: '05/23/2025',
    content: [
      'Morbi vel vulputate tortor. Suspendisse molestie ipsum a nulla tincidunt, quis porta nunc interdum.',
      'Integer euismod faucibus ipsum nec viverra. Nullam quis lorem risus. Cras gravida ipsum id justo condimentum dignissim.',
      'Suspendisse aliquam dui nec urna viverra, sed hendrerit ipsum tristique.',
    ],
  },
  {
    id: 3,
    title: 'What Rest Looks Like in Real Life',
    date: '05/23/2025',
    content: [
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
      'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    ],
  },
];

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <section className="max-w-full md:max-w-[1076px] mx-auto px-4 md:px-8 pt-[200px] md:pt-[220px] pb-32 text-[#4E1B00]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-[#AA6641] underline">
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-full md:max-w-[1076px] mx-auto px-4 md:px-8 pt-[200px] md:pt-[220px] pb-32 text-[#4E1B00]">
      {/* Paper background */}
      <div className="relative max-w-3xl mx-auto">
        <img
          src="/images/page%20bknd.png"
          alt="Paper background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        <div className="relative z-10 py-12 px-6 md:px-10">
          {/* Date */}
          <p className="font-['Lusitana'] text-[18px] text-[#BCADA5] tracking-wide mb-4">
            {post.date}
          </p>

          {/* Title */}
          <h1 className="font-['Lusitana'] text-[32px] md:text-[36px] tracking-wide mb-8 leading-snug">
            {post.title}
          </h1>

          {/* Content paragraphs */}
          <div className="font-['Luxurious_Roman'] text-[20px] leading-relaxed space-y-6">
            {post.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              to="/blog"
              className="text-[#AA6641] underline font-['Luxurious_Roman'] text-[18px]"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostPage; 