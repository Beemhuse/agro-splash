interface IBilling{
  address: string
  email: string;
  phone: string
}
const BillingAddressCard = ({address, email, phone}: IBilling) => {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">Billing Address</h3>
        <p className="text-gray-500">
         { address ?? "Not Available"}<br />
          {email}<br />
          {phone}
        </p>
        <button className="text-green-600 hover:underline mt-2">Edit Address</button>
      </div>
    );
  };
  
  export default BillingAddressCard;
  