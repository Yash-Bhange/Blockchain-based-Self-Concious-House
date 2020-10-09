import React ,{Component} from 'react';
import '../componentsCSS/explore.css';
import Web3 from 'web3';
import Sch from '../abis/contracts/Sch.json';


class explore extends Component{
 
constructor(props){
    super(props);
    console.log(this.props.accounts);
    
    this.state = {
        housesarray:'',
        housesarraylen:''
     };

    this.go= this.go.bind(this);
    this.loadWeb3=this.loadWeb3.bind(this);
    this.requestfunc= this.requestfunc.bind(this);
    this.displayHouses= this.displayHouses.bind(this);

}
async componentWillMount(){
    await this.loadWeb3();
 
  
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
   

async go(e){
    e.preventDefault();
    var searchvalue=document.getElementById('searchValue').value;
    //console.log(typeof searchvalue);
    var currentOwner= await window.web3.eth.getCoinbase();
    const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks['5777'].address);

        if(searchvalue[0]==='0'&& searchvalue[1]==='x')
        {   
                    
            sch.methods.getHousesByOwner(currentOwner).call({from:currentOwner},(err,res)=>{
                if(err){
                    alert(err);
                }else{
            
                    this.setState({
                        housesarray:res[0],
                        housesarraylen:res[1]
                    })

                    console.log("updated");
                    this.displayHouses(currentOwner);
                }

        
            })
             
        }else if(searchvalue.length===6){
            
            var pincode=parseInt(searchvalue);
            sch.methods.getHousesByPincode(pincode).call({from:currentOwner},(err,res)=>{
                if(err){
                    alert(err);
                }else{
            
                    this.setState({
                        housesarray:res[0],
                        housesarraylen:res[1]
                    })

                    this.displayHouses(currentOwner);   //function call
                   
                }

        
            })
            
        }
        else{

            alert("provide valid input")

        }
        
    
}



      
async displayHouses(currentOwner) {
   
    var housesarraylen=parseInt(this.state.housesarraylen);


    var houses=this.state.housesarray;
    console.log(houses);
    const tryTable=document.getElementById('table');

    while(tryTable.rows.length>1){
        tryTable.deleteRow(1);
    }
   
    const table=tryTable.getElementsByTagName('tbody')[0];

     for(var v of houses){
       
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

                    
                    var temnewText  = document.createElement('BUTTON');
                    temnewText.innerHTML="click to Request";
                    temnewText.key=v[0];
                    temnewText.style.backgroundColor="lightgreen"
                    temnewText.onclick=()=>{ 
                        this.requestfunc(v[0],v[2]);
                    };
                    newText.appendChild(temnewText);


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

async requestfunc(house_id,owner){
    var currentOwner= await window.web3.eth.getCoinbase();
    const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks['5777'].address);
    console.log(typeof currentOwner,typeof owner,currentOwner,owner)
     if(owner.toString().toLowerCase()===currentOwner.toString()){

        alert("You cannot request your own house");
       
     }
     else{

        sch.methods.requestHouse(house_id).send({from:currentOwner},(err,res)=>{

            if(err){
                alert(err);
            }
            else{
                alert(res);
            }
        })

     }
   
    
}



    render(){

        return(  

            <div>

         
           

            <div id="container">
                        <div class="search">
                            <input type="text" placeholder="Pincode , Owner account hash"  name="search" class="searchbar" id="searchValue"/>
                            <button type="submit" class="search_button" onClick={this.go}><i class="fa fa-search"></i></button>
                        </div>
            </div>


            <div id="tablesection">
            <table id="table" border="1px" >
                        <tbody>
                          
                          <tr>
                                <td>ID</td><td>House Name</td><td>Current Owner</td><td>Pin Code</td><td>Address</td><td>Creation Date</td><td>Status</td><td>History Count</td><td>More Info</td> 
                          </tr>
                        </tbody>
                        


                    </table>
            </div>






               
            </div>

        );
            
        



    }
};


export default explore;


