// app/user/page.js
import React from 'react';
import { cookies } from 'next/headers';

const UserPage = () => {
    const cookieStore = cookies();
    // const userCookie = cookieStore.get('user');
    // const emailCookie = cookieStore.get('email');
    // const user = userCookie ? JSON.parse(userCookie.value) : null;

    return (
        <div className="p-40">
          {cookieStore.getAll().map((cookie) => (
             <>
              <p>Name: {cookie.name}</p>
              <p>Value: {cookie.value}</p>
             </>
          ))}
        </div>
    );
};

export default UserPage;
