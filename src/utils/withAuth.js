import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';

export function withAuth(Component, options = {}) {
  const {redirect = true, adminRoute = false} = options;

  function AuthenticatedComponent(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async(user) => {
           // check if user is authenticated
        if (user) {
          setUser(user);
            // check is admin route and if authenticated user is admin if not redirect to no-acces page
          const tokenResult = await user.getIdTokenResult();
          const admin = tokenResult.claims.admin;

          if (adminRoute && !admin && redirect) {
              router.push('/noAcces');
              return null; 
          }

          setLoading(false);
        } else {
          // if user is not authenticated redirect to home
            if(redirect){
                router.push('/');
            }
          setLoading(false);
        }
      })

      return unsubscribe;
    }, []);

    // show loading state when page is user is loading
    return <>
    {loading ? <div>user is loading</div> : <Component {...props} user={user} />}
    </>  
  }

  return AuthenticatedComponent;
}