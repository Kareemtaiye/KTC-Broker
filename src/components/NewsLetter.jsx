import React from "react";

import { IoIosPaperPlane } from "react-icons/io";

function NewsLetter() {
  return (
    <>
      <h3 className='footer-h3'>Newsletter signup</h3>

      <p className='footer-details footer-letter-spacing'>
        Register now to receive insights, advice, and the most recent news and
        updates.
      </p>

      <form className='footer-form'>
        <input type='text' placeholder='Email*' className='footer-form-input' />

        <button className='footer-form-btn'>
          subscribe <IoIosPaperPlane />
        </button>
      </form>
    </>
  );
}

export default NewsLetter;
