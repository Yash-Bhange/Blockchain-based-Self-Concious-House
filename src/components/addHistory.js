import React ,{Component} from 'react';
import '../componentsCSS/addHistory.css';
import'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';
const ipfsClient =require('ipfs-http-client')
const ipfs=new ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


class addHistory extends Component{
 
    constructor(props){
    super(props);


    
    this.state = {
        buffer1:'',
        buffer2:'',
    
    };
   this.submit= this.submit.bind(this);
   this.captureFile1= this.captureFile1.bind(this);
   this.captureFile2= this.captureFile2.bind(this);
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

      async captureFile1(event){
        event.preventDefault();
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer1: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }

    }
    async captureFile2(event){
        event.preventDefault();
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer2: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
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
                 
                    
                const beforeImage = await ipfs.add(this.state.buffer1)
                var beforeImageHash=beforeImage.cid.string;
                const afterImage = await ipfs.add(this.state.buffer2)
                var afterImageHash=afterImage.cid.string;
                    var  currdate=Math.floor(new Date().getTime()/1000);
                   // console.log(currdate);

                    var curraddress=await window.web3.eth.getCoinbase()
                   
                    console.log("njds",curraddress);


                    const sch = new window.web3.eth.Contract(this.props.AbiAndAddress.abi,this.props.AbiAndAddress.add);

                    sch.methods.addHouseHistory(houseId,title,description,contractorName,currdate,beforeImageHash,afterImageHash).send({from:curraddress},(err,hash)=>{
                        
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
                                <label>Before image: </label>
                                <input type="file" id="beforeImage" accept="image/*" onChange={this.captureFile1}></input> <br></br><br></br>
                                <label>After image: </label>
                                <input type="file" id="afterImage" accept="image/*" onChange={this.captureFile2}></input> <br></br><br></br>




                                <button type="submit" >Add</button>
                       </fieldset>
                        
                    </form>
                    
                </div>
                  

             </div>    
          
        );
            
        
    }
}


export default addHistory;


