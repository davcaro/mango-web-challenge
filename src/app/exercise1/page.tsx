'use client';

import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks';
import { BasicRange } from '@/types/Range';
import { Range } from '@/components/range';
import { Loader } from '@/components/loader';
import { Error } from '@/components/error';

const Exercise1 = () => {
  const [values, setValues] = useState<BasicRange | null>(null);
  const { data, isLoading } = useFetch<BasicRange>('basic');

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  if (data && values) {
    return <Range min={data.min} max={data.max} values={values} onChange={setValues} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <Error />;
};

export default Exercise1;
