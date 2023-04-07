import MyAccountLayout from "./components/MyAccountLayout/myAccountLayout";
import RootLayout from "@/components/RootLayout/rootLayout";
import { withAuth } from "@/utils/withAuth";

const MyAccount = ({user}) => {
    return <RootLayout>
    <MyAccountLayout>
        <h1>My Account</h1>
    </MyAccountLayout>
    </RootLayout>
}

export default withAuth(MyAccount, { redirect: true }); 