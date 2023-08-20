import {useState} from "react";
import Navbar from "../components/Navbar";

function Home() {
	const [userPreferences, setUserPreferences] = useState(null);
	const [style, setStyle] = useState("");
	const [colors, setColors] = useState("");
	const [clothingTop, setClothingTop] = useState("");
	const [clothingBottom, setClothingBottom] = useState("");
	const [occasion, setOccasion] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [feedback, setFeedback] = useState("");
	const [outfitIdea, setOutfitIdea] = useState("");
	const [images, setImages] = useState(null);

	const generateImages = async (outfitIdea) => {

		try {
			const response  = await fetch("http://localhost:4000/images", {
				method: "POST",

				body: JSON.stringify({
					prompt: outfitIdea
				}),

				headers: {
					"content-type": "application/json"
				}
			})

			const data = await response.json();
			// console.log(data);
			setImages(data);
		} catch (error) {
			console.error(error);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(style !== "" && colors !== "" && clothingTop !== "" && occasion !== "" && age !== "" && clothingBottom !== "" && gender !== "") {
			const up = `
			Style: ${style} 
			Gender: ${gender}
			Colors: ${colors}
			ClothingTop: ${clothingTop}
			ClothingBottom: ${clothingBottom}
			Occasion: ${occasion}
			Age: ${age}
			`;

			setUserPreferences(up);

			const promt = `Generate a fashion outfit idea based on the following preferences:\n${userPreferences} `;

			try {
				const response  = await fetch("http://localhost:4000/completions", {
					method: "POST",

					body: JSON.stringify({
						promt: promt
					}),

					headers: {
						"content-type": "application/json"
					}
				})

				const data = await response.json();
				// console.log(data.choices[0].text.trim());
				setOutfitIdea(data.choices[0].text.trim());

				// console.log(outfitIdea);
				generateImages(outfitIdea);
			} catch (error) {
				console.error(error);
			}
		}
	}

	const handleFeedback = async (e) => {
		// e.preventDefault();

		if(feedback === "No") {
			setImages(null);
			generateImages(outfitIdea);
		} else {
			// Add this outfit description to the database for auto-generation
            await fetch("http://localhost:4000/newPrompt", {
                method:"POST",

                body: JSON.stringify({
                    newPrompt:outfitIdea
                }),

                headers: {
                    'Content-Type': 'application/json'
                }
            })
		}
	}

  	return (
	<div class="container">

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

		<div class="container">

			{/* here we have the input form */}
			<form class="conatiner" onSubmit={handleSubmit}>
				<div 
					class="mb-3" 
					style={{marginTop:"10px",
						width: "100%"
					}} 
				>
					<h6>Enter your Preffered Style</h6>

					<select class="form-select form-select-sm" aria-label=".form-select-sm example"
					value={style}
					onChange={(e) => setStyle(e.target.value)}
					>
						<option selected>Select your style</option>
						<option value="Casuals" selected>Casuals</option>
						<option value="Formals">Formals</option>
						<option value="Party">Party</option>
					</select>

				</div>

				<div 
					class="mb-3" 
					style={{marginTop:"10px",
						width: "100%"
					}} 
				>
					<h6>Enter your Gender</h6>

					<select class="form-select form-select-sm" aria-label=".form-select-sm example"
					value={gender}
					onChange={(e) => setGender(e.target.value)}
					>
						<option selected>Select your Gender</option>
						<option value="Male" selected>Male</option>
						<option value="Female">Female</option>
					</select>

				</div>

				<div 
					class="mb-3" 
					style={{marginTop:"10px",
						width: "100%"
					}} 
				>
					<h6>Enter your Color Choices</h6>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
					placeholder="Enter your text here"
					value={colors}
					onChange={(e) => setColors(e.target.value)}
					></textarea>
				</div>

				<div 
					class="mb-3" 
					style={{marginTop:"10px",
						width: "100%"
					}} 
				>
					<h6>Enter your Preffered Topwear</h6>
					<select class="form-select form-select-sm" aria-label=".form-select-sm example"
					value={clothingTop}
					onChange={(e) => setClothingTop(e.target.value)}
					>
						<option selected>Select your Topwear</option>
						<option value="T-shirts">T-shirts</option>
						<option value="Casual Shirts">Casual Shirts</option>
						<option value="Formal Shirts">Formal Shirts</option>
						<option value="Sweatshirts">Sweatshirts</option>
						<option value="Jackets">Jackets</option>
						<option value="Sweaters">Sweaters</option>
						<option value="Blazers">Blazers</option>
					</select>
				</div>

				<div 
					class="mb-3" 
					style={{marginTop:"10px",
						width: "100%"
					}} 
				>
					<h6>Enter your Preffered Bottomwear</h6>
					<select class="form-select form-select-sm" aria-label=".form-select-sm example"
					value={clothingBottom}
					onChange={(e) => setClothingBottom(e.target.value)}
					>
						<option selected>Select your Bottomwear</option>
						<option value="Jeans">Jeans</option>
						<option value="Casual Trousers">Casual Trousers</option>
						<option value="Formal Trousers">Formal Trousers</option>
						<option value="Shorts">Shorts</option>
						<option value="Trackpants">Trackpants</option>
					</select>
				</div>

				<div 
					class="mb-3" 
					style={{marginTop:"10px",
						width: "100%"
					}} 
				>
					<h6>Enter your Occasion</h6>
					<select class="form-select form-select-sm" aria-label=".form-select-sm example"
					value={occasion}
					onChange={(e) => setOccasion(e.target.value)}
					>
						<option selected>Select your Occasion</option>
						<option value="Weekend outing">Weekend outing</option>
						<option value="Work">Work</option>
						<option value="Date">Date</option>
						<option value="Party">Party</option>
					</select>
				</div>

				<div 
					class="mb-3" 
					style={{marginTop:"10px",
						width: "100%"
					}} 
				>
					<h6>Enter your Age</h6>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
					placeholder="Enter your text here"
					value={age}
					onChange={(e) => setAge(e.target.value)}
					></textarea>
				</div>

				<button 
					type="submit"
					class="btn btn-outline-success"
					style={{width: "100%"}}
				>
					Suggest Outfit
				</button>

			</form>

			{/* here the image will be genrated and a texual description will also be generated */}
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
						alt={`Generated oufit of ${outfitIdea}`}
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

export default Home