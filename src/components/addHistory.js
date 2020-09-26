import React ,{Component} from 'react';
import '../componentsCSS/addHistory.css';
import'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';


class addHistory extends Component{
 
    constructor(props){
    super(props);


    
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
        
        var houseId=document.getElementById('houseId').value
        var title=document.getElementById('title').value 
        var description=document.getElementById('description').value 
        var contractorName=document.getElementById('contractorName').value 
       
           try{
            houseId=parseInt(houseId);
           }
           catch(Err){
               alert(Err);
           }
          
            if(houseId>=0)
            {
                 
                    

                    var  currdate=Math.floor(new Date().getTime()/1000);
                   // console.log(currdate);

                    var curraddress=await window.web3.eth.getCoinbase()
                   
                    console.log("njds",curraddress);


                    const sch = new window.web3.eth.Contract(this.props.AbiAndAddress.abi,this.props.AbiAndAddress.add);

                    sch.methods.addHouseHistory(houseId,title,description,contractorName,currdate).send({from:curraddress},(err,hash)=>{
                        
                        if(err){
                            alert(err);

                        }
                        else{
                            alert(hash);
                        }

                    })

                 
            }
            else{
                alert("Invalid house Id");
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
                       
                                <label >House Id : </label>
                                <input type="number" id="houseId" placeholder="Enter house Id"  required/> <br></br>
                            
                                <label>Title: </label>
                                <input  type="text" id="title"  placeholder="Enter title" required/>  <br></br><br></br>
                                <label>Description : </label>
                                <textarea id="description"  placeholder="Enter description" required></textarea> <br></br><br></br>
                                <label>Contractor name: </label>
                                <input  type="text" id="contractorName"  placeholder="Enter contractor name" required/>  <br></br><br></br>
                                <button type="submit" >Add</button>
                       </fieldset>
                        
                    </form>
                    
                </div>
                  

             </div>    
          
        );
            
        
    }
}


export default addHistory;


