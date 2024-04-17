import { Link } from '@/components/link';
import styles from './HomePage.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href='/exercise1'>Exercise 1</Link>
      <Link href='/exercise2'>Exercise 2</Link>
    </div>
  );
}
