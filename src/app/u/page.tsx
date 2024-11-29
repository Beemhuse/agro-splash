import BillingAddressCard from "@/components/cards/BillingAddressCard";
import ProfileCard from "@/components/cards/ProfileCard";
import OrderTable from "@/components/pages/userDashboard/OrderTable";

const Page = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <ProfileCard />

        {/* Billing Address Section */}
        <BillingAddressCard />
      </div>

      {/* Recent Orders */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Order History</h3>
          <a href="/dashboard/orders" className="text-green-600 hover:underline">
            View All
          </a>
        </div>
        <OrderTable />
      </div>
    </div>
  );
};

export default Page;
