import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <Link href='/exercise1'>Exercise 1</Link>
      <Link href='/exercise2'>Exercise 2</Link>
    </>
  );
}
