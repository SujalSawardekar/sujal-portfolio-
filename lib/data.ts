export type PortfolioMode = 'uiux' | 'graphic' | 'video'

export const projects = [
    // UI/UX Projects
    {
        type: 'uiux',
        slug: "amppere-cable",
        title: "Amppere Cable",
        category: "Website Redesign",
        problem: "The existing website lacked modern UX standards, with poor responsive layout and inconsistent visual hierarchy.",
        solution: "Delivered a full responsive redesign with improved UX, restructured layout, and cohesive social media creatives.",
        tools: ["Figma", "WordPress", "Photoshop", "Canva"],
        outcome: "Improved user engagement and brand consistency across web and social media channels.",
        image: "/images/project-1.jpg",
        link: "#",
    },
    {
        type: 'uiux',
        slug: "nexus-engineering",
        title: "Nexus Engineering",
        category: "Designed Web App",
        problem: "The existing website lacked modern UX standards, with poor responsive layout across multiple device sizes.",
        solution: "Delivered a full responsive redesign with improved UX, restructured layout, and cohesive social media creatives.",
        tools: ["Figma", "WordPress", "Photoshop", "Canva"],
        outcome: "Improved user engagement and brand consistency across web and social media channels.",
        image: "/images/project-nexus-2.png",
        link: "#",
    },
    {
        type: 'uiux',
        slug: "crickanalyzer",
        title: "CrickAnalyzer",
        category: "Mobile Optimization",
        problem: "The cricket analytics app had poor mobile readability, cluttered navigation, and inconsistent design patterns.",
        solution: "Executed a complete mobile redesign focused on improved readability and data-first visual hierarchy.",
        tools: ["Figma", "Adobe XD", "Mobile Design", "Prototyping"],
        outcome: "Significantly enhanced mobile UX with clearer data presentation and faster navigation flow.",
        image: "/images/project-3.jpg",
        link: "#",
    },

    // Graphic Design Projects
    {
        type: 'graphic',
        slug: "brand-identity-nexus",
        title: "Nexus Visual Identity",
        category: "Branding",
        problem: "Need a professional, safety-first visual identity for a engineering firm that communicates reliability and connectivity.",
        solution: "Created a bold, modern logo with a geometric mark representing 'Nexus', paired with a trust-focused navy and gold palette.",
        outcome: "Established a cohesive brand presence across digital and physical assets, significantly improving client perception.",
        image: "/images/graphics-1.jpg",
        tools: ["Illustrator", "Photoshop", "Brand Strategy"],
        link: "#",
    },
    {
        type: 'graphic',
        slug: "social-media-campaign",
        title: "Digital Blast Campaign",
        category: "Social Media",
        problem: "Product launch engagement was low due to cluttered, non-impactful social media graphics that failed to stop the scroll.",
        solution: "Designed a series of high-contrast, rhythm-focused digital assets with clear CTAs and bold typography for maximum impact.",
        outcome: "Achieved a 45% increase in engagement rates and a marked improvement in campaign conversion metrics.",
        image: "/images/graphics-2.jpg",
        tools: ["Photoshop", "Canva", "Digital Design"],
        link: "#",
    },

    // Video Editing Projects
    {
        type: 'video',
        slug: "cinematic-showreel",
        title: "2024 Design Reel",
        category: "Motion Graphics",
        problem: "Clients lacked a quick way to assess motion capabilities across different video styles in a single viewing experience.",
        solution: "Edited a high-energy, sound-synced showreel featuring custom motion graphics, smooth transitions, and color grading.",
        outcome: "Became the #1 conversion tool for new lead generation, effectively showcasing a wide spectrum of technical editing skills.",
        image: "/images/video-1.jpg",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
        tools: ["Premiere Pro", "After Effects", "Sound Design"],
        link: "#",
    },
    {
        type: 'video',
        slug: "product-ad-amppere",
        title: "Amppere Product Ad",
        category: "Commercial",
        problem: "Traditional electrical cable marketing was perceived as dull, failing to capture the technical innovation of the product.",
        solution: "Produced a fast-paced commercial using 3D renders, macro cinematography tips, and dynamic motion graphic overlays.",
        outcome: "Successfully launched the product line with a premium feel, boosting brand awareness in competitive B2B markets.",
        image: "/images/video-2.jpg",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        tools: ["Premiere Pro", "DaVinci Resolve", "Motion Graphics"],
        link: "#",
    },
]

export const skillData = {
    uiux: {
        orbs: [
            { name: "Figma", color: "#00f2ff", radius: 120, speed: 8, exp: "2.5+ years", abbr: "FG" },
            { name: "Adobe XD", color: "#8b3fff", radius: 155, speed: 11, exp: "1+ years", abbr: "XD" },
            { name: "Photoshop", color: "#ff8c00", radius: 190, speed: 14, exp: "5+ years", abbr: "PS" },
            { name: "Spline 3D", color: "#3d6fff", radius: 135, speed: 9, exp: "1 year", abbr: "SP" },
            { name: "Webflow", color: "#00ffba", radius: 175, speed: 13, exp: "1.5+ years", abbr: "WF" },
            { name: "Framer", color: "#8b3fff", radius: 210, speed: 16, exp: "1.5+ years", abbr: "FR" },
        ],
        columns: [
            { title: "Design Tools", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Canva"] },
            { title: "UX Skills", items: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "UI Design"] },
            { title: "Web Tech", items: ["Webflow", "Framer", "Spline 3D", "HTML/CSS", "Next.js"] },
        ]
    },
    graphic: {
        orbs: [
            { name: "Illustrator", color: "#ff8c00", radius: 120, speed: 8, exp: "4+ years", abbr: "AI" },
            { name: "Photoshop", color: "#00f2ff", radius: 155, speed: 11, exp: "5+ years", abbr: "PS" },
            { name: "InDesign", color: "#ff4444", radius: 190, speed: 14, exp: "2+ years", abbr: "ID" },
            { name: "Canva", color: "#00ffba", radius: 135, speed: 9, exp: "3+ years", abbr: "CV" },
            { name: "CorelDraw", color: "#3d6fff", radius: 175, speed: 13, exp: "2+ years", abbr: "CD" },
        ],
        columns: [
            { title: "Visual Design", items: ["Logo Design", "Brand Identity", "Typography", "Color Theory", "Layout Design"] },
            { title: "Print Media", items: ["Brochures", "Business Cards", "Posters", "Packaging", "Flyers"] },
            { title: "Digital", items: ["Social Media Graphics", "UI Assets", "Vector Illustration", "Photo Manipulation"] },
        ]
    },
    video: {
        orbs: [
            { name: "Premiere Pro", color: "#00ffba", radius: 120, speed: 8, exp: "4+ years", abbr: "PR" },
            { name: "After Effects", color: "#8b3fff", radius: 155, speed: 11, exp: "3+ years", abbr: "AE" },
            { name: "DaVinci Resolve", color: "#ff8c00", radius: 190, speed: 14, exp: "1+ years", abbr: "DR" },
            { name: "Filmora", color: "#00f2ff", radius: 135, speed: 9, exp: "3+ years", abbr: "FL" },
            { name: "CapCut", color: "#ffffff", radius: 175, speed: 13, exp: "2+ years", abbr: "CC" },
        ],
        columns: [
            { title: "Editing Tools", items: ["Cuts & Transitions", "Audio Mixing", "Motion Graphics", "Storyboarding"] },
            { title: "Content Formats", items: ["Instagram Reels", "YouTube Shorts", "Corporate Videos", "Commercial Ads"] },
            { title: "Platform Layouts", items: ["Social Media", "Landscape Video", "Vertical Video", "Square Formats"] },
        ]
    }
}
