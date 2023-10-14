import { useEffect,useState } from "react";

const ShortenedLinks = ({currentShortList,currentOgList}) =>{
    useEffect(()=>{
        console.log(currentOgList);
        console.log(currentShortList);
    },[currentShortList,currentOgList])
    
};

export default ShortenedLinks