import axios from "axios";
import "./SupportTicket.css";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { expireSession, getAllTickets } from "../../Redux/State";
import { useDispatch } from "react-redux";
function OpenTicket({ user }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [ticketsData, setTicketsData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getTickets() {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://citadel-inv.onrender.com/getUserTickets/${user?.id}`
      );
      setLoading(false);
      setTicketsData(response?.data?.data);
      dispatch(getAllTickets(response?.data?.data));
      console.log(response);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    getTickets();
  }, []);
  return (
    <>
      <div
        style={{ position: "relative" }}
        className="support-open-ticket-page"
      >
        {loading && (
          <div className="loadingData">
            <span>Getting User Ticket..</span>
            <BounceLoader size={120} color="white" />
          </div>
        )}
        <div className="support-menu-card-wrapper">
          <div className="support-ticket-top-menu">
            <span>TicketID</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Subject</span>
            {/* <span>Message</span> */}
            <span>Date</span>
          </div>
          <div className="support-ticket-body">
            {ticketsData.map((tic) => (
              <article
                onClick={() =>
                  nav(
                    `/supportTicket/reply/${tic?.ticketId.replace(
                      "#",
                      ""
                    )}`
                  )
                }
                key={tic.id}
                className="support-ticket-items"
              >
                <span>[{tic?.ticketId || "N/A" / n}]</span>
                <span>{tic?.status || "N/A"}</span>
                <span>{tic?.pirority || "N/A"}</span>
                <span>{tic?.subject || "N/A"}</span>
                {/* <span>{tic?.messages[0] || "N/A"}</span> */}
                <span>{tic?.createdAt.slice(0, 10)}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenTicket;
