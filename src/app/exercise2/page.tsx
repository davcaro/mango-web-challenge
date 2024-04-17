'use client';

import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks';
import { BasicRange } from '@/types/Range';
import { Range } from '@/components/range';

const Exercise2 = () => {
  const [values, setValues] = useState<BasicRange | null>(null);
  const { data, isLoading, error } = useFetch<number[]>('fixed');

  useEffect(() => {
    if (data && data.length >= 2) {
      const min = data[0];
      const max = data[data.length - 1];
      setValues({ min, max });
    }
  }, [data]);

  if (data && values) {
    return <Range steps={data} values={values} onChange={setValues} />;
  }

  if (isLoading) return <div>Loading...</div>;
  return <div>Error: {error?.message}</div>;
};

export default Exercise2;
