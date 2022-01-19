import React, { useState } from "react";




function CreateThread() {
	/*const {
		headline,
		post,
		user
	} = props;
*/

			return (
			<div className="createThread">
				<h2>Create Thread</h2>
				<form>
  				
    				<input className="headlineThread" type="text" name="headline" placeholder="Headline...."/>
					
					
					<input className="contentThread" type="text" name="content" placeholder="Write something...." />
  					
  					<input className="submitThread" type="submit" value="Submit" />
				</form>
			</div>
)        

      }
export default CreateThread;
