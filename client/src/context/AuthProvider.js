import React, { Component } from 'react'
import axios from 'axios'


export const blogPostAxios = axios.create()
blogPostAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const { Provider, Consumer } = React.createContext()

class AuthProvider extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token:  localStorage.getItem("token") || "",
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        }
    }   
    
    
    
    // start of auth features ==========================>
    changeUserState = (inputs) => {
        this.setState(prev => {
            return {user: inputs,}
        })
    }
    
  
        signUp = (user) => {
            
            //make this thenable return axios
            
            axios.post(`/user/signup`, user).then(res => {
                const { token, user, } = res.data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                this.setState({token,user,})
                //makes it so this function can return data
                //return res make this tenable receive data
            }).catch(err => console.log(err)) }
            
            logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState(
        {user: {},
        token: ""})}
    
    login = (user) => {
        axios.post("/user/login", user).then(res => {
            const { token, user } = res.data;
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            this.setState({ user,token,}); 
         })}
    
    
    handleSubmitForLogin = (e) => {
        e.preventDefault(e)
        const user = { 
            name: this.state.name,
            email: this.state.email, 
            password:  this.state.password}
                this.login(user)
        this.setState( prev => ({
            user: {...prev.user, user},
            name: '',
            email: '',
            password: '',
            
        })) }

        

    
    
    handleSubmit = (e) => {
        e.preventDefault()
        const user = { 
            name: this.state.name,
            email: this.state.email,
            password:  this.state.password
        }  
            this.signUp(user)
        this.setState( prev => ({
            user: {...prev.user, user},
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            
        }))  }
    
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value}) }
    //end of auth features ==========================



    render() {
    
        return ( 
            <div>
                <Provider  
                    value={{
                        user: this.state.user,
                        token: this.state.token,
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                        passwordConfirmation: this.passwordConfirmation,
                        handleChange: this.handleChange,
                        handleSubmit: this.handleSubmit,
                        signUp: this.signUp,
                        handleSubmitForLogin: this.handleSubmitForLogin,
                        logout: this.logout,
                        RouterProps: this.props,
                        changeUserState: this.changeUserState,
                    }}> 
                { this.props.children  }
                </Provider>
            </div>
        )
    }
}

export const withAuth = C => props => (
    <Consumer>
        { value => <C { ...value } { ...props  }/>}
    </Consumer>
)

export default AuthProvider