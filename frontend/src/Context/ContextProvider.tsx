import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>({});

const ContextProvider = (props: { children: any }) => {
  const [loggedInUser, setLoggedInUser] = useState<any>({});


  const whoAmI = async () => {
    await fetch("/auth/whoami", {
      method: "get",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      mode: "no-cors", //  <3
    })
      .then((response) => response.json())
      .then((response) => {
        setLoggedInUser(response);
        console.log("loggedInUser: ", loggedInUser);
      })
      .catch((err) => console.log(err)
      )
  };

  const values = {
    loggedInUser,
    setLoggedInUser,
    whoAmI,
  };

  return (
    <div>
      <Context.Provider value={values}>{props.children}</Context.Provider>
    </div>
  );
};

export default ContextProvider;
