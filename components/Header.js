import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Header = () => {
  return (
    <div className={styles.description}>
      <Link href={'/'}>
        <p>
          <code className={styles.code}>Home</code>
        </p>
      </Link>
    </div>
  )
}

export default Header
