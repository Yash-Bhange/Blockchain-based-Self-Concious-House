import React ,{Component} from 'react';
import '../componentsCSS/home.css';
import pic from '../r1.jpg'



class home extends Component{
 
    constructor(props){
        super(props);


    }

  

    render(){

        return(  
            <div>
                <div>
                <img class="mainimg" src={pic}></img>
                <a href="#test"><h1 class="text">A self-conscious house: tracking its lifecycle</h1></a>
                
                </div>
                <div id="test">
                         <img class="mainimg" src={pic}></img>
                </div>

             </div>    
          
        );
            
        



    }
}


export default home;


