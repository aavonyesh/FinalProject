// src/components/UserSync.jsx
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const UserSync = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        try {
          await axios.post("http://localhost:3000/api/users", {
            _id: user.id,
            username: user.username,
            email: user.emailAddresses[0].emailAddress,
            image: user.imageUrl,
          });
        } catch (error) {
          console.error("User sync failed:", error.message);
        }
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null;
};

export default UserSync;
