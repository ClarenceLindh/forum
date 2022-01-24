import React, { useEffect, useState } from "react";
import CreateThread from "./CreateThread";
import "../Styles/Home.scss";

class Home extends React.Component {
  /* constructor(props){
        super(props)
        this.state = {
           topics: [{"sport"}, {"fun"}],
            isLoggedin: false,
            user:"Anna"
        }
    }*/

  render() {
    return (
      <div className="main">
        <CreateThread />
      </div>
    );
  }
}
export default Home;
