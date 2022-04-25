import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRefreshToken } from './useRefreshToken';
import { getAccess } from '../utils';
import { VERIFY_TOKEN } from '../graphql/mutation';

export const useVerifyToken = () => {
  const [verifyToken, {loading}] = useMutation(VERIFY_TOKEN);
  const {refresh, completed, success} = useRefreshToken();
  const [validToken, setValidToken] = useState(false);
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    if(completed && success){
      verifyAccessToken();
    }
    if(completed && !success){
      setValidToken(false)
      setValidating(false)
    }
  }, [completed, success])

  const verifyAccessToken = () => {
    verifyToken({variables: {token: getAccess()}})
      .then(() => {
        setValidToken(true);
        setValidating(false)
      })
      .catch((error) => {
        if(error.message.includes('expired')){
          refresh()
        }else{
          setValidToken(false)
          setValidating(false)
        }
      });
  }

  return {loading, verifyAccessToken, validToken, validating}
}