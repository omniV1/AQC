import React from 'react';
import { useParams } from 'react-router-dom';
// We'll need to access the blog post data. For simplicity,
// we can import it directly if it's not too large or coming from a CMS.
// Ideally, this data would be fetched or managed by a global state/context.
import { blogPostsData } from './BlogPage'; // Assuming blogPostsData is exported from BlogPage
import washiTape from "../Assets/washi tape left.png"; // Default or placeholder
import washiTape2 from "../Assets/washi tape right.png"; // Default or placeholder


// It's good practice to define the shape of your data
interface BlogPost {
    id: string;
    title: string;
    excerpt: string; // This will be the full excerpt here
    mainImageSrc: string;
    washiTapeImageSrc: string;
}

export const BlogPostDetailPage = (): JSX.Element => {
    const { postId } = useParams<{ postId: string }>();
    const post = blogPostsData.find((p: BlogPost) => p.id === postId);

    if (!post) {
        return <div className="pt-32 text-center">Blog post not found.</div>;
    }

    // Determine which washi tape to use based on the post id or a specific logic
    // For now, we'll alternate based on whether the ID is odd or even as a placeholder
    const washiTapeImage = parseInt(post.id) % 2 !== 0 ? washiTape : washiTape2;


    return (
        <div className="relative w-full min-h-screen flex flex-col items-center pt-32 pb-16 bg-[url(/base-background.png)] bg-cover bg-center">
            {/* Fixed background */}
            {/* <div className="fixed w-full h-full top-0 left-0 bg-[url(/base-background.png)] bg-cover bg-center -z-10" /> */}

            <main className="w-full max-w-2xl px-4 md:px-0 flex flex-col items-center">
                <div className="relative w-full max-w-lg shadow-xl rounded-lg bg-white/0"> {/* Ensure this container allows children to be visible */}
                    {/* Paper Image - Base Layer */}
                    <img
                        className="w-full h-auto block" // Adjust styling as needed
                        alt="Blog post background paper"
                        src={post.mainImageSrc} // Assuming mainImageSrc is correct for the larger view
                    />

                    {/* Text Content - On top of paper */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 pt-16 md:pt-20 z-10">
                        <div className="w-full max-w-[90%]">
                            <h1 className="[font-family:'Lusitana-Regular',Helvetica] font-bold text-[#4e1b00] text-xl sm:text-2xl md:text-3xl mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <p className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#4e1b00] text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                                {post.excerpt} {/* Display full excerpt */}
                            </p>
                        </div>
                    </div>

                    {/* Washi Tape - On top of paper and text */}
                    <img
                        className="absolute top-0 left-1/2 transform -translate-x-1/4 w-1/2 max-w-[150px] sm:max-w-[170px] md:max-w-[200px] h-auto z-20"
                        alt="Washi tape accent"
                        src={washiTapeImage} // Use the determined washi tape image
                    />
                </div>
                {/* You can add navigation to go back to the blog list, or other elements */}
                <div className="mt-12">
                    <a href="/blog" className="text-[#571e00] hover:text-[#A27B5C] [font-family:'Luxurious_Roman-Regular',Helvetica] text-lg py-2 px-4 border border-[#A27B5C] rounded hover:bg-[#A27B5C]/10 transition-colors">
                        &larr; Back to Blog
                    </a>
                </div>
            </main>
        </div>
    );
};

// Ensure blogPostsData is exported from BlogPage.tsx or move it to a shared location.
// For example, in BlogPage.tsx, you might need to add:
// export { blogPostsData };
// Or, more commonly, move blogPostsData to its own file, e.g., src/data/blogPosts.ts
// and import it in both BlogPage.tsx and BlogPostDetailPage.tsx. 