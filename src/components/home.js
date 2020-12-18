import React ,{Component} from 'react';
import '../componentsCSS/home.css';
import pic from '../r1.jpg'
import HeroSection from './HeroSection';
import footerimg from '../house.png'
import Cards from './Cards.js'




class home extends Component{
 
    constructor(props){
        super(props);


    }

  

    render(){

        return(  
          
                <div>
                  <HeroSection/>
                  <Cards/>
                  

                
                
                </div>
                
                
              

              
          
        );
            
        



    }
}


export default home;


