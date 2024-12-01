import { UserPlusIcon } from "@heroicons/react/24/solid";
import  { Form }  from "react-router-dom"
import illustration from "../assets/illustration.jpg"

const Intro = ()=>{
    return (
        <div className="intro">
            <div>
                <h1>
                    Take Control of <span className="accent" >Your Money</span>
                </h1>
                <p>
                    personal budget is the secret to financial freedom. Start your journey today
                </p>
                <Form method="post">
                  <input type="text" name="userName" 
                  required
                  placeholder="what is your name?"
                  aria-label="Your-name"
                  autoComplete="given-name"

                  /> 
                  <button type="submit" className="btn btn--dark">
                  <span>Create Account</span> 
                  <UserPlusIcon width={20} />
                  </button> 
                </Form>
            </div>
            <img src={illustration} alt="" />
        </div>
    )
}

export default Intro;