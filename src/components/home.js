import React ,{Component} from 'react';
import '../componentsCSS/home.css';
import pic from '../r1.jpg'

import footerimg from '../house.png'



class home extends Component{
 
    constructor(props){
        super(props);


    }

  

    render(){

        return(  
          
                <div>
                  <img class="mainimg" src={pic}></img>
                <div>

                <span class="text">A Self-Conscious House : <small>Tracking its Lifecycle</small> <br></br>
                <img class="footerimg" src={footerimg}></img> </span> 
                
                </div>
                
                
              

             </div>    
          
        );
            
        



    }
}


export default home;


