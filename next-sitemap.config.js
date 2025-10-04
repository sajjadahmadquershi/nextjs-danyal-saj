
/** @type {import('next-sitemap').IConfig} */
const { createClient } = require('@supabase/supabase-js');

module.exports = {
  siteUrl: 'https://unisol-sajjad.vercel.app', // پروڈکشن URL
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,

  exclude: [
    '/admin',
    '/admin/dashboard',
    '/admin/blog',
    '/blog/add',
    '/404',
    '/500',
    '/projects/[id]',
    '/tags/[tag]',
    '/blog/[slug]',
  ],

  transform: async (config, path) => {
    if (
      path.includes('/[slug]') ||
      path.includes('/[id]') ||
      path.startsWith('/admin') ||
      path.startsWith('/blog/add') ||
      path.startsWith('/login')
    ) {
      return null;
    }

    return {
      loc: `${config.siteUrl}${path}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    };
  },

  additionalPaths: async (config) => {
    const staticPages = [
      { path: '/', priority: 0.9 },
      { path: '/web', priority: 0.9 },
      { path: '/blog/blog-cnc', priority: 0.7 },
      { path: '/blog/blog-web', priority: 0.7 },
    ];

    let blogPaths = [];

    try {
      // Supabase کلائنٹ بنائیں
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );


      const { data: blogs, error } = await supabase
        .from('blogs')
        .select('slug, updated_at');

      if (error) {
        console.error('❌ Supabase error:', error);
        // فال بیک ڈیٹا
        blogPaths = [
  { slug: 'how-to-start-cnc-laser-cutting', updated_at: '2025-07-10T12:59:58Z' },
  { slug: 'getting-started-cnc-2d-3d-design', updated_at: '2025-07-10T17:28:02Z' },
];
      } else {
        blogPaths = blogs || [];

      }

      if (!Array.isArray(blogPaths)) {
        console.warn('❗ Blog paths is not an array:', blogPaths);
        blogPaths = [];
      }

      // لاگنگ کے ساتھ لوپ
      blogPaths.forEach((blog, index) => {

      });
    } catch (error) {
      //console.error('❌ Error fetching blog paths from Supabase:', error.message);
      // فال بیک ڈیٹا
      blogPaths = [
        { slug: 'how-to-start-cnc-laser-cutting', updated_at: '2025-07-10T12:59:58.031276' },

      ];

    }

  //   const sitemapEntries = [
  //     ...staticPages.map(({ path, priority }) => ({
  //       loc: `${config.siteUrl}${path}`,
  //       changefreq: 'weekly',
  //       priority,
  //       lastmod: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  //     })),
  //     ...blogPaths.map((blog) => {
  //       const entry = {
  //         loc: `${config.siteUrl}/blog/${blog.slug}`,
  //         changefreq: 'monthly',
  //         priority: 0.9,
  // lastmod: blog.updated_at
  // ? new Date(blog.updated_at).toISOString().replace(/\.\d+Z$/, 'Z')
  // : new Date().toISOString().replace(/\.\d+Z$/, 'Z')
  //       };
  //       return entry;
  //     }),
  //   ];
  // ...inside your additionalPaths function
const sitemapEntries = [
  ...staticPages.map(({ path, priority }) => ({
    loc: `${config.siteUrl}${path}`,
    changefreq: 'weekly',
    priority,
    lastmod: new Date().toISOString(),
  })),
  ...blogPaths.map((blog) => {
    let lastmodDate;
    try {
      // Attempt to create a date from the database value
      const dateFromDb = new Date(blog.updated_at);
      // Check if the date is valid before formatting
      if (!isNaN(dateFromDb.getTime())) {
        lastmodDate = dateFromDb.toISOString();
      } else {
        // Fallback to the current date if the database date is invalid
        lastmodDate = new Date().toISOString();
      }
    } catch (error) {
      // In case of a parsing error, also fallback
      lastmodDate = new Date().toISOString();
    }

    return {
      loc: `${config.siteUrl}/blog/${blog.slug}`,
      changefreq: 'monthly',
      priority: 0.9,
      lastmod: lastmodDate,
    };
  }),
];

    //console.log('📋 Final Sitemap Entries:', JSON.stringify(sitemapEntries, null, 2));
    return sitemapEntries;
  },
};