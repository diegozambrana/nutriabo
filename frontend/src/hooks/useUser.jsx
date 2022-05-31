import { useQuery } from '@apollo/client';
import { WHOAMI } from '../graphql/query';
import { updateUser, setInProgress } from '../redux/slices/user';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// set user on Redux, if access pass then refresh, if refresh is not valid
// then return empty user
export const useUser = () => {
  const {loading, data, error, refetch} = useQuery(WHOAMI);
  const dispatch = useDispatch()

  useEffect(() => {
    if(data?.whoami){
      dispatch(updateUser(data.whoami))
      dispatch(setInProgress(false))
    }
  }, [data])

  useEffect(() => {
    if(error && !loading )dispatch(setInProgress(false))
  }, [error, loading])

  return {loading, getUser: refetch}
}