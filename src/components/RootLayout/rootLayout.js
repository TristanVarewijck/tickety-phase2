import Navbar from "../Navbar/navbar"; 
import styles from "./rootLayout.module.css";

const RootLayout = ({ children }) => {
    return (
      <div>
        <Navbar />
        <div className={styles.root}>{children}</div>  
      </div>
    );
  };
  
  export default RootLayout;