import type { MetadataRoute } from 'next'
import { postSlugs, posts } from '@/content/blog'
import { featureSlugs } from '@/content/features'
import { legalSlugs } from '@/content/legal'
import { solutionSlugs } from '@/content/solutions'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const url = (path: string) => (path === '/' ? site.url : `${site.url}${path}`)

  const core: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: url('/product'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/security'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/integrations'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: url('/careers'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/changelog'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: url('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const features: MetadataRoute.Sitemap = featureSlugs.map((slug) => ({
    url: url(`/features/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const solutions: MetadataRoute.Sitemap = solutionSlugs.map((slug) => ({
    url: url(`/solutions/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blog: MetadataRoute.Sitemap = postSlugs.map((slug) => {
    const post = posts.find((p) => p.slug === slug)
    return {
      url: url(`/blog/${slug}`),
      // Posts carry their own publication date, so use it rather than today.
      lastModified: post ? new Date(`${post.date}T00:00:00Z`) : now,
      changeFrequency: 'yearly',
      priority: 0.6,
    }
  })

  const legal: MetadataRoute.Sitemap = legalSlugs.map((slug) => ({
    url: url(`/legal/${slug}`),
    lastModified: new Date(`${site.legalUpdated}T00:00:00Z`),
    changeFrequency: 'yearly',
    priority: 0.3,
  }))

  return [...core, ...features, ...solutions, ...blog, ...legal]
}
