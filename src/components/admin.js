import React ,{Component} from 'react';
import '../componentsCSS/admin.css';
import Web3 from 'web3';
import Sch from '../abis/contracts/Sch.json';





class admin extends Component{
 
    constructor(props){
        super(props);



        this.loadWeb3=this.loadWeb3.bind(this);
        this.submit=this.submit.bind(this);
    }

async componentWillMount(){
        await this.loadWeb3()
     
      
}



async loadWeb3(){
    if(window.ethereum){
      window.web3=new Web3(window.ethereum);//new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));   //new Web3(window.ethereum);
  
     
      await window.ethereum.enable();
    }
    else if(window.web3)
    {
      window.web3=new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('MetaMask not detected');
    }

    var currentOwner= await window.web3.eth.getCoinbase();

    const networkId = await window.web3.eth.net.getId();
    const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks[networkId].address);    //if ropsten use id as '3'  , if local ganache us ID as '5777'

    sch.methods.organiser().call({from:currentOwner},(err,res)=>{
        if(err){
            console.log(err);
        }else{ 

            console.log(currentOwner,res)
     
           if(res.toLowerCase()!=currentOwner.toLowerCase()){
      
              //window.alert("Normal users are not allowed !");
              //window.location.href="/home"
           }

        }

   
    })



}

async submit(e){
    e.preventDefault();

    var house_id_string=document.getElementById('houseid').value;
    var house_id_number=parseInt(house_id_string);

    var currentOwner= await window.web3.eth.getCoinbase();
    const networkId = await window.web3.eth.net.getId();
    const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks[networkId].address);
    sch.methods.changeStatus(house_id_number).send({from:currentOwner},(err,res)=>{
        if(err){
            console.log(err);
        }else{ 

    
          window.alert("success");
 
        }

   
    })



}

    render(){

        return(  
               <div id="screen">   
                <div id="top-Space">
      
                </div>
                <div><p id="verification">VERIFICATION:</p> </div>              
                     <div id="container">
                        <form onSubmit={this.submit}> 
                     
                                <div id="the-form">
                                  <label class="HID">House ID : </label>
                                  <input type="number" id="houseid" placeholder="Enter House ID" required></input>
                                  <button type="submit" id="check">Verify</button>
                                
                                </div>
        
                        
                        </form>
                    
                </div>
                  
      
             </div>    
                       
        );
            
        



    }
}


export default admin;


