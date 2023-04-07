import { signInWithGoogle, registerWithEmailAndPassword, signInWithApple } from "../../firebase/firebaseAuth";
import {useState, useEffect} from "react"; 
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../../firebase/config";

const signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // if user is present redirect from signup page
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
            {loading && <p>Loading...</p>}
            <Link href={"/"}>Back to Home</Link>
            <h1>Signup</h1>
            <p>Create a new account with Tickety!</p>
            <div>
            <input 
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                    />
                <input 
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                    />
            </div>
               
            <div className="login-options">
                <button onClick={() => registerWithEmailAndPassword({email, password})}>Sign up</button>
                <button onClick={() => signInWithGoogle()}>Sign up with Google</button>
                <button onClick={() => signInWithApple()}>Login with Apple</button>
            </div>
    
            <div>
            <p>Already have an account? <Link href="/login">Login</Link> now.</p>
            </div>
        </div>
    </div>
}

export default signup;