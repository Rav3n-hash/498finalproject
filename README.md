This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Features

User Authentication
  - Users must sign up or log in to add items to their cart, view orders, and manage their storefront.

    - Sign up requires all information fields to be filled except the admin code (optional).

    - Providing the correct admin code (provided by site designers) grants admin privileges.

Item Browsing and Cart System

  - Users can view all posted items from the Home or Browse Pages.
    - The Home Page has a couple of different areas, such as featured items and items that are running out (less than 10 currently available)
    - The Browse Page allows users to filter items based on their category and view a list of all stores.
      
  - Items can be added to the cart by clicking the Add to Cart button on any item card.
    - Cart Limit: Users can order up to 3 items at a time. Orders with more than 3 items are not allowed.

Profile and Storefront

  - Profiles are accessed via the Profile dropdown in the navbar.
      - Users can view their storefront, which displays:
        - Their store name
        - Store picture
        - All items they have posted
  - Users can edit or delete any items they have posted from this page. 


Orders

  - Users can view all orders they have placed through the View Orders option under the Profile menu.
    - From here, they can cancel any orders they have placed. 

Admin Controls
  - Admin users have additional abilities to:
    - Delete any user (preferably upon request or for inappropriate behavior).
    - Delete any item (preferably ones that violates platform rules).
    - Delete any order (preferably upon request).

  - Admins can access moderation features through the Admin Module or via options in the Sidebar.

User Experience
  - If a user tries to access protected pages (e.g., Cart, Orders, Profile) without being logged in, they will be prompted to Log In or Sign Up with convenient   
    buttons.

## Getting Started with the Application

Note: You must have a valid account to interact fully with the platform.

1. Sign Up / Log In
  - Use the buttons located at the bottom of the navigation bar.
  - Alternatively, attempting to access protected pages will trigger a login/signup prompt.
  - When signing up, all fields must be entered except for the optional Admin Code field.
     - If you have been provided the Admin code, enter it to gain administrative privileges.

2. Browse Items
  - Browse through the available items on the homepage or Browse Page. Both can be accessed via the navigation bar.
      - On Browse, use the Category Filters to easily find specific types of items.

3. Manage Your Storefront
  - Go to Profile → View Profile
      - View, edit, or delete items you have posted.

4. Place Orders
  - Add items to your cart by clicking the red button in the bottom right corner of any item.

  - View your cart by going to Profile → View Cart.
    - Here you can see all items you have added and the order total
    - You may delete any items by clicking the red "Remove" button beside it
    - Orders are limited to 3 items. An order cannot be placed until it has 3 or less items.
    - Click "Place Order" to send your order to the databse. Click "Clear Order" to delete all items.
   
  - View any placed orders by going to Profile → View Orders
    - This page displays all orders you have placed by date.
    - An order can be canceled by clicking the red "Cancel Order" button. 

5. Admin Features
  - If you are an admin, access admin tools via the Admin Module
    - The Admin Module is accessed via Profile → Admin Module
      - This page explains your options in a bit of detail and allows you to access any of the three
     
  - Alternatively, you can quickly access each option through the naviagation bar:
    - Profile → View All Orders
    - Profile → View All Users
    - See All Items 

## Happy Harvesting!! 
