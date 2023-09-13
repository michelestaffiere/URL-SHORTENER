import { useEffect,useState } from "react";
import axios from 'axios';
import './UrlShortener.css';



const UrlShortener = ({shortLinks, normalLinks, currentShortList, currentOgList}) =>{
    //states
    const [userInput, setUserInput] = useState("");
    const [linkValid, setLinkValid] = useState(true);
    
    //variables

    const handleInputChange = (e) =>{
        setUserInput(e.target.value)
    };
    const validateLink = (link) =>{
        // link cant start with www. needs to start with http://
        if(link.startsWith("http://") || link.startsWith("https://")){
            try{
                new URL(link);
                return true;
            } catch (error){
                return false;
            }
        }
        return false // previous try catch returns no protocol found.
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
                shortLinks([...currentShortList, newShortLink]);
                normalLinks([...currentOgList, newOriginalLink]);

                // Reset Field and Update state
                setUserInput("");
                setLinkValid(true);

            }).catch(error =>{
                console.error(error);
            })
        } else{
            setLinkValid(false);
        }
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
                         className={linkValid ? "" :"invalid-link"}
                    />
                    {
                        linkValid ? "" :<p className="invalid-message">Please enter a valid link</p>
                    }
                    <button onClick={handleSubmit}>Shorten It!</button>
                </form>
            </div> 
                {/* {
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
                } */}
        </section>
    )
}
export default UrlShortener