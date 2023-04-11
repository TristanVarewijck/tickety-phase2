import { withAuth } from "@/utils/withAuth";

  const AdminOrders = () => {
    return <p>Here you can see the orders of your users!</p>;
  };
  
  export default withAuth(AdminOrders, {adminRoute: true,});