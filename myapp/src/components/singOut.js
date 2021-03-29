
import { Link } from 'react-router-dom';
import {auth} from '../apis/firebase';



function SignOut() {
  
    return auth.currentUser && (<>
    <Link to="/" className="btn btn-sm btn-outline-secondary " onClick={()=>auth.signOut()}>
        Sign Out 
    </Link>
    </>
  );
}

export default SignOut;
