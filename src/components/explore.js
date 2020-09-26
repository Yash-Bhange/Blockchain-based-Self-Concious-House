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

    
/*
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
        }

   
    })


*/

}
   

async go(e){
    e.preventDefault();
    var searchvalue=document.getElementById('searchValue').value;
    //console.log(typeof searchvalue);
    var currentOwner= await window.web3.eth.getCoinbase();
    const sch = new window.web3.eth.Contract(Sch.abi,Sch.networks['5777'].address);

        if(searchvalue[0]=='0'&& searchvalue[1]=='x')
        {   
                    
            sch.methods.getHousesByOwner(currentOwner).call({from:currentOwner},(err,res)=>{
                if(err){
                    alert(err);
                }else{
            
                    this.setState({
                        housesarray:res[0],
                        housesarraylen:res[1]
                    })
                }

        
            })
             
        }else if(searchvalue.length==6){
            
            var pincode=parseInt(searchvalue);
            sch.methods.getHousesByPincode(pincode).call({from:currentOwner},(err,res)=>{
                if(err){
                    alert(err);
                }else{
            
                    this.setState({
                        housesarray:res[0],
                        housesarraylen:res[1]
                    })
                }

        
            })
            
        }
        else{

            alert("provide valid input")

        }
        console.log(this.state.housesarray);
    
}

    render(){

        return(
           

            <div id="container">
                        <div class="search">
                            <input type="text" placeholder="Pincode , Owner account hash"  name="search" class="searchbar" id="searchValue"/>
                            <button type="submit" class="search_button" onClick={this.go}><i class="fa fa-search"></i></button>
                        </div>
            </div>
            

        );
            
        



    }
};


export default explore;


