import { useContext } from 'react';

import { AxiosContext } from '../contexts/Axios';

import type { Axios } from 'axios';

export function useAxios(): Axios {
  const { axios } = useContext(AxiosContext);

  return axios;
}
