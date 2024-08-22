/* eslint-disable react/prop-types */
import { useUser } from "../hooks/useUser";
import { UserContext } from "./UserContext";

export function UserProvider({children}) {
  const data = useUser()

  return (
    <>
      <UserContext.Provider value={data}>
        {children}
      </UserContext.Provider>
    </>
  )
}
