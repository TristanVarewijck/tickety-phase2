import RootLayout from "@/components/RootLayout/rootLayout";
import MyAccountLayout from "./components/MyAccountLayout/myAccountLayout";
import { withAuth } from "@/utils/withAuth";

const Orders = ({user}) => {
    return <RootLayout>
    <MyAccountLayout>
    <h1>Orders</h1>
    </MyAccountLayout>
</RootLayout>
}

export default withAuth(Orders, { redirect: true });