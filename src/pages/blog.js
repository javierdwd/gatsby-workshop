import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { useStaticQuery, graphql } from "gatsby"

const BlogPage = () => {
  const postsNodes = useStaticQuery(graphql`
    query posts {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY", locale: "es")
            }
            excerpt
            wordCount {
              words
            }
          }
        }
      }
    }
  `).allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Blog</h1>
      <h3>Latest posts:</h3>

      {postsNodes.map(({ node: el }, index) => (
        <article key={index} style={{ marginTop: index ? "1em" : "0" }}>
          <h2>{el.frontmatter.title}</h2>
          <p>{el.excerpt}</p>
          <time>{el.frontmatter.date}</time>
        </article>
      ))}

      <Link to="/">Back To Home</Link>
    </Layout>
  )
}

export default BlogPage
