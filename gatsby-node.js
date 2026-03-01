/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require('path')

const SUPABASE_URL = 'https://vantqwppvpojcerpyanu.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbnRxd3BwdnBvamNlcnB5YW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1MDI3MzUsImV4cCI6MjA4NjA3ODczNX0.XE7u0NkzG1vYOxuOF3bobro3UvbcCz-c5-CX94L04LI'

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  let articles
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?select=id,title,slug,content,created_at,article_categories(categories(name))&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
    if (!res.ok) {
      console.warn(`[gatsby-node] Supabase returned ${res.status}`)
      return
    }
    articles = await res.json()
  } catch (err) {
    console.warn('[gatsby-node] Failed to fetch articles:', err.message)
    return
  }

  let created = 0
  articles.forEach((article) => {
    if (!article.slug) return
    createPage({
      path: `/blog/${article.slug}`,
      component: path.resolve('./src/templates/blog-post.js'),
      context: { article },
    })
    created++
  })

  console.log(`[gatsby-node] Created ${created} blog article pages`)
}
