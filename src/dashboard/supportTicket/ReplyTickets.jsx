import React, { useState } from "react";
import "./SupportTicket.css";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import OpenTicket from "./OpenTicket";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { expireSession } from "../../Redux/State";
function ReplyTickets() {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const allTickets = useSelector((state) => state.BTC.openTickets);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [openTicket, setOpenTicket] = useState(false);
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [pictures, setPictures] = useState([
    {
      pic: "",
      id: 0,
    },
  ]);
  const getOneTicket = allTickets.filter(
    (tickets) => tickets?.ticketId.replace(tickets?.ticketId[0], "") === id
  );
  console.log(getOneTicket), "Go one";
  console.log("id", id);
  console.log("id", allTickets);
  console.log("id", getOneTicket);
  //   const user = useSelector((state) => state.BTC.user);
  async function replyTicket() {
    if (!message.trim()) {
      toast.error("Message field s empty");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("message", message);
      formData.append("pictures ", p1);
      try {
        const response = await axios.post(
          `https://citadel-inv.onrender.com/replyToTicket/${id}`,
          formData
        );
        console.log(response);
        setLoading(false);
        toast.success(response?.data?.message);
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
  }
  return (
    <div className="support-ticket-main-container">
      <div className="reply-ticket-back-action">
        <span>
          {getOneTicket[0]?.ticketId} {getOneTicket[0]?.subject}
        </span>
        <article onClick={() => nav("/userDashboard/supportTicket")}>X</article>
      </div>
      <div className="support-ticket">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="support-ticket-textarea"
          id=""
          cols="3"
          rows="10"
        ></textarea>
      </div>

      <div className="support-ticket-float-right-btn-container">
        <button
          onClick={() => {
            if (pictures.length < 5) {
              setPictures((prev) => [
                ...prev,
                {
                  pic: p1,
                  id: prev.id++,
                },
              ]);
            } else {
              alert("Maximum pictures reached");
              return;
            }
            console.log(pictures);
          }}
          className="support-ticket-float-right-btn"
        >
          <p className="support-ticket-float-right-btn-details">
            <FaPlus className="support-ticket-plus-sign" /> Add New
          </p>
        </button>
      </div>

      <div className="support-ticket">
        <p className="support-attached">
          Attachments{" "}
          <span className="support-span">
            {" "}
            Max 5 files can be uploaded. Maximum upload size is 100M
          </span>
        </p>

        {pictures.map((pictures, index) => (
          <div key={index} className="support-attached-input-container">
            <input
              type="file"
              onChange={(e) => setP1(e.target.files[0])}
              // value={p1}
              className="support-choose-file"
              placeholder="No file chosen"
            />
          </div>
        ))}
        <div className="support-attached-input-container">
          <input
            type="file"
            onChange={(e) => setP2(e.target.files[0])}
            // value={p2}
            className="support-choose-file"
            placeholder="No file chosen"
          />
        </div>

        <p className="support-attached">
          Allowed File Extensions: .jpg, .jpeg, .png, .pdf, .doc, .docx
        </p>
      </div>

      <div className="support-button-container">
        <button className="support-button" onClick={replyTicket}>
          {loading ? <ClipLoader size={22} color="white" /> : "Reply"}
        </button>
      </div>
    </div>
  );
}

export default ReplyTickets;
