import { useMutation } from '@apollo/client';
import { getAccess } from '../utils';
import { VERIFY_TOKEN } from '../graphql/mutation';
import { useRefreshToken } from './useRefreshToken';
import { useEffect, useState } from 'react';

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
          console.log(`useRefreshToken`)
          refresh()
        }else{
          setValidToken(false)
          setValidating(false)
        }
      });
  }

  return {loading, verifyAccessToken, validToken, validating}
}