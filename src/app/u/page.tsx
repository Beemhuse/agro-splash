import BillingAddressCard from "@/components/cards/BillingAddressCard";
import ProfileCard from "@/components/cards/ProfileCard";
import OrderTable from "@/components/pages/userDashboard/OrderTable";
import { fetchCustomerDetails } from "@/service/apiservice";
import { cookies } from "next/headers"; // For accessing user token

export default async function Page() {
  const cookieStore = cookies();
  const userCookie = (await cookieStore).get("agro-user");

  if (!userCookie) {
    return <div>Please log in to view your dashboard.</div>;
  }

  let userData;
  try {
    userData = JSON.parse(userCookie.value);
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return <div>Invalid user session. Please log in again.</div>;
  }

  const customerId = userData?.id;
  if (!customerId) {
    return <div>Missing user information. Please log in again.</div>;
  }

  // Fetch user details
  const userDetails = await fetchCustomerDetails(customerId);

  if (!userDetails) {
    return <div>Failed to fetch user details. Please try again later.</div>;
  }

  const { name, email, phone, address } = userDetails;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <ProfileCard name={name} email={email}  />

        {/* Billing Address Section */}
        <BillingAddressCard address={address} email={email} phone={phone} />
      </div>

      {/* Recent Orders */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Order History</h3>
          <a href="/dashboard/orders" className="text-green-600 hover:underline">
            View All
          </a>
        </div>
        <OrderTable  />
      </div>
    </div>
  );
}
