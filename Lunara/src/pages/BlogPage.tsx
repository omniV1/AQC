import React from "react";
import { Link } from "react-router-dom";
// Link import no longer needed here as header is global
import x1 from "../Assets/1.png";
import x2 from "../Assets/2.png";
import insta1 from "../Assets/insta.png";
import ladybug1 from "../Assets/ladybug 1.png";
import ladybug2 from "../Assets/ladybug 2.png";
import lunaraLogo from "../Assets/lunara logo.png";
// lunaraLogo import no longer needed here as header is global
import spotify1 from "../Assets/spotify.png";
import washiTape2 from "../Assets/washi tape right.png";
import washiTape from "../Assets/washi tape left.png";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    mainImageSrc: string; // Will hold the imported image variable e.g. x1
    washiTapeImageSrc: string; // Will hold the imported image variable e.g. washiTape
}

const blogPostsData: BlogPost[] = [
    {
        id: "1",
        title: "When Your \"Baby Blues\" Are More Than Just The Blues",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.",
        mainImageSrc: x1,
        washiTapeImageSrc: washiTape,
    },
    {
        id: "2",
        title: "Why hire a postpartum doula?",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.",
        mainImageSrc: x2,
        washiTapeImageSrc: washiTape2,
    },
    {
        id: "3",
        title: "The 5 Postpartum Gifts You *Really* Need",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.",
        mainImageSrc: x1, // Placeholder, update with actual image
        washiTapeImageSrc: washiTape,
    },
    {
        id: "4",
        title: "If Breastfeeding is \"Natural,\" Why Take a Class?",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.",
        mainImageSrc: x2, // Placeholder, update with actual image
        washiTapeImageSrc: washiTape2,
    },
    {
        id: "5",
        title: "Holistic Postpartum Care: Beyond Checkups and Vitamins",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.",
        mainImageSrc: x1, // Placeholder, update with actual image
        washiTapeImageSrc: washiTape,
    },
    {
        id: "6",
        title: "What is the Fourth Trimester?",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet scelerisque nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ut pulvinar augue. Proin quis maximus velit.",
        mainImageSrc: x2, // Placeholder, update with actual image
        washiTapeImageSrc: washiTape2,
    },
];

export { blogPostsData }; // Export blogPostsData

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + "...";
};

export const BlogPage = (): JSX.Element => {
    return (
        <div className="relative w-full h-auto min-h-screen flex flex-col items-center pt-32"> {/* Added pt-32 to account for fixed header height */}
            <div className="fixed w-full h-full top-0 left-0 bg-[url(/base-background.png)] bg-cover bg-center -z-10" />

            {/* Header section removed from here, will be handled by global Header.tsx */}
            {/* <header className="w-full flex flex-col items-center justify-center py-8">
                <img
                    className="w-[205px] h-[152px] mb-4"
                    alt="Lunara logo"
                    src={lunaraLogo} // lunaraLogo would need to be imported if this header was used
                />
                <nav className="flex items-center space-x-6 text-[#571e00] [font-family:'Luxurious_Roman-Regular',Helvetica]">
                    <Link to="/about" className="hover:text-[#A27B5C] transition-colors text-lg">About</Link>
                    <Link to="/faq" className="hover:text-[#A27B5C] transition-colors text-lg">FAQ</Link>
                    <Link to="/contact" className="hover:text-[#A27B5C] transition-colors text-lg">Contact</Link>
                    <Link to="/login" className="hover:text-[#A27B5C] transition-colors text-lg">Login</Link>
                </nav>
            </header> */}

            {/* Main content grid for blog posts */}
            <main className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 px-8 max-w-4xl w-full mt-16 mb-8">
                {blogPostsData.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="block no-underline">
                        <div className="relative w-full max-w-sm mx-auto shadow-xl rounded-lg">
                            {/* Paper Image - Base Layer (default z-index: auto, effectively 0) */}
                            <img
                                className="w-full h-auto block" // Removed rounded-lg
                                alt="Blog post background paper"
                                src={post.mainImageSrc}
                            />

                            {/* Text Content - On top of paper (z-10) */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 pt-10 sm:pt-12 md:pt-14 z-10">
                                <div className="w-full max-w-[85%]">
                                    <p className="[font-family:'Lusitana-Regular',Helvetica] font-normal text-[#4e1b00] text-base sm:text-lg md:text-xl mb-1 sm:mb-2 leading-tight">
                                        {post.title}
                                    </p>
                                    <p className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#4e1b00] text-xs sm:text-sm md:text-base leading-snug">
                                        {truncateText(post.excerpt, 100)}
                                    </p>
                                </div>
                            </div>

                            {/* Washi Tape - On top of paper and text (z-20) */}
                            <img
                                className="absolute top-0 left-1/2 transform -translate-x-1/4 w-1/2 max-w-[120px] sm:max-w-[140px] md:max-w-[150px] h-auto z-20"
                                alt="Washi tape accent"
                                src={post.washiTapeImageSrc}
                            />
                        </div>
                    </Link>
                ))}
            </main>

            {/* Pagination - moved from the old footer and placed after the main content */}
            <div className="[font-family:'Luxurious_Roman-Regular',Helvetica] font-normal text-[#571e00] text-xl text-center tracking-[0.60px] leading-[normal] my-8">
                ← PAGE 2 →
            </div>
            
            {/* Ladybug images - positioned relative to the main page container or viewport */}
            <img
                className="w-[116px] h-[116px] absolute top-[180px] left-[20px] object-cover -z-1"
                alt="Ladybug"
                src={ladybug1}
            />
            <img
                className="w-28 h-28 absolute top-[750px] right-[20px] object-cover -z-1" 
                alt="Ladybug"
                src={ladybug2}
            />
        </div>
    );
}; 