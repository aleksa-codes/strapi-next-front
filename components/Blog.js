import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const Blog = ({ slug, title, description }) => {
  return (
    <Link href={'/posts/' + slug} className={styles.card}>
      <h2 className={inter.className}>
        {title} <span>-&gt;</span>
      </h2>
      <p className={inter.className}>{description}</p>
    </Link>
  )
}

export default Blog
