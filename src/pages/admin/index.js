import Link from "next/link";
import { withAuth } from "@/utils/withAuth";

const Admin = () => {
    return <div>
        Welcome to the admin panel!
        <Link href="/admin/orders">See orders</Link>
    </div>
}

export default withAuth(Admin, {adminRoute: true});