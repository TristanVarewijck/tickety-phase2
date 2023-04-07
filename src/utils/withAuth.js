import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';

export function withAuth(Component) {
  const {redirect = true} = Component;

  function AuthenticatedComponent(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
            if(redirect){
                router.push('/');
            }
          setLoading(false);
        }
      })

      return unsubscribe;
    }, []);

    return <>
    {loading ? <div>user is loading</div> : <Component {...props} user={user} />}
    </>  
  }

  return AuthenticatedComponent;
}