// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Sch {
 
 uint public houseCount;
 uint public historyCount;


 
struct History{
    uint historyId;
    uint houseId;
    address owner;
    string title;
    string desc;
    string contractorName;
    uint256 historyDate;



}

enum HouseStatus{
    Available,
    Requested
    
}

HouseStatus constant defaultChoice=HouseStatus.Available;



struct House{
     uint houseId;
     string name;
     address currentOwner;
     uint256 pinCode;
     string houseAddress;
     uint256 houseDate;
     HouseStatus houseStatus;
     uint  totalHistoryCount;
     address RequestedUser;
     
    

 }

House [] public house;
History [][20] public history;


mapping(address=>uint) public getHousesByOwnerCount;
mapping(uint256=>uint) public getHousesByPincodeCount;


constructor() public{
    
    historyCount=0;
    houseCount=0;
    
    
   

}



function addHouse(string memory nm,uint256 pc,string memory ha,uint256 hd) public{
   
    house.push(House(houseCount,nm,msg.sender,pc,ha,hd,HouseStatus.Available,0,address(0x0)));
    
    
    addHouseHistory(houseCount,"Deploy-House","This house was deployed on given date !","no contractor availale",hd);
    houseCount++;
    
    if(getHousesByOwnerCount[msg.sender]==0){
        
        getHousesByOwnerCount[msg.sender]=1;
    }
    else{
        uint a=getHousesByOwnerCount[msg.sender];
        a++;
        getHousesByOwnerCount[msg.sender]=a;
        
    }
    
      
    if(getHousesByPincodeCount[pc]==0){
        
        getHousesByPincodeCount[pc]=1;
    }
    else{
        
        uint a=getHousesByPincodeCount[pc];
        a++;
        getHousesByPincodeCount[pc]=a;
        
    }

    

    
}  


function getHousesByOwner(address _owner)public view returns(House[] memory ,uint){
     
     uint cnt=getHousesByOwnerCount[address(_owner)];

    // require(cnt!=0,"No houses availale for given owner");
     
     House[] memory retHouse=new House[](cnt);
     uint retHouseCount=0;
     
     for(uint i=0;i<houseCount;i++)
     {
         House storage temHouse=house[i];
         if(address(temHouse.currentOwner)==address(_owner))
         {
             House memory temHouse1=house[i];
             retHouse[retHouseCount]=temHouse1;
             retHouseCount++;
             
         }
     }
     
     return(retHouse,retHouseCount);
     
}


function getHousesByPincode(uint256 _pinCode)public view returns(House[] memory,uint){
    
    
    uint cnt=getHousesByPincodeCount[_pinCode];

    require(cnt!=0,"No houses availale for given pincode");

    House[] memory retHouse=new House[](cnt);
    uint retHouseCount=0;
    
     for(uint i=0;i<houseCount;i++)
     {
         House storage temHouse=house[i];
         uint256 pin=temHouse.pinCode;
         if(pin==_pinCode)
         {
             House memory temHouse1=house[i];
             retHouse[retHouseCount]=temHouse1;
             retHouseCount++;
             
         }
     }
    
    
    return(retHouse,retHouseCount);
}


function addHouseHistory(uint _houseId,string memory title,string memory desc,string memory cn,uint256 hd) public {
  
    
    history[_houseId].push(History(historyCount,_houseId,msg.sender,title,desc,cn,hd));
    house[_houseId].totalHistoryCount++;
    historyCount++;
} 


function getHouseHistory(uint _houseId)public view returns(History[] memory,uint){
    
    House storage _temHouse=house[_houseId];
    uint  _totalHistoryCount=_temHouse.totalHistoryCount;
    History[] memory _history=new History[](_totalHistoryCount);
    
    for(uint i=0;i<_totalHistoryCount;i++)
    {
        _history[i]=history[_houseId][i];
    }
   
    return(_history,_totalHistoryCount);
    
}

function requestHouse(uint _houseId)public {

    House storage _temHouse=house[_houseId];
    _temHouse.houseStatus=HouseStatus.Requested;
    _temHouse.RequestedUser=address(msg.sender);
}
/*
function agreeHouse(uint _houseId)public {

    House storage _temHouse=house[_houseId];
    
    addHouseHistory(houseCount,"Deploy-House","This house was deployed on given date !","no contractor availale",hd);
    
}


function disAgreeHouse(uint _houseId)public {

}


*/


}






/*// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Sch {
 
 uint public houseCount;
 uint public historyCount;


 
struct History{
    uint historyId;
    uint houseId;
    address owner;
    string title;
    string desc;
    string contractorName;
    uint256 historyDate;


}

 struct House{
     uint houseId;
     string name;
     address currentOwner;
     string pinCode;
     string houseAddress;
     History[] houseHistory;
     uint256 houseDate;

 }

mapping(uint=>House) public house;

constructor() public{
    
    historyCount=0;
    houseCount=0;

}





function addHouse(string memory nm,string memory pc,string memory ha,uint256 hd) public{
    historyCount++;
    houseCount++;
    History memory temp=History(historyCount,houseCount,msg.sender,"house creation","house created on blockchain","hd",hd);
    house[houseCount].houseId=houseCount;
    house[houseCount].name=nm;
    house[houseCount].currentOwner=msg.sender;
    house[houseCount].pinCode=pc;
    house[houseCount].houseAddress=ha;
    house[houseCount].houseDate=hd;
    house[houseCount].houseHistory.push(temp);
}

function getHousesByAddress(address owner) public returns(House[] memory ,uint){
    
    House [] memory retHouse;
    uint cnt=0;
    
    for(uint i=0;i<houseCount;i++)
    {
        House memory temHouse=house[i];
        if(temHouse.currentOwner==owner)
        {
            retHouse[i]=temHouse;
            cnt++;
        }
    }
   
    return(retHouse,cnt);
    
    
}

function getHousesByPincode(string memory pincode) public returns(House[] memory,uint){
    
    House [] memory retHouse;
    uint cnt=0;
    
    
    for(uint i=0;i<houseCount;i++)
    {
        House memory temHouse=house[i];
        if(keccak256(abi.encodePacked((temHouse.pinCode)))==keccak256(abi.encodePacked((pincode))))
        {
            retHouse[i]=temHouse;
            cnt++;
        }
    }
   
    return(retHouse,cnt);
    
    
}




function addHistory(uint houseid,string memory title,string memory desc,string memory cn,uint256 hd) public {
    historyCount++;
    House storage temHouse=house[houseid];
    temHouse.houseHistory.push(History(historyCount,houseid,msg.sender,title,desc,cn,hd));
}


function getHouseHistorylength(uint houseid) public returns(uint){
    
    House storage temhouse=house[houseid];
    
  return(temhouse.houseHistory.length);
    
}

function getHouseHistory(uint houseid ) public returns(History[] memory) {
    
    History[] memory history=new History[](historyCount);
    House storage temhouse=house[houseid];
    for(uint i=0;i<temhouse.houseHistory.length;i++)
    {
         history[i]=temhouse.houseHistory[i];
    }
    return (history);
    
}



}
*/
