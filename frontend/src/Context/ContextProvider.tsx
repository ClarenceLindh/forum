import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>({});

const ContextProvider = (props: { children: any }) => {
  const [loggedInUser, setLoggedInUser] = useState<any>({});

  useEffect(() => {
    whoAmI();
  }, []);

  const whoAmI = async () => {
    let response = await fetch("/auth/whoami", {
      method: "get",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      mode: "no-cors", //  <3
    })
      .then((response) => response.json())
      .then((response) => {
        setLoggedInUser(response);
        console.log("setLoggedInUser: ", loggedInUser);
      });
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
