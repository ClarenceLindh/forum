import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>({});

const ContextProvider = (props: { children: any }) => {
  const [loggedInUser, setLoggedInUser] = useState<any>({});

  useEffect(() => {
    whoAmI();
  }, []);

  const whoAmI = async () => {
    let response = await fetch("/auth/whoami");
    try {
      response = await response.json();
      setLoggedInUser(response);
      console.log(response);
    }
    catch {
      console.log("Not authorized");
    }
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
