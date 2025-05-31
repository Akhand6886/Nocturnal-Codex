
// This file is largely obsolete as Contentlayer now handles
// Markdown processing, data fetching, and type generation for blog posts.

// You can import blog posts and their types directly from 'contentlayer/generated':
// import { allBlogPosts, type BlogPost } from 'contentlayer/generated';

// If you had any utility functions here specific to blog posts that are *not*
// covered by Contentlayer (e.g., very custom sorting or filtering logic that
// you prefer to keep separate), you could retain them. Otherwise, this file
// can be safely removed or kept empty.

// For example, functions like getSortedPostsData(), getAllPostSlugs(),
// and getPostData() are now effectively replaced by:
// - `allBlogPosts` (for all posts, then sort as needed)
// - `allBlogPosts.map(post => ({ slug: post.slug }))` (for slugs)
// - `allBlogPosts.find(post => post.slug === someSlug)` (for a single post)

// The remark and gray-matter dependencies might become unused if Contentlayer
// handles all Markdown processing, unless used elsewhere.

export {}; // Add an empty export to make it a module if it's empty.
