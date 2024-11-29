const BillingAddressCard = () => {
    return (
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">Billing Address</h3>
        <p className="text-gray-500">
          4140 Parker Rd. Allentown, New Mexico 31134<br />
          dianne.russell@gmail.com<br />
          (671) 555-0110
        </p>
        <button className="text-green-600 hover:underline mt-2">Edit Address</button>
      </div>
    );
  };
  
  export default BillingAddressCard;
  