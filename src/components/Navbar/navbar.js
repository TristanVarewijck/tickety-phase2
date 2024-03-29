import styles from "./navbar.module.css";
import Link from "next/link";
import { withAuth } from "@/utils/withAuth";

const Navbar = ({user}) => {
    const userIsAdmin =  user && JSON.parse(user.reloadUserInfo.customAttributes).admin;

    return <nav style={styles.navbar}>
        <ul style={styles.listContainer}>
            <li><Link href="/"><p>Home</p></Link></li>
            <li>
                { user ? <div>
                <li><Link href="/myAccount"><p>My account</p></Link></li>
                </div>
                 :
                 <div className="login-signup-links">
                 <Link href="/signup"><p>Sign up</p></Link>
                 <Link href="/login"><p>Login</p></Link>
                 </div>
                }     
            </li>
            {
            userIsAdmin &&  <li><Link href="/admin"><p>Admin</p></Link></li>
            }
           
          
        </ul>
    </nav>
}

export default withAuth(Navbar, { redirect: false });