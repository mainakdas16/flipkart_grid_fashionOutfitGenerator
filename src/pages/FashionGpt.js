import React, { useState } from 'react'
import Navbar from '../components/Navbar'

function FashionGpt() {

    const [outfit, setOutfit] = useState("");
    const [images, setImages] = useState(null);
    const [feedback, setFeedback] = useState("");

    const generateImages = async (outfit) => {
        // e.preventDefault();
		try {
			const response  = await fetch("http://localhost:4000/images", {
				method: "POST",

				body: JSON.stringify({
					prompt: outfit
				}),

				headers: {
					"Content-Type": "application/json"
				}
			})

			const data = await response.json();
			console.log(data);
			setImages(data);
		} catch (error) {
			console.error(error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		generateImages(outfit);
	}

    const handleFeedback = async (e) => {
		e.preventDefault();

		if(feedback === "No") {
			setImages(null);
			generateImages(outfit);
		} else {
			// Add this outfit description to the database for auto-generation
            await fetch("http://localhost:4000/newPrompt", {
                method:"POST",

                body: JSON.stringify({
                    newPrompt:outfit
                }),

                headers: {
                    'Content-Type': 'application/json'
                }
            })
		}
	}

    return (
    <div className='container'>

        <div class="p-3 mb-2 bg-dark text-white" 
			style=
			{{
				borderRadius:"5px",
				border:"none",
				textAlign:"center"
			}}
		>
			<h2>Fashion Outfit Generator</h2>
		</div>

        <Navbar></Navbar>

        <div className="container">
			<h5 style={{
				textAlign:"center",
				fontWeight:"bold"
			}} >Write a prompt to search for any looks</h5>
            <form class="mb-3" style={{
                marginTop:"10px"
            }} 
            onSubmit={handleSubmit}
            >

                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
                placeholder='ex. Which outfit will be good for a hill station ?'
                value={outfit}
                onChange={(e) => setOutfit(e.target.value)}
                ></textarea>

                <button 
						type="submit"
						class="btn btn-outline-success"
						style={{width: "100%", marginTop:"10px"}}
					>
						Generate
                </button>
            </form>

            <div class="container" style={{
				marginTop: "25px",
				marginBottom: "25px"
			}} >
				{   images !== null &&
					<h5 style={{textAlign:"center"}} >Here are some of the Outfit Ideas</h5>}
				<div className="container" style={{
					textAlign:"center"
				}}>
					{images?.map((image, _index) => (
						<img key={_index} src={image.url} 
						alt={`Generated oufit of ${outfit}`}
						style={{
							margin:"2px",
							// width:"100%"
						}}
						></img>
					))}					
				</div>
			</div>

            <div className="container" style={{
				marginBottom:"15px"
			}} >
				{images !== null && 
				<h5
				>Do you like the outfit generated ?</h5>}
				{images !== null &&  <form onSubmit={handleFeedback} >
					<select class="form-select" aria-label="Default select example"
					value={feedback}
					onChange={(e) => setFeedback(e.target.value)}
					>
						<option selected>Open this select menu</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
					<button 
						type="submit"
						class="btn btn-outline-success"
						style={{width: "100%", marginTop:"10px"}}
					>
						Submit Feedback
					</button>
				</form>
				}
			</div>

        </div>

    </div>
  )
}

export default FashionGpt