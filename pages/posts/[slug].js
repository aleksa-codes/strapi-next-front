const URL = process.env.STRAPI_BASE_URL
// import Image from 'next/image'
import Header from '../../components/Header'
import styles from '../../styles/Home.module.css'
import { Inter } from '@next/font/google'
import ReactMarkdown from 'react-markdown'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticPaths() {
  const fetchParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `{
                blogposts{
                    data{
                      attributes{
                        title
                        blogbody
                        description
                        slug
                      }
                    }
                }
    }`
    })
  }

  const res = await fetch(`${URL}/graphql`, fetchParams)
  const posts = await res.json()
  const paths = posts.data.blogposts.data.map((post) => ({
    params: { slug: post.attributes.slug }
  }))

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const fetchParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
            {
                blogposts(filters: {slug: {eq: "${params.slug}"}}){
                    data{
                        attributes{
                            title
                            blogbody
                            description
                            splash{
                                data{
                                    attributes{
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
            `
    })
  }

  const res = await fetch(`${URL}/graphql`, fetchParams)
  const posts = await res.json()
  const post = posts.data.blogposts.data[0].attributes

  return {
    props: post,
    revalidate: 10
  }
}

const Post = ({ title, blogbody, splash }) => {
  return (
    <main className={styles.main}>
      <Header></Header>
      <h1 className={inter.className}>{title}</h1>
      <hr style={{ width: '100%', margin: '16px auto' }} />
      <ReactMarkdown className={inter.className}>{blogbody}</ReactMarkdown>
      {/* <Image src={splash.data.attributes.url} alt={title} width={400} height={400} /> */}
    </main>
  )
}

export default Post
