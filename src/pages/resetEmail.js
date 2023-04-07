import { sendPasswordReset } from "../../firebase/firebaseAuth";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";

const resetEmail = () => {
 const [email, setEmail] = useState("");
 const [loading, setLoading] = useState(true);
 const router = useRouter();

// if user is present redirect from resetEmail page
 useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(user => {
       if (user) {
         router.push('/');
         
       } else {
         setLoading(false);
       }
     });

     return unsubscribe;
   }, []);

    return <div>
        <div className='container'>
        {loading && <p>loading...</p>}
        <h1>Reset Password</h1>
        <p>We will send you an email for instructions on how to change your password</p>
         <div className="input-container">
            <input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
             />
            <button onClick={() => sendPasswordReset({email})}>Send instructions</button>
         </div>
               
        <div>
            <p>Don't have an account? <Link href="/signup">Sign up</Link> now.</p>
        </div>
        </div>
    </div>
}

export default resetEmail;