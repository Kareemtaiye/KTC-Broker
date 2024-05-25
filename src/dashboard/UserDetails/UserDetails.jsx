import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UserDetails() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(
          "https://citadel-inv.onrender.com/getAllUsers"
        );
        console.log(response);
        setUsers(response.data);
      } catch (err) {
        toast.error(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);
  return (
    <div className="table-container">
      <table className="transaction-table">
        <thead className="transaction-table-head">
          <tr className="transaction-table-row">
            <th className="transaction-table-th">Name</th>
            <th className="transaction-table-th">Email</th>
            {/* <th className="transaction-table-th">Occupation</th> */}
            {/* <th className="transaction-table-th">id</th> */}
            <th className="transaction-table-th">View</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user, index) => (
            <tr className="transaction-table-row" key={index}>
              <td className="transaction-table-data">{user.firstName}</td>
              <td
                className="transaction-table-data"
                style={{
                  fontSize: "1rem",
                }}
              >
                {user.email}
              </td>

              {/* <td className="transaction-table-data">{user._id}</td> */}
              <td
                className="transaction-table-data"
                style={{
                  padding: "0.1rem",
                  textAlign: "center",
                }}
              >
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  key={`modal_button_${index}`}
                  className="btn btn-[white] rounded-none text-[blue]"
                  onClick={() =>
                    document.getElementById(`my_modal_${index}`).showModal()
                  }
                >
                  view
                </button>
                <dialog
                  key={`modal_dialog_${index}`}
                  id={`my_modal_${index}`}
                  className="modal modal-middle  "
                >
                  <div className="modal-box text-[orangered] bg-[#141414] mt-2">
                    <h3 className="font-bold text-lg">
                      Name: {user.firstName} {user.lastName}
                    </h3>
                    <p className="mt-2">Email: {user.email}</p>
                    <p className="mt-2">Id: {user._id}</p>
                    <p className="mt-2">Address: {user.address}</p>
                    <p className="mt-2">Mobile Number: {user.mobile}</p>
                    <p className="mt-2">
                      Account Balance : {user.accountBalance} USD
                    </p>
                    <p className="mt-2">
                      Deposit Wallet: {user.depositWallet} USD
                    </p>
                    <p className="mt-2">
                      Referral Wallet: {user.referalWallet} USD
                    </p>
                    <p className="mt-2">
                      Interest Wallet: {user.intrestWallet} USD
                    </p>
                    {/* <p className="mt-2">
                      Admin: {user.isAdmin ? "true" : "false"}
                    </p> */}
                    <p className="mt-2">
                      Verified: {user.isVerified ? "true" : "false"}
                    </p>

                    <p className="mt-2">
                      Created: {new Date(user.createdAt).toDateString()}{" "}
                    </p>

                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[white]">
                          ✕
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
