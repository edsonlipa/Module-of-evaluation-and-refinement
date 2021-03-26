
import {auth} from '../apis/firebase';



function SignOut() {
  
    return auth.currentUser && (<>
    <button className="btn btn-sm btn-outline-secondary " onClick={()=>auth.signOut()}>
        Sign Out 
    </button>
    </>
  );
}

export default SignOut;
