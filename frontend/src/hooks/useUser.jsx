import { useQuery } from '@apollo/client';
import { WHOAMI } from '../graphql/query';
import { useRefreshToken } from './useRefreshToken';
import { updateUser, setInProgress } from '../redux/slices/user';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// set user on Redux, if access pass then refresh, if refresh is not valid
// then return empty user
export const useUser = () => {
  const {loading, data, error, refetch} = useQuery(WHOAMI);
  const {refresh, completed, success} = useRefreshToken();
  const dispatch = useDispatch()

  useEffect(() => {
      if(data?.whoami){
        dispatch(updateUser(data.whoami))
        dispatch(setInProgress(false))
      }
  }, [data])

  useEffect(() => {
      if(completed && success){
          refetch()
      }else{
        dispatch(setInProgress(false))
      }
  }, [completed, success])

  useEffect(() => {
      if(error?.message.includes('expired')){
        refresh()
      }
  }, error)

  return {loading, getUser: refetch}
}