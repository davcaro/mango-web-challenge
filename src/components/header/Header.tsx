import { FC } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link href='/' title='Home'>
        <Logo />
      </Link>
    </header>
  );
};
