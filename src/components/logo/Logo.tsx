import type { FC } from 'react';
import Image from 'next/image';

export const Logo: FC = () => {
  return <Image src='/mango.svg' alt='Mango Logo' width={300} height={54} priority />;
};
