'use client';

import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks';
import { BasicRange } from '@/types/Range';
import { Range } from '@/components/range';

const Exercise1 = () => {
  const [values, setValues] = useState<BasicRange | null>(null);
  const { data, isLoading, error } = useFetch<BasicRange>('basic');

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  if (data && values) {
    return <Range min={data.min} max={data.max} values={values} onChange={setValues} />;
  }

  if (isLoading) return <div>Loading...</div>;
  return <div>Error: {error?.message}</div>;
};

export default Exercise1;
