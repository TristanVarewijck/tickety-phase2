import styles from "./myAccountLayout.module.css";
import Navbar from "../Navbar/navbar";

const MyAccountLayout = ({children}) => {
    return <div>
       <div className="content-box">
        <Navbar />
        {children}
       </div>
    </div>
}

export default MyAccountLayout;