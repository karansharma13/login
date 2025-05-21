import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const columnHelper = createColumnHelper();

const createUserTableColumns = () => [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("image", {
    header: () => "Avatar",
    cell: (info) => {
      const imageUrl = info.getValue();
      return (
        <div className="flex-auto  justify-center">
          <img 
            src={imageUrl} 
            alt="User avatar" 
            className="h-10 w-10 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/40?text=User";
            }}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor("firstName", {
    header: () => "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("birthDate", {
    header: () => "Birth Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("eyeColor", {
    header: () => "Eye Color",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address", {
    header: () => "Address",
    cell: (info) => {
      const address = info.getValue();
      if (!address) return ;
      return `${address.address }, ${address.city }, ${address.state} ${address.postalCode}`;
    },
  }),
  columnHelper.accessor("bloodGroup", {
    header: () => "Blood Group",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hair", {
    header: () => "Hair",
    cell: (info) => {
      const hair = info.getValue();
      if (!hair) return '';
      return `${hair.color} (${hair.type})`;
    },
  }),
  columnHelper.accessor("bank", {
    header: () => "Bank",
    cell: (info) => {
      const bank = info.getValue();
      if (!bank) return '';
      return `${bank.cardExpire}, 
      (${bank.cardNumber})
      ,(${bank.cardType}),
      (${bank.currency})`;
    },
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: () => "Phone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: () => "Gender",
    cell: (info) => {
      const value = info.getValue();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  }),
];

export default createUserTableColumns; 