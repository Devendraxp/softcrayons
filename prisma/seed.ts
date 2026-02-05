
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // ==================== ADMIN USER ====================
  let admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  const hashedPassword = await hash("Admin@123", 12);

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        id: "admin-001",
        name: "Admin User",
        email: "dnowtech@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: true,
        phone: "+91-9999999999",
      },
    });

    console.log("✅ Admin user created:");
    console.log("   Email:", admin.email);
    console.log("   Password: Admin@123");
    console.log("   Role:", admin.role);

    // Create Account for Better Auth compatibility
    await prisma.account.create({
      data: {
        id: "account-admin-001",
        userId: admin.id,
        accountId: admin.id,
        providerId: "credential",
        password: hashedPassword,
      },
    });

    console.log("✅ Account created for Better Auth");
  } else {
    console.log("✅ Admin user already exists:", admin.email);
  }

  // ==================== CONTENT WRITER USER (for blogs) ====================
  let contentWriter = await prisma.user.findFirst({
    where: { role: "CONTENT_WRITER" },
  });

  if (!contentWriter) {
    contentWriter = await prisma.user.create({
      data: {
        id: "content-writer-001",
        name: "Content Writer",
        email: "writer@softcrayons.com",
        password: hashedPassword,
        role: "CONTENT_WRITER",
        emailVerified: true,
        phone: "+91-8888888888",
      },
    });

    await prisma.account.create({
      data: {
        id: "account-content-writer-001",
        userId: contentWriter.id,
        accountId: contentWriter.id,
        providerId: "credential",
        password: hashedPassword,
      },
    });

    console.log("✅ Content Writer user created:", contentWriter.email);
  }

  // ==================== COURSE CATEGORIES (5) ====================
  const courseCategoriesData = [
    {
      title: "Web Development",
      description: "Learn modern web development technologies including HTML, CSS, JavaScript, React, Node.js and more.",
      slug: "web-development",
      metaTitle: "Web Development Courses | SoftCrayons",
      metaDescription: "Master web development with our comprehensive courses covering frontend, backend, and full-stack development.",
      metaKeywords: ["web development", "frontend", "backend", "javascript", "react"],
      isPublic: true,
    },
    {
      title: "Data Science",
      description: "Explore data science, machine learning, and AI with hands-on projects and real-world datasets.",
      slug: "data-science",
      metaTitle: "Data Science Courses | SoftCrayons",
      metaDescription: "Learn data science, machine learning, and artificial intelligence with industry experts.",
      metaKeywords: ["data science", "machine learning", "AI", "python", "analytics"],
      isPublic: true,
    },
    {
      title: "Mobile Development",
      description: "Build native and cross-platform mobile applications for iOS and Android.",
      slug: "mobile-development",
      metaTitle: "Mobile Development Courses | SoftCrayons",
      metaDescription: "Create stunning mobile apps with React Native, Flutter, and native development.",
      metaKeywords: ["mobile development", "android", "ios", "react native", "flutter"],
      isPublic: true,
    },
    {
      title: "Cloud Computing",
      description: "Master cloud platforms like AWS, Azure, and Google Cloud with hands-on labs.",
      slug: "cloud-computing",
      metaTitle: "Cloud Computing Courses | SoftCrayons",
      metaDescription: "Get certified in AWS, Azure, and GCP with our comprehensive cloud courses.",
      metaKeywords: ["cloud computing", "AWS", "Azure", "GCP", "DevOps"],
      isPublic: true,
    },
    {
      title: "Cybersecurity",
      description: "Learn ethical hacking, penetration testing, and security best practices.",
      slug: "cybersecurity",
      metaTitle: "Cybersecurity Courses | SoftCrayons",
      metaDescription: "Become a cybersecurity expert with our ethical hacking and security courses.",
      metaKeywords: ["cybersecurity", "ethical hacking", "penetration testing", "security"],
      isPublic: true,
    },
  ];

  const courseCategories = [];
  for (const category of courseCategoriesData) {
    const existing = await prisma.courseCategory.findUnique({
      where: { slug: category.slug },
    });
    if (!existing) {
      const created = await prisma.courseCategory.create({ data: category });
      courseCategories.push(created);
    } else {
      courseCategories.push(existing);
    }
  }
  console.log(`✅ ${courseCategories.length} Course Categories created/found`);

  // ==================== COURSES (10) ====================
  const coursesData = [
    {
      title: "Full Stack Web Development Bootcamp",
      description: "Complete bootcamp covering React, Node.js, MongoDB, and deployment.",
      categoryId: courseCategories[0].id,
      slug: "full-stack-web-development-bootcamp",
      about: "This comprehensive bootcamp will take you from zero to a full-stack developer. You'll learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and modern deployment techniques.",
      fees: 49999,
      discount: 20,
      duration: "6 months",
      difficulty: "BEGINNER",
      topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "Express", "Git", "Deployment"],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "Advanced React & Next.js",
      description: "Master React and Next.js for building production-ready applications.",
      categoryId: courseCategories[0].id,
      slug: "advanced-react-nextjs",
      about: "Deep dive into React hooks, state management, server-side rendering with Next.js, and performance optimization.",
      fees: 29999,
      discount: 15,
      duration: "3 months",
      difficulty: "ADVANCED",
      topics: ["React Hooks", "Redux", "Next.js", "SSR", "API Routes", "Authentication"],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "Python for Data Science",
      description: "Learn Python programming with focus on data analysis and visualization.",
      categoryId: courseCategories[1].id,
      slug: "python-data-science",
      about: "Start your data science journey with Python. Learn NumPy, Pandas, Matplotlib, and Seaborn for data analysis and visualization.",
      fees: 34999,
      discount: 10,
      duration: "4 months",
      difficulty: "BEGINNER",
      topics: ["Python Basics", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Data Cleaning"],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "Machine Learning Masterclass",
      description: "Comprehensive ML course covering algorithms, model building, and deployment.",
      categoryId: courseCategories[1].id,
      slug: "machine-learning-masterclass",
      about: "Master machine learning algorithms from scratch. Build and deploy ML models with Scikit-learn, TensorFlow, and AWS.",
      fees: 54999,
      discount: 25,
      duration: "6 months",
      difficulty: "INTERMEDIATE",
      topics: ["Supervised Learning", "Unsupervised Learning", "Neural Networks", "TensorFlow", "Model Deployment"],
      isPublic: true,
      isFeatured: false,
    },
    {
      title: "React Native Mobile Development",
      description: "Build cross-platform mobile apps with React Native and Expo.",
      categoryId: courseCategories[2].id,
      slug: "react-native-mobile-development",
      about: "Create beautiful, native mobile applications for iOS and Android using React Native, Expo, and popular libraries.",
      fees: 39999,
      discount: 20,
      duration: "4 months",
      difficulty: "INTERMEDIATE",
      topics: ["React Native", "Expo", "Navigation", "State Management", "Native Modules", "App Store Deployment"],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "Flutter App Development",
      description: "Master Flutter for building beautiful cross-platform applications.",
      categoryId: courseCategories[2].id,
      slug: "flutter-app-development",
      about: "Learn Dart and Flutter to build stunning mobile applications with a single codebase.",
      fees: 37999,
      discount: 15,
      duration: "4 months",
      difficulty: "BEGINNER",
      topics: ["Dart", "Flutter Widgets", "State Management", "Firebase", "Animations", "Publishing"],
      isPublic: true,
      isFeatured: false,
    },
    {
      title: "AWS Solutions Architect",
      description: "Prepare for AWS certification with hands-on labs and real projects.",
      categoryId: courseCategories[3].id,
      slug: "aws-solutions-architect",
      about: "Comprehensive AWS training covering EC2, S3, Lambda, RDS, VPC, and more. Prepare for the Solutions Architect certification.",
      fees: 44999,
      discount: 20,
      duration: "3 months",
      difficulty: "INTERMEDIATE",
      topics: ["EC2", "S3", "Lambda", "RDS", "VPC", "IAM", "CloudFormation", "Route53"],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "DevOps & CI/CD Pipeline",
      description: "Master DevOps practices with Docker, Kubernetes, and Jenkins.",
      categoryId: courseCategories[3].id,
      slug: "devops-cicd-pipeline",
      about: "Learn modern DevOps practices including containerization, orchestration, and continuous integration/deployment.",
      fees: 42999,
      discount: 10,
      duration: "4 months",
      difficulty: "ADVANCED",
      topics: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "Terraform", "Monitoring"],
      isPublic: true,
      isFeatured: false,
    },
    {
      title: "Ethical Hacking & Penetration Testing",
      description: "Learn ethical hacking techniques and become a certified security professional.",
      categoryId: courseCategories[4].id,
      slug: "ethical-hacking-penetration-testing",
      about: "Comprehensive cybersecurity course covering network security, web application security, and penetration testing methodologies.",
      fees: 49999,
      discount: 15,
      duration: "5 months",
      difficulty: "INTERMEDIATE",
      topics: ["Network Security", "Web App Security", "Kali Linux", "Metasploit", "OWASP", "Bug Bounty"],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "Cybersecurity Fundamentals",
      description: "Introduction to cybersecurity concepts and best practices.",
      categoryId: courseCategories[4].id,
      slug: "cybersecurity-fundamentals",
      about: "Learn the fundamentals of cybersecurity including threat analysis, security protocols, and risk management.",
      fees: 24999,
      discount: 10,
      duration: "2 months",
      difficulty: "BEGINNER",
      topics: ["Security Basics", "Threat Analysis", "Cryptography", "Firewalls", "Security Policies"],
      isPublic: true,
      isFeatured: false,
    },
  ];

  for (const course of coursesData) {
    const existing = await prisma.course.findUnique({
      where: { slug: course.slug },
    });
    if (!existing) {
      await prisma.course.create({ data: course });
    }
  }
  console.log(`✅ 10 Courses created/found`);

  // ==================== BLOG CATEGORIES (5) ====================
  const blogCategoriesData = [
    {
      title: "Technology Trends",
      description: "Latest trends and news in technology and software development.",
      slug: "technology-trends",
      isPublic: true,
      metaTitle: "Technology Trends Blog | SoftCrayons",
      metaDescription: "Stay updated with the latest technology trends and innovations.",
      metaKeywords: ["technology", "trends", "innovation", "software"],
    },
    {
      title: "Career Guidance",
      description: "Tips and advice for building a successful career in tech.",
      slug: "career-guidance",
      isPublic: true,
      metaTitle: "Career Guidance Blog | SoftCrayons",
      metaDescription: "Expert career advice for aspiring tech professionals.",
      metaKeywords: ["career", "jobs", "interview", "resume"],
    },
    {
      title: "Programming Tutorials",
      description: "Step-by-step programming tutorials and coding guides.",
      slug: "programming-tutorials",
      isPublic: true,
      metaTitle: "Programming Tutorials | SoftCrayons",
      metaDescription: "Learn programming with our detailed tutorials and guides.",
      metaKeywords: ["programming", "tutorials", "coding", "development"],
    },
    {
      title: "Industry Insights",
      description: "Deep dives into various tech industries and their developments.",
      slug: "industry-insights",
      isPublic: true,
      metaTitle: "Industry Insights Blog | SoftCrayons",
      metaDescription: "Expert analysis and insights into the tech industry.",
      metaKeywords: ["industry", "insights", "analysis", "tech"],
    },
    {
      title: "Student Success Stories",
      description: "Inspiring stories from our successful students and alumni.",
      slug: "student-success-stories",
      isPublic: true,
      metaTitle: "Student Success Stories | SoftCrayons",
      metaDescription: "Read inspiring success stories from SoftCrayons alumni.",
      metaKeywords: ["success stories", "students", "alumni", "testimonials"],
    },
  ];

  const blogCategories = [];
  for (const category of blogCategoriesData) {
    const existing = await prisma.blogCategory.findUnique({
      where: { slug: category.slug },
    });
    if (!existing) {
      const created = await prisma.blogCategory.create({ data: category });
      blogCategories.push(created);
    } else {
      blogCategories.push(existing);
    }
  }
  console.log(`✅ ${blogCategories.length} Blog Categories created/found`);

  // ==================== BLOGS (10) ====================
  const blogsData = [
    {
      title: "Top 10 Web Development Trends in 2026",
      description: "Discover the latest web development trends shaping the industry in 2026.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2026-01-15"),
      readTime: 8,
      content: `<h2>Introduction</h2><p>The web development landscape is constantly evolving. In 2026, we're seeing revolutionary changes in how we build and deploy web applications.</p><h2>1. AI-Powered Development</h2><p>AI tools are now integral to the development workflow, helping developers write better code faster.</p><h2>2. Edge Computing</h2><p>Edge computing is becoming the standard for deploying web applications with minimal latency.</p><h2>Conclusion</h2><p>Staying updated with these trends is crucial for any web developer looking to remain competitive in the industry.</p>`,
      tags: ["web development", "trends", "2026", "technology"],
      categoryId: blogCategories[0].id,
      slug: "top-10-web-development-trends-2026",
      tableOfContents: [{ title: "Introduction", anchor: "introduction" }, { title: "AI-Powered Development", anchor: "ai-powered" }],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "How to Crack Your First Tech Interview",
      description: "Essential tips and strategies for landing your first job in tech.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2026-01-10"),
      readTime: 12,
      content: `<h2>Preparation is Key</h2><p>Before your interview, research the company thoroughly and understand their tech stack.</p><h2>Technical Preparation</h2><p>Practice coding problems on platforms like LeetCode and HackerRank.</p><h2>Soft Skills Matter</h2><p>Communication and teamwork are just as important as technical skills.</p>`,
      tags: ["career", "interview", "tips", "jobs"],
      categoryId: blogCategories[1].id,
      slug: "how-to-crack-first-tech-interview",
      tableOfContents: [{ title: "Preparation", anchor: "preparation" }, { title: "Technical Prep", anchor: "technical" }],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "Getting Started with React Hooks",
      description: "A comprehensive guide to understanding and using React Hooks effectively.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2026-01-08"),
      readTime: 15,
      content: `<h2>What are React Hooks?</h2><p>Hooks are functions that let you use state and other React features in functional components.</p><h2>useState Hook</h2><p>The useState hook allows you to add state to functional components.</p><h2>useEffect Hook</h2><p>useEffect lets you perform side effects in functional components.</p>`,
      tags: ["react", "hooks", "javascript", "tutorial"],
      categoryId: blogCategories[2].id,
      slug: "getting-started-with-react-hooks",
      tableOfContents: [{ title: "What are Hooks", anchor: "what-are-hooks" }, { title: "useState", anchor: "usestate" }],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "The Rise of AI in Software Development",
      description: "How artificial intelligence is transforming the software development industry.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2026-01-05"),
      readTime: 10,
      content: `<h2>AI-Assisted Coding</h2><p>Tools like GitHub Copilot are revolutionizing how developers write code.</p><h2>Automated Testing</h2><p>AI is making testing more efficient and comprehensive.</p><h2>The Future</h2><p>AI will continue to augment developer capabilities, not replace them.</p>`,
      tags: ["AI", "software development", "technology", "future"],
      categoryId: blogCategories[3].id,
      slug: "rise-of-ai-in-software-development",
      tableOfContents: [{ title: "AI-Assisted Coding", anchor: "ai-coding" }, { title: "Future", anchor: "future" }],
      isPublic: true,
      isFeatured: false,
    },
    {
      title: "From Zero to Software Engineer: Rahul's Journey",
      description: "How Rahul transformed his career from a non-tech background to a software engineer.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2026-01-03"),
      readTime: 7,
      content: `<h2>The Beginning</h2><p>Rahul was working in a bank when he decided to switch to tech.</p><h2>The Learning Phase</h2><p>He enrolled in SoftCrayons' Full Stack bootcamp and dedicated himself to learning.</p><h2>The Success</h2><p>Within 8 months, Rahul landed a job at a top MNC with a 120% salary hike.</p>`,
      tags: ["success story", "career change", "inspiration"],
      categoryId: blogCategories[4].id,
      slug: "zero-to-software-engineer-rahul-journey",
      tableOfContents: [{ title: "Beginning", anchor: "beginning" }, { title: "Success", anchor: "success" }],
      isPublic: true,
      isFeatured: true,
    },
    {
      title: "Understanding TypeScript: A Complete Guide",
      description: "Everything you need to know about TypeScript and why you should use it.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2025-12-28"),
      readTime: 18,
      content: `<h2>Why TypeScript?</h2><p>TypeScript adds static typing to JavaScript, catching errors at compile time.</p><h2>Basic Types</h2><p>Learn about string, number, boolean, array, and object types.</p><h2>Advanced Features</h2><p>Explore generics, interfaces, and decorators.</p>`,
      tags: ["typescript", "javascript", "programming", "tutorial"],
      categoryId: blogCategories[2].id,
      slug: "understanding-typescript-complete-guide",
      tableOfContents: [{ title: "Why TypeScript", anchor: "why" }, { title: "Basic Types", anchor: "basics" }],
      isPublic: true,
      isFeatured: false,
    },
    {
      title: "Building Your Personal Brand in Tech",
      description: "Tips for creating a strong personal brand as a tech professional.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2025-12-25"),
      readTime: 9,
      content: `<h2>Why Personal Branding?</h2><p>A strong personal brand opens doors to opportunities.</p><h2>LinkedIn Optimization</h2><p>Make your LinkedIn profile stand out with these tips.</p><h2>Content Creation</h2><p>Share your knowledge through blogs, videos, or social media.</p>`,
      tags: ["personal branding", "career", "linkedin", "tips"],
      categoryId: blogCategories[1].id,
      slug: "building-personal-brand-in-tech",
      tableOfContents: [{ title: "Why Branding", anchor: "why" }, { title: "LinkedIn", anchor: "linkedin" }],
      isPublic: true,
      isFeatured: false,
    },
    {
      title: "Cloud Computing: AWS vs Azure vs GCP",
      description: "A detailed comparison of the top three cloud platforms.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2025-12-20"),
      readTime: 14,
      content: `<h2>Market Overview</h2><p>AWS leads the market, followed by Azure and GCP.</p><h2>Pricing Comparison</h2><p>Each platform has different pricing models and free tiers.</p><h2>Which to Choose?</h2><p>Your choice depends on your specific needs and existing tech stack.</p>`,
      tags: ["cloud", "AWS", "Azure", "GCP", "comparison"],
      categoryId: blogCategories[3].id,
      slug: "cloud-computing-aws-azure-gcp-comparison",
      tableOfContents: [{ title: "Overview", anchor: "overview" }, { title: "Pricing", anchor: "pricing" }],
      isPublic: true,
      isFeatured: false,
    },
    {
      title: "Microservices Architecture Explained",
      description: "A beginner-friendly guide to understanding microservices architecture.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2025-12-15"),
      readTime: 11,
      content: `<h2>What are Microservices?</h2><p>Microservices break down applications into small, independent services.</p><h2>Benefits</h2><p>Scalability, flexibility, and easier maintenance.</p><h2>Challenges</h2><p>Complexity in deployment and monitoring.</p>`,
      tags: ["microservices", "architecture", "backend", "design"],
      categoryId: blogCategories[0].id,
      slug: "microservices-architecture-explained",
      tableOfContents: [{ title: "What are Microservices", anchor: "what" }, { title: "Benefits", anchor: "benefits" }],
      isPublic: true,
      isFeatured: false,
    },
    {
      title: "Priya's Success: From Housewife to Python Developer",
      description: "An inspiring story of how Priya learned Python and started her tech career.",
      authorId: contentWriter.id,
      dateOfPublish: new Date("2025-12-10"),
      readTime: 6,
      content: `<h2>The Decision</h2><p>After 5 years as a housewife, Priya decided to restart her career.</p><h2>The Journey</h2><p>She joined SoftCrayons' Python course and learned diligently.</p><h2>The Outcome</h2><p>Today, she works as a Python developer at a leading startup.</p>`,
      tags: ["success story", "women in tech", "python", "inspiration"],
      categoryId: blogCategories[4].id,
      slug: "priya-success-housewife-to-python-developer",
      tableOfContents: [{ title: "Decision", anchor: "decision" }, { title: "Outcome", anchor: "outcome" }],
      isPublic: true,
      isFeatured: false,
    },
  ];

  for (const blog of blogsData) {
    const existing = await prisma.blog.findUnique({
      where: { slug: blog.slug },
    });
    if (!existing) {
      await prisma.blog.create({ data: blog });
    }
  }
  console.log(`✅ 10 Blogs created/found`);

  // ==================== TESTIMONIALS (10) ====================
  const testimonialsData = [
    {
      studentName: "Amit Sharma",
      avatar: null,
      rating: 5,
      feedback: "SoftCrayons transformed my career! The Full Stack course was comprehensive and the instructors were extremely helpful. I got placed at a top MNC within 2 months of completing the course.",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Priya Patel",
      avatar: null,
      rating: 5,
      feedback: "The Python and Data Science course exceeded my expectations. The hands-on projects and real-world examples made learning so much easier. Highly recommended!",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Rahul Verma",
      avatar: null,
      rating: 4,
      feedback: "Great learning experience! The AWS course helped me get certified and land a cloud architect role. The practical labs were invaluable.",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Sneha Gupta",
      avatar: null,
      rating: 5,
      feedback: "I was a complete beginner when I joined. Now I'm working as a React developer. The faculty is patient and always ready to help.",
      isPublic: true,
      isFeatured: false,
    },
    {
      studentName: "Vikram Singh",
      avatar: null,
      rating: 5,
      feedback: "The DevOps course was exactly what I needed to advance my career. I learned Docker, Kubernetes, and CI/CD in depth. Worth every penny!",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Anjali Mishra",
      avatar: null,
      rating: 4,
      feedback: "Excellent course content and knowledgeable trainers. The placement support was amazing - they helped me prepare for interviews and negotiate my salary.",
      isPublic: true,
      isFeatured: false,
    },
    {
      studentName: "Rajesh Kumar",
      avatar: null,
      rating: 5,
      feedback: "From a non-IT background to a software developer - SoftCrayons made it possible. The structured curriculum and mentor support were game-changers.",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Neha Agarwal",
      avatar: null,
      rating: 5,
      feedback: "The Flutter course was fantastic! I built my first app during the course itself. The trainer was very experienced and taught practical concepts.",
      isPublic: true,
      isFeatured: false,
    },
    {
      studentName: "Suresh Reddy",
      avatar: null,
      rating: 4,
      feedback: "Good institute with industry-relevant curriculum. The cybersecurity course gave me practical knowledge that I use daily in my job.",
      isPublic: true,
      isFeatured: false,
    },
    {
      studentName: "Kavita Joshi",
      avatar: null,
      rating: 5,
      feedback: "Best decision of my life! Joined as a fresher, got placed at a product company with an excellent package. Thank you SoftCrayons team!",
      isPublic: true,
      isFeatured: true,
    },
  ];

  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({ data: testimonialsData });
    console.log(`✅ 10 Testimonials created`);
  } else {
    console.log(`✅ Testimonials already exist (${existingTestimonials} found)`);
  }

  // ==================== PLACEMENTS (10) ====================
  const placementsData = [
    {
      studentName: "Rohit Sharma",
      avatar: null,
      courseName: "Full Stack Web Development",
      dialogue: "The practical training at SoftCrayons prepared me well for real-world challenges.",
      packageOffered: "12 LPA",
      companyName: "Infosys",
      position: "Software Engineer",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Meera Krishnan",
      avatar: null,
      courseName: "Data Science & ML",
      dialogue: "I never imagined I could become a data scientist. SoftCrayons made it happen!",
      packageOffered: "15 LPA",
      companyName: "Amazon",
      position: "Data Analyst",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Arjun Nair",
      avatar: null,
      courseName: "AWS Solutions Architect",
      dialogue: "Got AWS certified and placed at a top company. The training was exceptional.",
      packageOffered: "18 LPA",
      companyName: "TCS",
      position: "Cloud Architect",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Pooja Sinha",
      avatar: null,
      courseName: "React Native Development",
      dialogue: "Building mobile apps was my dream. Now I'm doing it professionally!",
      packageOffered: "10 LPA",
      companyName: "Wipro",
      position: "Mobile Developer",
      isPublic: true,
      isFeatured: false,
    },
    {
      studentName: "Karan Malhotra",
      avatar: null,
      courseName: "DevOps & CI/CD",
      dialogue: "The hands-on labs with Docker and Kubernetes gave me a competitive edge.",
      packageOffered: "14 LPA",
      companyName: "Accenture",
      position: "DevOps Engineer",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Divya Rajan",
      avatar: null,
      courseName: "Python for Data Science",
      dialogue: "From zero coding knowledge to a Python developer in 6 months!",
      packageOffered: "8 LPA",
      companyName: "Tech Mahindra",
      position: "Python Developer",
      isPublic: true,
      isFeatured: false,
    },
    {
      studentName: "Sanjay Mehta",
      avatar: null,
      courseName: "Ethical Hacking",
      dialogue: "The cybersecurity course opened up a whole new career path for me.",
      packageOffered: "11 LPA",
      companyName: "IBM",
      position: "Security Analyst",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Nisha Kapoor",
      avatar: null,
      courseName: "Advanced React & Next.js",
      dialogue: "Learning React and Next.js was the best investment in my career.",
      packageOffered: "13 LPA",
      companyName: "HCL",
      position: "Frontend Developer",
      isPublic: true,
      isFeatured: false,
    },
    {
      studentName: "Aditya Saxena",
      avatar: null,
      courseName: "Machine Learning",
      dialogue: "The ML project work gave me real-world experience that interviewers loved.",
      packageOffered: "20 LPA",
      companyName: "Microsoft",
      position: "ML Engineer",
      isPublic: true,
      isFeatured: true,
    },
    {
      studentName: "Ritu Pandey",
      avatar: null,
      courseName: "Flutter Development",
      dialogue: "Flutter course was comprehensive. Now I build apps for both iOS and Android.",
      packageOffered: "9 LPA",
      companyName: "Capgemini",
      position: "Flutter Developer",
      isPublic: true,
      isFeatured: false,
    },
  ];

  const existingPlacements = await prisma.placement.count();
  if (existingPlacements === 0) {
    await prisma.placement.createMany({ data: placementsData });
    console.log(`✅ 10 Placements created`);
  } else {
    console.log(`✅ Placements already exist (${existingPlacements} found)`);
  }

  // ==================== FACULTIES (5) ====================
  const facultiesData = [
    {
      name: "Dr. Rajesh Kumar",
      designation: "Senior Technical Instructor",
      domain: "Full Stack Development",
      avatar: null,
      bio: "Dr. Rajesh has 15+ years of experience in software development and has trained over 5000+ students. He specializes in JavaScript, React, and Node.js.",
      experience: "15+ years",
      ProjectsHandled: "50+",
      studentsMentored: "5000+",
      ratings: 4.9,
      technologies: ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript"],
      locations: "Noida, Delhi",
      isPublic: true,
      isFeatured: true,
    },
    {
      name: "Priya Sharma",
      designation: "Data Science Lead",
      domain: "Data Science & Machine Learning",
      avatar: null,
      bio: "Priya is a data science expert with experience at top tech companies. She has a passion for teaching and making complex concepts simple.",
      experience: "10+ years",
      ProjectsHandled: "30+",
      studentsMentored: "3000+",
      ratings: 4.8,
      technologies: ["Python", "TensorFlow", "PyTorch", "SQL", "Tableau"],
      locations: "Noida, Gurgaon",
      isPublic: true,
      isFeatured: true,
    },
    {
      name: "Amit Verma",
      designation: "Cloud Solutions Architect",
      domain: "Cloud Computing & DevOps",
      avatar: null,
      bio: "Amit is an AWS and Azure certified architect with extensive experience in cloud infrastructure and DevOps practices.",
      experience: "12+ years",
      ProjectsHandled: "40+",
      studentsMentored: "2500+",
      ratings: 4.7,
      technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
      locations: "Noida",
      isPublic: true,
      isFeatured: true,
    },
    {
      name: "Sneha Gupta",
      designation: "Mobile Development Expert",
      domain: "Mobile App Development",
      avatar: null,
      bio: "Sneha specializes in cross-platform mobile development with React Native and Flutter. She has published multiple apps on App Store and Play Store.",
      experience: "8+ years",
      ProjectsHandled: "25+",
      studentsMentored: "1500+",
      ratings: 4.8,
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      locations: "Noida, Delhi",
      isPublic: true,
      isFeatured: false,
    },
    {
      name: "Vikram Singh",
      designation: "Cybersecurity Specialist",
      domain: "Cybersecurity & Ethical Hacking",
      avatar: null,
      bio: "Vikram is a certified ethical hacker with experience in penetration testing and security audits for Fortune 500 companies.",
      experience: "11+ years",
      ProjectsHandled: "35+",
      studentsMentored: "2000+",
      ratings: 4.9,
      technologies: ["Kali Linux", "Metasploit", "Burp Suite", "Wireshark", "OWASP"],
      locations: "Noida",
      isPublic: true,
      isFeatured: true,
    },
  ];

  const existingFaculties = await prisma.faculty.count();
  if (existingFaculties === 0) {
    await prisma.faculty.createMany({ data: facultiesData });
    console.log(`✅ 5 Faculties created`);
  } else {
    console.log(`✅ Faculties already exist (${existingFaculties} found)`);
  }

  console.log("\n🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
