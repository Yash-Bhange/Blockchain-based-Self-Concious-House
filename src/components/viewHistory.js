import React ,{Component} from 'react';
import Sch from '../abis/contracts/Sch.json';
import'bootstrap/dist/css/bootstrap.css';
import '../componentsCSS/viewHistory.css';
import Web3 from 'web3';


class viewHistory extends Component{
 
    constructor(props){
    super(props);
   


    
    this.state = {
    houseid:'',
    HouseHistory:'',
    HouseHistorylen:''
    };
 
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

        // console.log(window.location.href);
         var loc=window.location.href;
         var houseId=loc.slice(34)

         this.setState({
             houseid:houseId
         });
         houseId=parseInt(houseId);
        // console.log(houseId)

    

        sch.methods.getHouseHistory(houseId).call({from:currentOwner},(err,res)=>{

            if(err)
            {
                alert(err);
            }
            else{
                console.log(res[0],res[0].length);
               this.setState({
                   HouseHistory:res[0],
                   HouseHistorylen:res[0].length
               })
            }
        })

      
}


      
displayHistory() {
   
    var HouseHistorylen=parseInt(this.state.HouseHistorylen);


    var History=this.state.HouseHistory;
    console.log(History);

     for(var v of History){
        
        const table=document.getElementById('table').getElementsByTagName('tbody')[0];
       // console.log("1",v);
         var row=table.insertRow();
         for(var i=0;i<7;i++)
         { 
             
            var col=row.insertCell(i);
            var newText  = document.createElement('span');
            if(i==6){
                var date=new Date(v[i]*1000)
                newText.innerHTML=date;
            }
            else{
                newText.innerHTML=v[i];
            }
            
            col.appendChild(newText);
         }

      

       
       
    }
}
      


    

    render(){

        return(  
            <div>   
                <div id="topSpace">

                </div>
                <div>
                
                        House Id : {this.state.houseid}
                
                </div>
                <div>
                
                       
                
                </div>
                <div id="tablesection">

                <table id="table" border="1px" >
                        <tbody>
                            <tr id="heading">
                            <td>History ID</td> <td>House ID</td><td>Current Owner</td><td>Title</td><td>Description</td><td>Contarctor </td><td>Creation Date</td>
                            </tr>

                        </tbody>
                        {this.displayHistory()}


                    </table >

                       
                </div>
                  

             </div>    
          
        );
            
        
    }
}


export default viewHistory;


