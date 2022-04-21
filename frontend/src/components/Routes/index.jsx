import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * RedirectPage
 * @param {boolean} privatePath: if true when user is not logged redirect to /login else redirect to private path
 */

export const RedirectPage = ({children, privatePath}) => {
  const {user, inProgress} = useSelector(s => s.user);
  const shouldShow = useMemo(() => {
    if(privatePath) return !!user
    else return !user
  }, [user, privatePath])
  const redirectPath = privatePath ? '/login' : '/dashboard'

  if(inProgress){
    return <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  }
  if(shouldShow){
    return <>{children}</>
  }
  return <Navigate to={redirectPath}/>
}