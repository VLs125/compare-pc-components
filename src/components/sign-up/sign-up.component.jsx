import React from 'react';
import './sign-up.style.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import{auth,createUserProfileDocument} from "../../firebase/firebase.utils";

class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:'',
        }
    }

    handleSubmit= async (e)=>{
        e.preventDefault();
        const{displayName,email,password,confirmPassword}=this.state
        if(password!==confirmPassword){
            alert('passwords dont match');
            return;
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});

            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:'',
            });

        }catch(e){
            console.log(e);
        }
    }
    handleChange=(e)=>{
        const {name,value} = e.target;
        this.setState({
            [name]:value,
        })
    }

    render() {
        const{displayName,email,password,confirmPassword}=this.state
        return(
            <div className="sign-up">
                <h2 className="title">I dont have account</h2>
                <span>Sign up with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange}
                               name="displayName"
                               type="text"
                               value={displayName}
                               label="Display Name"
                               required/>
                    <FormInput handleChange={this.handleChange}
                               name="email"
                               type="email"
                               value={email}
                               label="Email"
                               required/>
                    <FormInput handleChange={this.handleChange}
                               name="password"
                               type="password"
                               value={password}
                               label="Password"
                               required/>
                    <FormInput handleChange={this.handleChange}
                               name="confirmPassword"
                               type="password"
                               value={confirmPassword}
                               label="Confirm Password"
                               required/>
                    <CustomButton type="submit" value="Submit form">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}
export default SignUp;