import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSyncFiltersWithUrl = (filters) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.set(key, filters[key]);
      } else {
        params.delete(key);
      }
    });
    navigate({ search: params.toString() }, { replace: true });
  }, [filters, navigate]);
};

export default useSyncFiltersWithUrl;
