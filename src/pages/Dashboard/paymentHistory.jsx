import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/Hook/useAuth";
import axios from "axios";

const PaymentHistory = () => {
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email, // only fetch if email exists
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th>#</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.transactionId}</td>
              <td>${payment.price}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
