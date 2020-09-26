import React ,{Component} from 'react';
import '../componentsCSS/addHouse.css';
import'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';


class addHouse extends Component{
 
    constructor(props){
    super(props);
    console.log(this.props.AbiAndAddress.add);


    
    this.state = {
    
    };
    this.submit= this.submit.bind(this);
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


       
      
      }


    async submit(e){
        e.preventDefault();
        
        var name=document.getElementById('houseName').value 
        var pincode=document.getElementById('pinCode').value 
        var address=document.getElementById('address').value 
        console.log(typeof name,typeof pincode,typeof address);
        
        
            if(pincode.length==6)
            {
                 try{
                    pincode=parseInt(pincode);

                    var  currdate=Math.floor(new Date().getTime()/1000);
                   // console.log(currdate);

                    var curraddress=await window.web3.eth.getCoinbase()
                   
                    console.log("njds",curraddress);


                    const sch = new window.web3.eth.Contract(this.props.AbiAndAddress.abi,this.props.AbiAndAddress.add);

                    sch.methods.addHouse(name,pincode,address,currdate).send({from:curraddress},(err,hash)=>{
                        
                        if(err){
                            alert(err);

                        }
                        else{
                            alert(hash);
                        }

                    })

                 }
                 catch(err){
                  alert(err);

                 }
            }
            else{
                alert("Pincode must be 6 digit number");
            }
      }


    render(){

        return(  
            <div>   
                <div id="topSpace">

                </div>
                <div id="addForm">

                   <form onSubmit={this.submit}> 
                       <fieldset>
                       
                                <label >House Name : </label>
                                
                                <input type="text" id="houseName" placeholder="Enter house name"  required/> <br></br>
                            
                                <label>House PinCode: </label>
                                <input  type="text" id="pinCode"  placeholder="Enter Pincode" required/>  <br></br><br></br>
                                <label>House Address: </label>
                                <textarea id="address"  placeholder="Enter Address" required></textarea> <br></br><br></br>
                                <button type="submit" >Add</button>
                       </fieldset>
                        
                    </form>
                    
                </div>
                  

             </div>    
          
        );
            
        
    }
}


export default addHouse;


