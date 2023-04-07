import RootLayout from "@/components/RootLayout/rootLayout";
import MyAccountLayout from "./components/MyAccountLayout/myAccountLayout";
import { withAuth } from "@/utils/withAuth";

const Profile = ({user}) => {
    return <RootLayout>
    <MyAccountLayout>
    <h1>Profile</h1>
    </MyAccountLayout>
</RootLayout>
}

export default withAuth(Profile, { redirect: true });