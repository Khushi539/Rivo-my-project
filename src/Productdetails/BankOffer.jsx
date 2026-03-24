import React from "react";
import offer from "../assets/offer.webp";

const BankOffer = [
  {
    id: 1,
    offer:
      "Bank OfferFlat ₹50 off on Rivo Bajaj Finserv Insta EMI Card. Min Booking Amount: ₹2,500T&C",
  },
  {
    id: 2,
    offer:
      "Bank Offer10% off up to ₹750 on HDFC Bank Credit Card Transactions. Min Txn Value: ₹1,999T&C",
  },
  {
    id: 3,
    offer:
      "Bank Offer5% cashback on Axis Bank Flipkart Debit Card up to ₹750T&C",
  },
  {
    id: 4,
    offer:
      "Bank Offer5% cashback on Rivo Axis Bank Credit Card upto ₹4,000 per statement quarterT&C",
  },
];


const BankOffers = () => {
    return (
        <>
        <div className="pt-2">
             <p className="font-semibold pb-2">Available offers</p>
             <div>
                 {BankOffer.map((BankOffer) => (
                <div
                    key={BankOffer.id}
                    className="flex text-sm gap-2 text-black"
                >
                    <img src={offer} className="h-[20px] mt-[5px]" alt="" />
        
                            {BankOffer.offer}
                          </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default BankOffers;