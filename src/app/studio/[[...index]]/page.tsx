
// src/app/studio/[[...index]]/page.tsx
'use client'

/**
 * This route is responsible for the Sanity Studio embedded in your Next.js app.
 *
 * You can access it on:
 * - http://localhost:3000/studio
 * - https://your-domain.com/studio
 */
import {NextStudio} from 'next-sanity/studio'
import config from '../../../../sanity/sanity.config' // Adjust path as necessary

export default function StudioPage() {
  return <NextStudio config={config} />
}

// If you have ISR or SSG, you might want to disable it for the studio
export const dynamic = 'force-static' // Or remove if you want ISR/SSG behavior
