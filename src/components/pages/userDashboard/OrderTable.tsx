const OrderTable = () => {
    const orders = [
      { id: "#738", date: "8 Sep, 2020", total: "$135.00", products: 5, status: "Processing" },
      { id: "#703", date: "24 May, 2020", total: "$25.00", products: 1, status: "On the way" },
      { id: "#130", date: "22 Oct, 2020", total: "$250.00", products: 4, status: "Completed" },
      { id: "#561", date: "1 Feb, 2020", total: "$35.00", products: 1, status: "Completed" },
    ];
  
    return (
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-white border-b">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.date}</td>
              <td className="px-4 py-2">{order.total} ({order.products} Products)</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">
                <a href="#" className="text-green-600 hover:underline">
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default OrderTable;
  