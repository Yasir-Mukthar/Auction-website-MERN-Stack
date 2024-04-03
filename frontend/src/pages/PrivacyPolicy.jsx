import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="text-white ">
        <div className="flex items-center justify-center flex-col h-[280px] bg-hero-img bg-cover">
          <h1 className="text-center font-bold text-3xl">Privacy Policy</h1>
          <div className="flex gap-2 font-medium pt-2">
            <Link
              to="/"
              className=" no-underline hover:text-theme-color transition-all"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-theme-color">Privacy Policy</span>
          </div>
        </div>
        <div className="px-4 py-20 flex flex-col m-auto gap-10 max-w-[1300px]">
          {/* Privacy Policy */}

          <div>
            <h2 className="font-bold text-2xl text-heading-color">
              Privacy Policy
            </h2>
            <p className="text-body-text-color pt-5">
              Real-Time Online Auction system takes the privacy of its users
              seriously. This Privacy Policy outlines the types of information
              we collect, how we use it, and the steps we take to protect your
              personal data.
            </p>
          </div>
          {/* Collect Information */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
              Collect Information
            </h2>

            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>
                <span className="font-semibold">Personal Information:</span>{" "}
                This includes information that can be used to identify you, such
                as your name, email address, phone number, billing address, and
                shipping address. You provide this information when you register
                for an account, list an item for auction, place a bid, or
                contact us.
              </li>
              <li>
                <span className="font-semibold">
                  Non-Personal Information:{" "}
                </span>
                This includes information that cannot be used to identify you,
                such as your browsing history, IP address, and device
                information. This information is collected automatically when
                you use our website.
              </li>
            </ul>
          </div>
          {/* Usage of Information */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
              Usage of Information
            </h2>
            <p className="text-body-text-color pt-5">
              We use the information we collect for the following purposes:
            </p>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>
                <span className="font-semibold">
                  To provide and improve our services:
                </span>{" "}
                We use your information to allow you to participate in
                auctions, process your transactions, send you auction
                notifications, and provide customer support.
              </li>
              <li>
                <span className="font-semibold">
                  To personalize your experience:{" "}
                </span>
                We use your information to personalize your experience on our
                website, such as by recommending auctions you might be
                interested in.
              </li>
              <li>
                <span className="font-semibold">
                  To send you marketing communications:{" "}
                </span>
                We may use your contact information to send you marketing
                communications, such as newsletters and promotional offers. You
                can opt out of receiving these communications at any time.
              </li>
              <li>
                <span className="font-semibold">
                  To send you marketing communications:{" "}
                </span>
                We may use your contact information to send you marketing
                communications, such as newsletters and promotional offers. You
                can opt out of receiving these communications at any time.
              </li>
            </ul>
          </div>
          {/* Usage of Information */}
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
              Security of User Data
            </h2>
            <p className="text-body-text-color pt-5">
              We take steps to protect your personal information from
              unauthorized access, use, or disclosure. These steps include:
            </p>
            <ul className="flex flex-col gap-2 list-disc pl-4 text-body-text-color pt-5">
              <li>Storing your information on secure servers</li>
              <li>Using encryption to protect your data</li>
              <li>
                Limiting access to your information to authorized personnel
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-2xl text-heading-color">
              Copyright and Security
            </h2>
            <p className="text-body-text-color pt-5">
              Our Real-Time Online Auction system respects the intellectual property rights of others. We prohibit users from listing items that infringe on the copyright or trademark of others. We also take steps to protect the security of our website from unauthorized access.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
