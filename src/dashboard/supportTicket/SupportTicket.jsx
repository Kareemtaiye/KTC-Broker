import React, { useState } from "react";
import "./SupportTicket.css";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import OpenTicket from "./OpenTicket";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { expireSession } from "../../Redux/State";
// import { IoPaperPlaneSharp } from "react-icons/io5";
const SupportTicket = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [priority, sePriority] = useState("High");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [pictures, setPictures] = useState([
    {
      pic: "",
      id: 0,
    },
  ]);
  // const picturesArray = []
  // const p
  const user = useSelector((state) => state.BTC.user);
  async function createTicket() {
    setLoading(true);
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("pirority", priority);
    formData.append("message", message);
    formData.append("pictures ", p1);
    try {
      const response = await axios.post(
        `https://citadel-inv.onrender.com/createTicket/${user?.id}`,
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

  console.log({ p1, p2 });
  console.log(p1);
  console.log([pictures]);
  return (
    <>
      {openTicket ? (
        <OpenTicket user={user} />
      ) : (
        <>
          <div className="support-ticket-open-tickt">
            <span onClick={() => setOpenTicket(true)}>My Tickets</span>
          </div>
          <div className="support-ticket-main-container">
            <div className="support-ticket">
              <label className="support-ticket-label">Name</label>
              <input
                className="support-ticket-input"
                type="text"
                placeholder="Ujah Collins"
                value={user?.name}
              />
            </div>
            <div className="support-ticket">
              <label className="support-ticket-label">Email Adress</label>
              <input
                className="support-ticket-input"
                type="text"
                placeholder="UjahCollins@gmail.com"
                value={user?.email}
              />
            </div>

            <div className="support-ticket">
              <label className="support-ticket-label">Subject</label>
              <input
                className="support-ticket-input"
                type="text"
                placeholder="subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
              />
            </div>

            <div className="support-ticket">
              <label className="support-ticket-label">Priority</label>
              <select
                onChange={(e) => sePriority(e.target.value)}
                value={priority}
                name="priority"
                className="support-ticket-select"
              >
                <option value="High">High</option>
                <option value="High">Medium</option>
                <option value="High">Low</option>
              </select>
            </div>

            <div className="support-ticket">
              <label className="support-ticket-label">Message</label>
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
              <button className="support-button" onClick={createTicket}>
                {loading ? <ClipLoader size={22} color="white" /> : "submit"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SupportTicket;
