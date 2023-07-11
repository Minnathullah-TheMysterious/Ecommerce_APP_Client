import React from "react";
import Layout from "../components/Layouts/Layout";
import { GoMailRead } from "react-icons/go";
import { FaPhoneVolume } from "react-icons/fa";
import { SlEarphonesAlt } from "react-icons/sl";

const Contact = () => {
  return (
    <Layout title={'Contact Us - Ecommerce App'}>
      <div className="container contact">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contact-us.png"
              alt="Contact Us"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-5 contact-info">
            <h1 className="bg-dark text-light text-center">CONTACT US</h1>
            <p>
              Any query and info about product feel free to call anytime. We are
              24X7 available
            </p>
            <p>
              <GoMailRead /> : www.help@ecommerceapp.com
            </p>
            <p>
              <FaPhoneVolume /> : 012-3456789
            </p>
            <p>
              <SlEarphonesAlt /> : 1800-0000-0000 (Toll Free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
