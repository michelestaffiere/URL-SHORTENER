import { useEffect,useState } from "react";
import axios from 'axios';



const UrlShortener = () =>{
    //states
    const [shortenedLinks, setShortenedLinks] = useState([]);
    const [orignalLinks, setOrignalLinks] = useState([]);
    const [userInput, setUserInput] = useState("");
    
    //variables

    const handleInputChange = (e) =>{
        setUserInput(e.target.value)
    };
    const validateLink = (link) =>{
        try{
            new URL(link);
            return true;
        } catch (error){
            return false;
        }
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validateLink(userInput) === true){
            axios({
                method:'Get',
                url: `https://api.shrtco.de/v2/shorten?url=${userInput}`
            }).then(res=>{
                // new links to add to state
                const newShortLink = res.data.result.full_short_link;
                const newOriginalLink = res.data.result.original_link;

                //update states
                // make a spread copy of current state and add new link to it.
                setShortenedLinks([...shortenedLinks, newShortLink]);
                setOrignalLinks([...orignalLinks, newOriginalLink]);

            }).catch(error =>{
                console.error(error);
            })
        } else{
            return null
        }
        setUserInput("");
    };

    return(
        <section className="UrlShortener">
            <div className="shortener-container">
                <form action="#">
                    <input
                         type="text" 
                         name="link" 
                         id="link" 
                         value={userInput} 
                         onChange={handleInputChange} 
                         required placeholder="Enter link"
                    />
                    <button onClick={handleSubmit}>Shorten It!</button>
                </form>
            </div> 
                {
                    <div className="results">
                        <ul>
                            {shortenedLinks.map((link, index) => {
                                return(
                                    <li key={index}>
                                        <p className="short-link">{link}</p>
                                        <p className="long-link">{orignalLinks[index]}</p>
                                    </li>
                                )})
                            }
                        </ul>
                    </div>
                }
        </section>
    )
}
export default UrlShortener