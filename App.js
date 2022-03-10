const [currentUser, setCurrentUser] = useState({})
const [isAuthenticated, setIsAuthenticated] = useState(false)

  const registerUser = async (data)=> {
    try{
      const configs = {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const newUser =  await fetch('http://localhost:8000/auth/register',configs)
      const parsedUser = await newUser.json()
      console.log(parsedUser)
    
      setUserToken(parsedUser.token)
      
      setCurrentUser(parsedUser.user)
      
      setIsAuthenticated(parsedUser.isLoggedIn)

      

      return parsedUser 

    }catch(err){
      console.log(err)
      clearUserToken()
      setIsAuthenticated(false)
    }
  }

// inside return

<Route
exact path="/"
render={(renderProps)=><RegisterForm {...renderProps} signUp={registerUser}/>}
/>