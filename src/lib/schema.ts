import pool from './db';

export async function initializeDatabase() {
  try {
    // Projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        case_study JSONB,
        category TEXT,
        cover_image TEXT,
        gallery JSONB,
        technologies JSONB,
        live_url TEXT,
        source_url TEXT,
        featured BOOLEAN DEFAULT false,
        published BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Achievements table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS achievements (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        issuer TEXT,
        year TEXT,
        date TEXT,
        category TEXT,
        description TEXT,
        image TEXT,
        credential_url TEXT,
        published BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Skills table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        icon TEXT,
        description TEXT,
        published BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Journey table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS journey (
        id TEXT PRIMARY KEY,
        date_or_year TEXT,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        link TEXT,
        published BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // About profile table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS about_profile (
        id TEXT PRIMARY KEY DEFAULT 'about-1',
        name TEXT,
        headline TEXT,
        bio TEXT,
        photo TEXT,
        education TEXT,
        interests TEXT,
        current_focus TEXT,
        public_location TEXT,
        drives JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Site settings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id TEXT PRIMARY KEY DEFAULT 'settings-1',
        site_title TEXT,
        site_description TEXT,
        hero_eyebrow TEXT,
        hero_headline TEXT,
        hero_role TEXT,
        hero_description TEXT,
        contact_email TEXT,
        instagram_url TEXT,
        whatsapp_url TEXT,
        github_url TEXT,
        footer_text TEXT,
        stats JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Social links table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS social_links (
        id TEXT PRIMARY KEY,
        platform TEXT,
        label TEXT,
        url TEXT,
        icon TEXT,
        published BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0
      )
    `);

    console.log('Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// Seed initial data
export async function seedInitialData() {
  try {
    // Check if data already exists
    const existing = await pool.query('SELECT COUNT(*) as count FROM projects');
    if (parseInt(existing.rows[0].count) > 0) {
      console.log('Data already seeded');
      return true;
    }

    // Seed site settings
    await pool.query(`
      INSERT INTO site_settings (id, site_title, site_description, hero_eyebrow, hero_headline, hero_role, hero_description, contact_email, instagram_url, whatsapp_url, github_url, footer_text, stats)
      VALUES ('settings-1', 'Malik Ibrahim — Portfolio', 'Personal portfolio and showcase of Malik Ibrahim, Full-Stack Developer & Cybersecurity Enthusiast.', 'WELCOME TO MY PORTFOLIO', 'Hi, I am Malik Ibrahim', 'Full-Stack Developer & Cybersecurity Enthusiast', 'I build digital products, explore how systems work, and continuously learn to secure them.', 'malik.ibrahim.dev@gmail.com', 'https://instagram.com', 'https://wa.me/6281234567890', 'https://github.com', '© 2026 Malik Ibrahim. All rights reserved.', '[{"id":"1","value":"2+","label":"Years Learning","sub":"Coding & Sec","icon":"GraduationCap"},{"id":"2","value":"8+","label":"Projects Completed","sub":"Web & Tools","icon":"FolderGit2"},{"id":"3","value":"15+","label":"Technologies","sub":"Mastered & Used","icon":"Layers"},{"id":"4","value":"Open","label":"To Work","sub":"Collaborations","icon":"Briefcase"}]')
      ON CONFLICT (id) DO NOTHING
    `);

    // Seed about profile
    await pool.query(`
      INSERT INTO about_profile (id, name, headline, bio, photo, education, interests, current_focus, public_location, drives)
      VALUES ('about-1', 'Malik Ibrahim', 'Developer who likes to understand how things work.', 'I am a student and self-learner who is passionate about coding and cybersecurity. I enjoy building useful projects and solving real-world problems. My goal is to become a professional who creates impact through technology and knowledge.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', 'Pelajar Kelas 11 SMA', 'Coding, Cybersecurity, Open Source', 'Full-stack web application security and microservices architecture', 'Depok, Indonesia', '[{"title":"Curious","description":"I love exploring how systems work behind the scenes and dissecting underlying protocols.","icon":"Search"},{"title":"Consistent","description":"I keep learning and building every single day, turning complex ideas into working software.","icon":"CheckCircle2"},{"title":"Impactful","description":"I want to build things that help and protect others against vulnerabilities in the digital world.","icon":"ShieldCheck"}]')
      ON CONFLICT (id) DO NOTHING
    `);

    // Seed projects
    await pool.query(`
      INSERT INTO projects (id, title, slug, description, case_study, category, cover_image, gallery, technologies, live_url, source_url, featured, published, sort_order)
      VALUES 
        ('proj-1', 'Portfolio Dashboard', 'portfolio-dashboard', 'Personal portfolio website with admin dashboard to manage projects, achievements, and content.', '{"overview":"A sleek, lightning-fast portfolio built with a built-in content management system.","problem":"Maintaining static markdown or raw source code files whenever new certificates or projects are added creates friction.","solution":"Designed a lightweight, responsive dashboard with local-first persistent data storage.","implementation":"Built with React 19, TypeScript, Tailwind CSS, Motion animations, and Lucide icons.","results":"Instant sub-100ms navigation, 100% lighthouse performance score."}', 'DEVELOPMENT', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80', '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80"]', '["Next.js","Tailwind CSS","Node.js","TypeScript","Prisma"]', 'https://portfolio.malik.dev', 'https://github.com/malik-ibrahim/portfolio-dashboard', true, true, 1),
        ('proj-2', 'Finance Manager App', 'finance-manager-app', 'Smart personal finance admin dashboard to track income, expense, budget, and generate comprehensive spending reports.', '{"overview":"An intuitive financial tracking application tailored for young professionals and students.","problem":"Traditional budgeting apps are either overly complex or filled with intrusive ads.","solution":"Created an offline-first dashboard with reactive chart analytics and category breakdowns.","implementation":"Engineered using React, TypeScript, Chart.js for data visualization, and responsive Tailwind UI widgets.","results":"Over 500 active test entries logged smoothly with zero latency."}', 'DEVELOPMENT', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80', '["https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80"]', '["React","TypeScript","Chart.js","Tailwind CSS","LocalStorage"]', 'https://financemanager.malik.dev', 'https://github.com/malik-ibrahim/finance-manager-app', true, true, 2),
        ('proj-3', 'WebSec Vulnerability Scanner', 'websec-vulnerability-scanner', 'Automated web security header, SSL certificate, and common OWASP vulnerability analysis tool.', '{"overview":"A lightweight security analysis utility that inspects HTTP headers and SSL/TLS configurations.","problem":"Small websites frequently miss essential security response headers.","solution":"Developed a streamlined audit engine that generates actionable remediation steps.","implementation":"Node.js backend with custom regex parsers and asynchronous security probes.","results":"Scanned 100+ public domains safely with concise remediation guidelines."}', 'CYBERSECURITY', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80', '["https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=900&q=80"]', '["TypeScript","Node.js","Express","Security Headers","Tailwind CSS"]', 'https://scanner.malik.dev', 'https://github.com/malik-ibrahim/websec-scanner', true, true, 3)
      ON CONFLICT (id) DO NOTHING
    `);

    // Seed achievements
    await pool.query(`
      INSERT INTO achievements (id, title, issuer, year, date, category, description, image, credential_url, published, sort_order)
      VALUES 
        ('ach-1', 'Sertifikat Partisipasi Keamanan Siber 2024', 'BSSN', '2024', 'Oktober 2024', 'Cybersecurity', 'Partisipasi aktif dalam program peningkatan kompetensi pertahanan siber nasional.', 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=600&q=80', 'https://bssn.go.id', true, 1),
        ('ach-2', 'Sertifikat Webinar Cyber Security', 'Kominfo RI', '2024', 'Juni 2024', 'Cybersecurity', 'Pelatihan webinar pengenalan ancaman siber dan proteksi data pribadi.', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80', 'https://kominfo.go.id', true, 2),
        ('ach-3', 'Sertifikat Literasi Digital', 'Kominfo RI', '2023', 'November 2023', 'Digital Literacy', 'Sertifikasi kompetensi literasi digital nasional.', 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80', 'https://literasidigital.id', true, 3),
        ('ach-4', 'Piagam Penghargaan Seminar Keamanan Informasi', 'BSSN', '2023', 'Agustus 2023', 'Information Security', 'Penghargaan atas partisipasi aktif dalam forum diskusi ketahanan informasi.', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80', 'https://bssn.go.id', true, 4),
        ('ach-5', 'Sertifikat Cyber Security Awareness', 'Kementerian Kominfo', '2023', 'Mei 2023', 'Cybersecurity', 'Program kesadaran keamanan siber mencakup pencegahan phishing.', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80', 'https://kominfo.go.id', true, 5),
        ('ach-6', 'Sertifikat Partisipasi ICSC', 'ICSC Organization', '2022', 'Oktober 2022', 'Conference', 'Konferensi internasional pertukaran wawasan tren keamanan siber.', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80', 'https://icsc.or.id', true, 6)
      ON CONFLICT (id) DO NOTHING
    `);

    // Seed skills
    await pool.query(`
      INSERT INTO skills (id, name, category, icon, description, published, sort_order)
      VALUES 
        ('sk-1', 'JavaScript', 'DEVELOPMENT', 'FileCode2', 'ES6+, Async/Await, DOM manipulation', true, 1),
        ('sk-2', 'TypeScript', 'DEVELOPMENT', 'Code', 'Strict typing, generics, interfaces', true, 2),
        ('sk-3', 'React', 'DEVELOPMENT', 'Atom', 'Hooks, state management, SPA design', true, 3),
        ('sk-4', 'Next.js', 'DEVELOPMENT', 'Globe', 'App router, SSR, server actions', true, 4),
        ('sk-5', 'Node.js', 'DEVELOPMENT', 'Server', 'Express, REST APIs, microservices', true, 5),
        ('sk-6', 'Tailwind CSS', 'DEVELOPMENT', 'Palette', 'Modern responsive utility-first styling', true, 6),
        ('sk-7', 'Git', 'TOOLS', 'GitBranch', 'Version control, branching, rebasing', true, 1),
        ('sk-8', 'GitHub', 'TOOLS', 'CodeSquare', 'CI/CD workflows, pull requests, releases', true, 2),
        ('sk-9', 'VS Code', 'TOOLS', 'TerminalSquare', 'Extensions, debugging, productivity setups', true, 3),
        ('sk-10', 'Docker', 'TOOLS', 'Box', 'Containerization, Dockerfiles, compose', true, 4),
        ('sk-11', 'PostgreSQL', 'TOOLS', 'Database', 'Relational data modeling, indexing, SQL', true, 5),
        ('sk-12', 'Figma', 'TOOLS', 'Palette', 'Wireframing, UI/UX prototyping, layout design', true, 6),
        ('sk-13', 'Linux', 'CURRENTLY_LEARNING', 'Terminal', 'Bash scripting, permissions, daemon management', true, 1),
        ('sk-14', 'Burp Suite', 'CURRENTLY_LEARNING', 'ShieldAlert', 'HTTP proxy intercept, web request analysis', true, 2),
        ('sk-15', 'Nmap', 'CURRENTLY_LEARNING', 'Scan', 'Network exploration and port discovery', true, 3),
        ('sk-16', 'Web Security', 'CURRENTLY_LEARNING', 'Lock', 'OWASP Top 10, XSS, CSRF, SQL Injection', true, 4),
        ('sk-17', 'System Design', 'CURRENTLY_LEARNING', 'Cpu', 'High availability, caching, load balancing', true, 5)
      ON CONFLICT (id) DO NOTHING
    `);

    // Seed journey
    await pool.query(`
      INSERT INTO journey (id, date_or_year, title, description, published, sort_order)
      VALUES 
        ('jr-1', '2023', 'Started my coding journey', 'Learned the basics of HTML, CSS, and JavaScript. Built my first static websites.', true, 1),
        ('jr-2', '2024', 'Explored Web Development', 'Built small projects and learned React & Node.js. Discovered the modern JavaScript ecosystem.', true, 2),
        ('jr-3', '2025', 'Discovered Cybersecurity', 'Started learning about web security, vulnerabilities, secure coding principles.', true, 3),
        ('jr-4', '2026', 'Building & Growing', 'Building real projects, improving my full-stack and security skills.', true, 4)
      ON CONFLICT (id) DO NOTHING
    `);

    // Seed social links
    await pool.query(`
      INSERT INTO social_links (id, platform, label, url, icon, published, sort_order)
      VALUES 
        ('soc-1', 'Email', 'malik.ibrahim.dev@gmail.com', 'mailto:malik.ibrahim.dev@gmail.com', 'Mail', true, 1),
        ('soc-2', 'Instagram', '@malik.ibrahim', 'https://instagram.com', 'CodeSquare', true, 2),
        ('soc-3', 'WhatsApp', '+62 812-3456-7890', 'https://wa.me/6281234567890', 'MessageCircle', true, 3),
        ('soc-4', 'GitHub', 'github.com/malik-ibrahim', 'https://github.com', 'CodeSquare', true, 4)
      ON CONFLICT (id) DO NOTHING
    `);

    console.log('Initial data seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding data:', error);
    return false;
  }
}
