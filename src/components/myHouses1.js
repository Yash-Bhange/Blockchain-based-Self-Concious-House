import React ,{Component} from 'react';
import '../componentsCSS/myHouses.css';
import'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';
import Sch from '../abis/contracts/Sch.json';


class myHouse1 extends Component{
 
    constructor(props){
    super(props);
    console.log(this.props.AbiAndAddress.add);
    
    this.state = {
       housesarray:'',
       housesarraylen:''
    };
 
    this.loadWeb3=this.loadWeb3.bind(this);
    this.displayHouses=this.displayHouses.bind(this);
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

        const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks['3'].address);    //if ropsten use id as '3'  , if local ganache us ID as '5777'

        sch.methods.getHousesByOwner(currentOwner).call({from:currentOwner},(err,res)=>{
            if(err){
                console.log(err);
            }else{
         
                this.setState({
                    housesarray:res[0],
                    housesarraylen:res[1]
                })
            }

       
        })




 }
       
 displayHouses() {
    var inc=0;
    var housesarraylen=parseInt(this.state.housesarraylen);


    var houses=this.state.housesarray;
    console.log(houses);

     if(housesarraylen==0)
     {
         window.alert("you don't own any house");
         window.location.href="/home"
     }

     for(var v of houses){
        
        const table=document.getElementById('table').getElementsByTagName('tbody')[0];
        console.log("1",v);
         var row=table.insertRow();
         for(var i=0;i<8;i++)
         {
            var col=row.insertCell(i);
            var newText  = document.createElement('span');
            if(i==5){
                var date=new Date(v[i]*1000)
                newText.innerHTML=date;
            }else if(i==6){
                
                if(v[i]==0){
                    newText.innerHTML="Available";
                }else{
                    newText.innerHTML="Requested";
                }
            }
            else{
                newText.innerHTML=v[i];
            }
            
            col.appendChild(newText);
         }
         var col=row.insertCell(8);
         var newText  = document.createElement('a');
         newText.href='/viewHistory/'+v[0]
         newText.innerHTML="View History";
         newText.style.color="blue";
         col.appendChild(newText);

       
       
    }
}
      



    render(){

            return(   


                <div>   
                    
                    <div id="tablesection">
                    <table id="table" border="1px"  >
                        <tbody>
                            <tr>
                                <td>ID</td><td>House Name</td><td>Current Owner</td><td>Pin Code</td><td>Address</td><td>Creation Date</td><td>Status</td><td>History Count</td><td>More Info</td>
                            </tr>

                        </tbody>
                        {this.displayHouses()}


                    </table>

                       
                </div>
                      
    
                 </div>    
              
            );
    
    }
}


export default myHouse1;


