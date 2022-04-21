import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {  getRefresh, setAccess, cleanToken } from '../utils';
import { REFRESH_TOKEN } from '../graphql/mutation';

// Refresh Token when it is Expired, if refreshToken is expired then removes
// all tokens from cookies
export const useRefreshToken = () => {
  const [refreshToken, {error, loading}] = useMutation(REFRESH_TOKEN);
  const [flags, setFlags] = useState({success: false, completed: false})

  const refresh = () => {
    setFlags({success: false, completed: false});
    refreshToken({variables: {refreshToken: getRefresh()}}).then((result) => {
      setAccess(result.data.refreshToken.token)
      setFlags({success: true, completed: true});
    }).catch(() => {
      cleanToken()
      setFlags({success: false, completed: true});
    })
  }
  return {refresh, loading, error: !!error, ...flags}
}