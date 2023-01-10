import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Blog from '../components/Blog'
import Header from '../components/Header'

const URL = process.env.STRAPI_BASE_URL

export async function getStaticProps(context) {
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
      }`
    })
  }

  const res = await fetch(`${URL}/graphql`, fetchParams)
  const { data } = await res.json()
  const { blogposts } = data

  return {
    props: blogposts,
    revalidate: 10
  }
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Header></Header>
        {/* <div className={styles.center}>
          <Image className={styles.logo} src='/next.svg' alt='Next.js Logo' width={180} height={37} priority />
          <div className={styles.thirteen}>
            <Image src='/thirteen.svg' alt='13' width={40} height={31} priority />
          </div>
        </div> */}

        <div className={styles.grid}>
          {data.map((post, i) => (
            <Blog
              key={i}
              slug={post.attributes.slug}
              title={post.attributes.title}
              description={post.attributes.description}
            ></Blog>
          ))}
        </div>
      </main>
    </>
  )
}
