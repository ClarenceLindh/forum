import React, { useEffect } from "react";
import CreateThread from './CreateThread';
import '../Styles/Home.scss';



class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            topics: ["sport", "fun"],
            isLoggedin: false,
            user:"Anna"
        }
    }
    
	render() {
		return (
			<div className="main">
				

            <CreateThread 
            user={this.state.user}
            topics={this.state.topics}
            />
    </div>
        )
        }
    }
    export default Home;
          