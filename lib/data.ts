export type PortfolioMode = 'uiux' | 'graphic' | 'video'

export const projects = [
    // UI/UX Projects
    {
        type: 'uiux',
        slug: "amppere-cable",
        title: "Amppere Cable",
        category: "Website Redesign",
        shortDescription: "The existing website lacked clarity and visual hierarchy, making it hard to find important information and reducing readability and user trust.",
        problem: "When I first came across the Ampere Cable website, it reflected a common issue seen in many industrial businesses—strong products, but a weak digital presence.\n\nThe website wasn't broken. It worked. But it didn't communicate.\n\nInformation was scattered, layouts felt unstructured, and there was no clear direction guiding the user. For a company dealing in technical products, this lack of clarity directly impacts trust.\n\nImportant information was hard to find, there was no visual hierarchy to guide attention, typography and spacing reduced readability, and the overall interface lacked consistency. The experience felt cluttered and outdated—something that could push potential clients away instead of building confidence.",
        solution: "The redesign focused on structure first, visuals later.\n\nI started by restructuring the information architecture: grouping related content logically, prioritizing key sections like products and services, and creating a predictable navigation flow.\n\nTo improve usability, typography was standardized, spacing was increased for better content separation, and layouts were simplified to reduce cognitive load.\n\nInstead of random styling, a consistent color palette was applied, UI components were standardized, and visual hierarchy was clearly defined. Reusable components were created to ensure consistency across pages, faster scalability for future updates, and a cleaner design structure.",
        tools: ["Figma", "Information Architecture", "UI System", "Prototyping"],
        outcome: "The final result was not just a visual upgrade, but a functional improvement. It delivered a cleaner and more professional interface, improved readability and content flow, stronger visual hierarchy, and a more consistent brand identity.\n\nThe website now communicates what the business does—clearly and confidently.\n\nThis project taught me that good design is invisible when it works well, structure matters more than decoration, and simplicity requires deliberate decisions. It reinforced the importance of designing for clarity, especially in domains where information is complex.",
        image: "/images/Hero Photo/project-1.jpg",
        link: "https://www.ampperecable.in/",
        prototypeLink: "https://www.figma.com/proto/BYPEQJ9oNtsHE41mDWRqpo/AMPPERE-CABLE?node-id=581-1630&p=f&viewport=706%2C315%2C0.02&t=MZCOuaU3W8bD39r0-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=581%3A1630&show-proto-sidebar=1&page-id=141%3A666",
    },
    {
        type: 'uiux',
        slug: "nexus-engineering",
        title: "Nexus Engineering",
        category: "Website Design",
        shortDescription: "Nexus Engineering's presence was limited to a physical brochure. I transformed their dense technical content into a clear, functional digital experience from scratch.",
        problem: "Nexus Engineering didn't start with a website.\n\nTheir entire business presence was limited to a physical brochure—filled with technical services, but lacking a clear way to communicate them digitally.\n\nThe problem wasn't capability. It was visibility.\n\nWithout an online presence, potential clients had no easy way to explore services, understand offerings, or build trust before making contact. The brochure contained all the information, but in a format that didn't scale digitally.\n\nKey issues included dense, technical content that was difficult to scan, no structured service hierarchy, no user journey or navigation flow, and no consistent brand identity online. It worked offline, but failed in a digital context.",
        solution: "This wasn't a redesign—it was building from zero. The challenge was to translate complex engineering services into a clear digital format while maintaining a professional and trustworthy tone.\n\nThe first step was organizing information: categorizing services (Fire Safety, CCTV, AMC, etc.), defining clear sections for easy navigation, and prioritizing what users need first.\n\nTo improve usability, clean layouts replaced dense text blocks, typography was standardized for readability, and spacing was used to separate content effectively.\n\nSince no strong digital identity existed, a bold red and white palette was introduced, and visual hierarchy was established to guide attention. The design wasn't just conceptual—it was fully implemented into a responsive website, ensuring compatibility across devices and a focus on performance.",
        tools: ["Figma", "UI Design", "Information Architecture", "Web Development"],
        outcome: "The final result transformed Nexus Engineering's presence from a static brochure to a highly functional website.\n\nServices are now presented clearly, with improved navigation, readability, and a stronger professional brand perception. The business finally has a digital platform that supports its growth.\n\nThis project reinforced that good structure is more important than visual complexity, and designing from scratch requires strong content thinking. Clarity builds trust—especially in technical domains—and aligning design with business goals is essential.",
        image: "/images/Hero Photo/Nexus Enginnering.jpg",
        link: "https://www.nexusengineering.in/",
        prototypeLink: "https://www.figma.com/proto/G3uplAC5c2bNY9LSYYkw0Y/NEXUS-ENGINEERING--Copy-?node-id=176-7767&p=f&viewport=-895%2C65%2C0.11&t=22YxXfg9hfeQSyb1-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=176%3A7767&show-proto-sidebar=1&page-id=0%3A1",
    },
    {
        type: 'uiux',
        slug: "crickanalyzer",
        title: "CrickAnalyzer",
        category: "Mobile App Design",
        shortDescription: "CrickAnalyzer provides detailed cricket statistics, but the existing experience was cluttered. I simplified the complex data into an intuitive, mobile-optimized interface.",
        problem: "CrickAnalyzer was designed to provide detailed cricket statistics for the Maharashtra circuit.\n\nBut the existing experience made it difficult to actually use that data. The interface felt cluttered, navigation was unclear, and key insights were buried under heavy information.\n\nThe problem wasn't lack of data. It was how the data was presented.\n\nDesigning for a data-heavy sports app meant dealing with an overloaded interface, poor readability on mobile screens, and no clear hierarchy to guide users. Complex statistics needed to be simplified while maintaining depth without overwhelming users.",
        solution: "The redesign focused on restructuring the experience for mobile screens.\n\nI started by organizing the stats into clear sections and prioritizing key insights like players, matches, and reports.\n\nTo improve readability, typography was refined specifically for small screens, and spacing was increased for visual clarity.\n\nThe interface was designed with clean, minimal layouts, a strong visual hierarchy, and consistent UI components to make the dense data digestible.",
        tools: ["Figma", "UI Design", "Data Visualization", "Information Architecture", "Prototyping"],
        outcome: "The new design makes navigation across stats and reports much easier.\n\nBy prioritizing clean layouts and typography, the readability and clarity of the data were significantly improved.\n\nThe outcome is a far more intuitive mobile experience that allows users to access complex cricket analytics on the go without feeling overwhelmed.",
        image: "/images/Hero Photo/crickanalyzer-app.jpg",
        link: "#",
        prototypeLink: "https://www.figma.com/proto/aoWQpCDBlfYX1oh47DAOSx/Crick-analyzer--Og?page-id=0%3A1&node-id=362-12110&p=f&viewport=822%2C844%2C0.25&t=ywgxmLZid040VfP5-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=362%3A11796",
    },
    {
        type: 'uiux',
        slug: "design-sphere",
        title: "Design Sphere",
        category: "Portfolio Platform",
        shortDescription: "Design Sphere removes the technical barrier of building a portfolio. I designed a no-code platform enabling users to create structured, interactive portfolios effortlessly.",
        problem: "Creating a portfolio is essential—but for many students and freelancers, it becomes a technical challenge.\n\nUsers struggle with coding-based portfolio creation. Existing platforms are often either too complex to use or too generic to stand out, and there is a lack of structured guidance in building portfolios.\n\nDesign Sphere was built to remove that barrier by enabling users to create structured, interactive portfolios without coding.\n\nThe challenge was to balance flexibility with simplicity, create scalable layouts for different users, and maintain high design quality without requiring technical skills.",
        solution: "Building the platform required a strong system-thinking approach.\n\nI designed reusable portfolio sections and created structured templates to form the foundation of the platform.\n\nThe UX design prioritized a simple, guided experience with a clear content flow, making it easy for anyone to build their site.\n\nFor the no-code implementation, the platform was built using Webflow, with a heavy focus on responsiveness and scalability so templates adapt perfectly to any content.",
        tools: ["Webflow", "Spline 3D", "UI Design"],
        outcome: "The platform successfully simplified portfolio creation for non-technical users.\n\nBy providing structured, clean layouts, users can now focus on showcasing their work rather than struggling with code.\n\nThe final product is a highly accessible, no-code platform that democratizes high-end design for students and freelancers.",
        image: "/images/Hero Photo/design-sphere-app.jpg",
        link: "https://designsphere123.webflow.io/",
        prototypeLink: "https://designsphere123.webflow.io/",
    },
    {
        type: 'uiux',
        slug: "krushi-sakhi",
        title: "Krushi Sakhi",
        category: "Product & UI/UX Design",
        shortDescription: "Krushi Sakhi makes agricultural knowledge accessible. I designed a visual-first, multilingual platform for rural users with low digital literacy.",
        problem: "Krushi Sakhi was created to make agricultural knowledge more accessible for farmers.\n\nWhile data and insights exist, most platforms fail because they are too complex, text-heavy, and difficult to use for users with low digital literacy.\n\nThe goal was simple: Make information usable.\n\nGeneric and delayed agricultural advice, combined with text-heavy interfaces, created massive accessibility barriers for rural users. The challenge was to simplify complex agricultural data and design for first-time smartphone users while reducing the dependency on text.",
        solution: "The design approach focused on radically simplifying the structure and prioritizing accessibility.\n\nContent was organized intuitively into crop lifecycle stages so farmers could find exactly what they needed.\n\nTo address literacy barriers, a visual-first interface was implemented along with voice and multilingual support.\n\nFinally, a scalable design system was built with clean layouts and consistent UI components to ensure the app remains easy to navigate as more features are added.",
        tools: ["Figma", "UX Research", "UI Design", "Agri-tech", "Accessibility"],
        outcome: "The new design significantly improved the accessibility of vital agricultural information.\n\nThe user experience was simplified specifically for rural users, ensuring that first-time smartphone owners could easily navigate the app.\n\nThe highly mobile-friendly design empowers farmers with AI detection and voice guidance without the friction of traditional text-heavy apps.",
        image: "/images/Hero Photo/krushi-sakhi-app.jpg",
        link: "https://www.figma.com/proto/sgpDp7IXX22ITz2bAdMH4d/Krushi-Sakhi?node-id=153-309&p=f&viewport=5671%2C60%2C0.78&t=A6jR1DQGvNd5b4C9-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1&page-id=0%3A1",
        prototypeLink: "https://www.figma.com/proto/sgpDp7IXX22ITz2bAdMH4d/Krushi-Sakhi?node-id=153-309&p=f&viewport=5671%2C60%2C0.78&t=A6jR1DQGvNd5b4C9-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1&page-id=0%3A1",
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
        prototypeLink: "",
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
        prototypeLink: "",
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
        prototypeLink: "",
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
        prototypeLink: "",
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

export const researchData = {
    title: "Sujal S. Sawardekar, et al. “A Comprehensive Survey: Deep Learning for Face Recognition.”",
    publication: "International Journal of Creative Research Thoughts (IJCRT), Vol. 14, Issue 4",
    date: "April 2026",
    description: "An extensive study analyzing the evolution of face recognition technologies, reviewing 19+ research papers on deep learning models including CNNs and Vision Transformers.",
    highlights: [
        "Reviewed 19+ research papers on deep learning models including CNNs and Vision Transformers",
        "Analyzed challenges like occlusion, adversarial attacks, and real-world deployment gaps",
        "Benchmarking on various datasets and model architectures",
        "Discussion on ethical AI and bias mitigation"
    ],
    links: [
        { label: "View Paper", url: "/Research/IJCRT2604906.pdf", icon: "file-text" },
        { label: "Certificate", url: "/Research/IJCRT_Certificate_IJCRT_306395.pdf", icon: "award" },
        { label: "Acceptance Letter", url: "/Research/IJCRT_Confirmation_Letter_306395.pdf", icon: "mail" }
    ],
    stats: [
        { label: "Citations", value: "Upcoming" },
        { label: "Read Time", value: "15 min" },
        { label: "Peer Reviewed", value: "Yes" }
    ]
}
