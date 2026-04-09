"use client";

import { useUser } from "@clerk/nextjs";

const Welcome = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Welcome {user ? user.firstName || user.username : "Guest"}
      </h1>
    </div>
  );
};

export default Welcome;
