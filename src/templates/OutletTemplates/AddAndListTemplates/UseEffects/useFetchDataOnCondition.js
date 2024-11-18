import { useEffect } from 'react';

export const useFetchDataOnCondition = (shouldFetchData, fetchData, setShouldFetchData) => {
  useEffect(() => {
    if (shouldFetchData) {
      fetchData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);
};
