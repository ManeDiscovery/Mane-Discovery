import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/day/', '/sos/', '/ledger/', '/certificate/'],
    },
    sitemap: 'https://mane-discovery.vercel.app/sitemap.xml',
  }
}
