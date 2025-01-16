import { storage } from "@/libs/storage";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  token: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(() => {
    const user = storage.getString("user");

    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  function handleSetUser(user: User | null) {
    if (user) {
      setUser(user);
      storage.set("user", JSON.stringify(user));
    } else {
      setUser(null);
      storage.contains("user") && storage.delete("user");
    }
  }

  return { user, setUser: handleSetUser };
}
