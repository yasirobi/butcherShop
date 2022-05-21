
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Menu from './components/Menu';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import MenuList from './pages/MenuList';
import UpdateProducts from './pages/UpdateProducts';
import Profile from './pages/Profile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleBlog from './pages/SingleBlog';


function App() {
  return (
    <>
     <Menu/>
     <ToastContainer/>
    
     <Switch>
     <Route path="/" exact component={ Home } />
     <Route path="/menu" exact component={ MenuList } />
     <Route path="/profile" exact component={ Profile } />
     <Route path="/blog/:blogId" exact component={ SingleBlog } />
     <Route path="/update-products" component={ UpdateProducts } />
     <Route path="/signin" component={ SignIn }/>
     <Route path="/signup" component={ SignUp } />
     </Switch>
    </>
  );
}

export default App;
