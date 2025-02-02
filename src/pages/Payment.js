import React from "react";
import QR from "../assets/qr.jpg";

function Payment() {
  return (
    <div className="pt-32 p-20 flex flex-col items-center justify-center">
      <img className="w-44" src={QR} alt="payment" />
      <h1 className="text-4xl pt-4 font-bold">Scan to Pay</h1>
      <p className="mt-2">
      🎬 Scan, Pay & Start Streaming Now! 🍿
      </p>
      <p className="mt-4 text-center px-14">
        Enjoy uninterrupted access to your favorite movies and TV shows by
        making a quick and secure payment. Simply scan the QR code to subscribe
        to your chosen plan and start streaming instantly. Our payment process
        is fast, safe, and hassle-free, ensuring a seamless experience. Once the
        payment is completed, your subscription will be activated, granting you
        unlimited entertainment. If you face any issues, our support team is
        always here to help.
      </p>
    </div>
  );
}

export default Payment;
