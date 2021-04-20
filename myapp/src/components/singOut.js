
import { Link } from 'react-router-dom';
import {auth} from '../apis/firebase';



function SignOut() {

   const logout=async()=> {
      await auth.signOut();
  }
  
    return auth.currentUser && (<>
    <Link to="/" className="btn btn-sm btn-outline-secondary " onClick={logout}>
        Sign Out 
    </Link>
    </>
  );
}

export default SignOut;
