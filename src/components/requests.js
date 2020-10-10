import React ,{Component} from 'react';
import '../componentsCSS/requests.css';
import'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';
import Sch from '../abis/contracts/Sch.json';

class requests extends Component{
 
    constructor(props){
    super(props);
    console.log(this.props.AbiAndAddress.add);
    
    this.state = {
       housesarray:'',
       housesarraylen:'',
       count:''
       
    };
 
    this.loadWeb3=this.loadWeb3.bind(this);
    this.checkRequestedHouse=this.checkRequestedHouse.bind(this);
   
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

        const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks['5777'].address);

        sch.methods.getHousesByOwner(currentOwner).call({from:currentOwner},(err,res)=>{
            if(err){
                console.log(err);
            }else{
         
                this.setState({
                    housesarray:res[0],
                    housesarraylen:res[1]
              
                })
                

                this.checkRequestedHouse(currentOwner);
            }

       
        })




 }


 accept(id,currentOwner,RequestedOwner,dt){

    const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks['5777'].address);
    sch.methods.agreeHouse(id,RequestedOwner,dt).send({from:currentOwner},(err,res)=>{

        if(err)
        {
            alert(err);
        }
        else{
            alert(res);
            window.location.reload();
        }
    })

 }

 reject(id,currentOwner){

    const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks['5777'].address);
    sch.methods.disAgreeHouse(id).send({from:currentOwner},(err,res)=>{

        if(err)
        {
            alert(err);
        }
        else{
            alert(res);
            window.location.reload();
        }
    })

 }


 async checkRequestedHouse(currentOwner){


    var housesarraylen=parseInt(this.state.housesarraylen);
    if(housesarraylen==0)
    {
        window.alert("you don't have any house");
        window.location.href="/home"
    }
    var houses=this.state.housesarray;
    console.log(houses);
    const tryTable=document.getElementById('table');
    const table=tryTable.getElementsByTagName('tbody')[0];

    this.state.count=0;
    for(var v of houses){
             

            if(v[6]!=0)
            {     
                this.state.count=this.state.count+1;
                 var row1=table.insertRow();
                for(var i=0;i<2;i++)
                {
                   
                    var col1=row1.insertCell(i);
                    var newText1  = document.createElement('span');
                    newText1.innerHTML=v[i];
                    col1.appendChild(newText1);
                }

                var col1=row1.insertCell(2);
                var newText1  = document.createElement('span');
                newText1.innerHTML=v[8];
                col1.appendChild(newText1);

                var col1=row1.insertCell(3);
                var newText1  = document.createElement('span');

                var temnewText  = document.createElement('BUTTON');
                temnewText.innerHTML="Accept";
                temnewText.style.backgroundColor="lightgreen"
                var  currdate=Math.floor(new Date().getTime()/1000);
                temnewText.onclick=()=>{ 
                    this.accept(v[0],currentOwner,v[8],currdate);
                };
                newText1.appendChild(temnewText);
                col1.appendChild(newText1);


                var newText2 = document.createElement('span');

                var temnewText2  = document.createElement('BUTTON');
                temnewText2.innerHTML="Reject";
                temnewText2.style.backgroundColor="lightgreen"
                temnewText2.onclick=()=>{ 
                    this.reject(v[0],currentOwner);
                };
                newText2.appendChild(temnewText2);
                col1.appendChild(newText2);
             
            }
           

        }
    

      
    

 }
 


    render(){

            return(   


                <div>   
                    
                                <div id="tablesection">
                        <table id="table" border="1px" >
                                    <tbody>
                                    
                                    <tr>
                                            <td>ID</td><td>House Name</td> <td>Requesting user</td> <td>Status</td>
                                    </tr>
                                    </tbody>
                                    


                                </table>
                        </div>
                      
    
                 </div>    
              
            );
    
    }

};
export default requests;


