import { FC, PropsWithChildren } from 'react';
import NextLink, { LinkProps } from 'next/link';
import styles from './Link.module.scss';

export const Link: FC<PropsWithChildren<LinkProps>> = ({ children, ...props }) => {
  return (
    <NextLink className={styles.link} {...props}>
      {children}
    </NextLink>
  );
};
