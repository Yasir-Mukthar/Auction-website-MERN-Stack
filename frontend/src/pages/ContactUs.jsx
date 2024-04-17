import { Link } from "react-router-dom";
import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';


const ContactUs = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_qvbrhqd', 'template_llfzueg', form.current, {
        publicKey: 'e2FbflmSwNqyMF6op',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
      <div className="text-white flex items-center justify-center flex-col h-[280px] bg-hero-img bg-cover">
        <h1 className="text-center font-bold text-3xl">Contact Us</h1>
        <div className="flex gap-2 font-medium pt-2">
          <Link
            to={"/"}
            className=" no-underline hover:text-theme-color transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-theme-color">Contact Us</span>
        </div>
      </div>
      <div className="grid grid-cols-1 m-auto gap-5 px-5 py-10  w-full max-w-[1000px] md:grid-cols-3">
        <div className="text-pretty text-white flex flex-col gap-4 items-center justify-start p-8 rounded-2xl  bg-theme-bg text-center w-full  ">
          <div className="bg-theme-color rounded-full p-3 ">
            <IoLocationOutline size={38} />
          </div>
          <div>
            <h2 className=" text-2xl font-bold">Address</h2>
            <span>Mandi Bahauddin Punjab, Pakistan</span>
          </div>
        </div>
        <div className="text-white flex flex-col gap-4 items-center justify-start p-8 rounded-2xl  bg-theme-bg text-center w-full  ">
          <div className="bg-theme-color rounded-full p-3 ">
            <IoCallOutline size={38} />
          </div>
          <div>
            <h2 className=" text-2xl font-bold">Call Us</h2>
            <p>+92 3414544858</p>
          </div>
        </div>
        <div className="text-white flex flex-col gap-4 items-center justify-start p-8 rounded-2xl  bg-theme-bg text-center w-full  ">
          <div className="bg-theme-color rounded-full p-3 ">
            <IoMailOutline size={38} />
          </div>
          <div>
            <h2 className=" text-2xl font-bold">Email Us</h2>
            <p>arkoodapk@gmail.com</p>
          </div>
        </div>
      </div>


      <form ref={form} onSubmit={sendEmail} className="text-white">
      <label>Name</label>
      <input type="text" name="from_name" placeholder="name" />
      <input type="text" value="Yasir" className='hidden' name="to_name" />

      <label>Email</label>
      <input type="email" name="user_email" placeholder="email" />
      <label>Message</label>
      <textarea name="message" placeholder="message" />
      <input type="submit" value="Send" />
    </form>
    </>
  );
};

export default ContactUs;
