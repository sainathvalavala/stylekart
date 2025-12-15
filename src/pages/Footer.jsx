import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Top Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm text-gray-600">
          {/* Online Shopping */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              ONLINE SHOPPING
            </h3>
            <ul className="space-y-2">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Home & Living</li>
              <li>Beauty</li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              CUSTOMER POLICIES
            </h3>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>T&C</li>
              <li>Terms Of Use</li>
              <li>Track Orders</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>Careers</li>
              <li>Site Map</li>
              <li>Corporate Information</li>
            </ul>
          </div>
          {/* Guarantees */}
          <div>
            <ul className="space-y-4">
              <li>
                <span className="font-semibold text-gray-900">
                  100% ORIGINAL
                </span>{" "}
                guarantee for all products
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Return within 14 days
                </span>{" "}
                of receiving your order
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Shopify. All rights reserved.</p>
          <p>Made with ❤️  by Sainath Valavala</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
