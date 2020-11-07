
import { Route, Switch } from "react-router-dom"
import Signin from "./Compos/Auth/Signin";
import Signup from "./Compos/Auth/Signup";
import SigninOption from "./Compos/Auth/SigninOption";
import Home from "./Compos/Home/Home"
import Navbar from "./Compos/Navbar"
import UserProfile from "./Compos/Auth/UserProfile";
import Forgot from "./Compos/Auth/Forgot";

function App() {

  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={SigninOption} />
        <Route path="/signin" component={Signin} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/forgotpassword" component={Forgot} />
      </Switch>
    </div>
  );
}

export default App;
