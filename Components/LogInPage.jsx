import { useEffect,useState } from "react";
import Layout from "./Layout";
import SignUp from "./signUp";
import SignIn from "./signIn";

const LogInPage = () =>{
    return(
        <Layout>
            <SignIn />
            <SignUp />
        </Layout>
    )
}
export default LogInPage