import React ,{Component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import Home from './components/home.js'
import AddHouse from './components/addHouse.js'
import AddHistory from './components/addHistory.js'
import  MyHouses1 from './components/myHouses1.js'
import  ViewHistory from './components/viewHistory.js'
import Explore from './components/explore.js'

import logo1 from './logo2.jpeg'
import './App.css';
import Web3 from 'web3';


import Sch from './abis/contracts/Sch.json';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentAccount:'',
      account:'',
      AbiAndAdd:{
        abi:'',
        add:''
      },
      requestCount:'0'
  };

  this.requestFuncCall= this.requestFuncCall.bind(this);
}

async componentWillMount(){
  await this.loadWeb3()
  await this.loadBlockchainData()

}

async loadWeb3(){
  if(window.ethereum){
    window.web3=new Web3(window.ethereum); //new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));   //

   
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


async loadBlockchainData() {
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  console.log(accounts)
   
  this.setState({
    account:accounts,
    currentAccount: accounts[0]
  })

 

  const networkId = await web3.eth.net.getId()
  const networkData = Sch.networks[networkId]
 
  if(networkId) {
    const sch = new web3.eth.Contract(Sch.abi, networkData.address);

     this.setState({
            
      AbiAndAdd:{
        abi:Sch.abi,
        add:networkData.address
      }
    });

   // console.log(this.state.AbiAndAdd.add);

   
  
  } else {
    window.alert('Sch contract not deployed to detected network.')
  }

}


requestFuncCall(e){
  e.preventDefault();
  if(parseInt(this.state.requestCount)==0)
  {
    alert("You dont have any request");
  }
  else{
    window.location('/requests');
  }
}




render(){


  return (


    <div class="App">
      
      <div  class="account">
          
          <div class="accountAddress">
            Current-User
          </div>
          <div class="accountAddressValue">
            <b>{this.state.currentAccount}</b>
          </div>

      </div>
      
      <div class="header">
          <div class="leftAlign">
           <a class="leftlinks"><a href="/home" class="allLinkColor"><span><i class="fa fa-home"></i>&nbsp;Home</span></a></a>
           <a class="leftlinks"><a href="/addHouse" class="allLinkColor"><span><i class="fa fa-plus"></i>&nbsp;Add House</span></a></a>
           <a class="leftlinks"><a href="/addHistory" class="allLinkColor"><span><i class="fa fa-history"></i>&nbsp;Add History</span></a></a>
           
          </div>
          <div class="centreAlign">
            <a href="/home"><img class="logo" src={logo1}/></a>
          
          </div>
          <div class="rightAlign">
          <a class="rightlinks"><a href="/explore" class="allLinkColor"><span><i class="fa fa-cart-plus"></i>&nbsp;Explore</span></a></a>
          <a class="rightlinks"><a  class="allLinkColor" onClick={this.requestFuncCall}> <span><i class="fa fa-bell"></i>&nbsp;Requests</span><span class="badge">{this.state.requestCount}</span></a></a>
          <a class="rightlinks"> <a href="/myHouses" class="allLinkColor"><span><i class="fa fa-home"></i>&nbsp;My Houses</span></a></a>
            
          </div>
      </div>

  <BrowserRouter>
  
  <Switch>
         <Route exact path="/home" component={()=><Home name="yash"/>} />
         <Route exact path="/addHouse" component={()=><AddHouse AbiAndAddress={this.state.AbiAndAdd}/>} />
         <Route exact path="/addHistory" component={()=><AddHistory AbiAndAddress={this.state.AbiAndAdd}/>} />
         <Route exact path="/myHouses" component={()=><MyHouses1 AbiAndAddress={this.state.AbiAndAdd}/>} />
         <Route exact path="/requests" component={()=><Home name="yash"/>} />
         <Route exact path="/viewHistory/:houseId"  component={()=><ViewHistory AbiAndAddress={this.state.AbiAndAdd}/>}  />
         <Route exact path="/explore" component={()=>< Explore accounts={this.state.account}/>} />
         
          
  </Switch>
  
  </BrowserRouter>
     

      
     <div class="footer">
       footer here
     </div>
             
    </div>

  );


};


}
  

export default App;
