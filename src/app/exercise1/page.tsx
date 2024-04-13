import { Range } from '@/components/range';
import styles from './Exercise1.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getData() {
  const res = await fetch(`${API_URL}/basic`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Exercise1() {
  const data = await getData();

  return (
    <div className={styles.container}>
      <Range min={data.min} max={data.max} />
    </div>
  );
}
