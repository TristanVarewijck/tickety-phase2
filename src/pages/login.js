import { logInWithEmailAndPassword, signInWithApple, signInWithGoogle } from "../../firebase/firebaseAuth";
import Link from "next/link";
import {useState, useEffect} from "react"; 
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

      // if user is present redirect from login page
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
            {
                loading && <p>loading user...</p>
            }
            <Link href={"/"}>Back to Home</Link>
            <h1>Login</h1>
            <p>Login with your account using email and password or Google</p>
            <div className="input-container">
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
            <button onClick={() => logInWithEmailAndPassword({email, password})}>Login</button>
            <button onClick={() => signInWithGoogle()}>Login with Google</button>
            <button onClick={() => signInWithApple()}>Login with Apple</button>
            </div>
      
            <div>
            <p><Link href="/resetEmail">Forgot password?</Link></p>
            <p>Don't have an account? <Link href="/signup">Sign up</Link> now.</p>
            </div>
        </div>
    </div>
}

export default Login;