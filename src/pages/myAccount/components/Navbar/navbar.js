import Link from "next/link";
import { logout } from "../../../../../firebase/firebaseAuth";

const Navbar = () => {
    return <nav>
        <ul>
        <li><Link href="/myAccount/profile"><p>profile</p></Link></li>
        <li><Link href="/myAccount/orders"><p>My orders</p></Link></li>
        <li><button onClick={ () => logout()}>Logout</button></li>
        </ul>
    </nav>
}

export default Navbar;