import React, { useEffect } from "react";
import CreateThread from './CreateThread';
import '../Styles/Home.scss';



class Home extends React.Component {

    
	render() {
		return (
			<div className="main">
				

    <CreateThread />
    </div>
        )
        }
    }
    export default Home;
          