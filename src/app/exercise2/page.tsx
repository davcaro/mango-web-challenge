'use client';

import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks';
import { BasicRange } from '@/types/Range';
import { Range } from '@/components/range';
import styles from './Exercise2.module.scss';

const Exercise2 = () => {
  const [values, setValues] = useState<BasicRange | null>(null);
  const { data, isLoading, error } = useFetch<number[]>('fixed');

  useEffect(() => {
    if (data && data.length >= 2) {
      const min = data.at(0) ?? 0;
      const max = data.at(-1) ?? 0;
      setValues({ min, max });
    }
  }, [data]);

  if (data && values) {
    return (
      <div className={styles.container}>
        <Range steps={data} values={values} onChange={setValues} />
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;
  return <div>Error: {error?.message}</div>;
};

export default Exercise2;
