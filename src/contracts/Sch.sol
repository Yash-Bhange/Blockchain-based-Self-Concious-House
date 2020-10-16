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
    string beforeImageHash;
    string afterImageHash;



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

 struct OutgoingRequest{
     uint houseId;
     string houseName;
     uint status;                //0-> pending  1->accepted   2->rejected
     uint256 dateOfReq;
 }

House [] public house;
History [][50] public history;


mapping(address=>uint) public getHousesByOwnerCount;
mapping(uint256=>uint) public getHousesByPincodeCount;

//outgoing request
mapping(address=>uint)public  OutgoingRequestMapCount;
mapping(address=>OutgoingRequest[]) public OutgoingRequestMap;



constructor() public{
    
    historyCount=0;
    houseCount=0;
    
    
   

}



function addHouse(string memory nm,uint256 pc,string memory ha,uint256 hd,string memory _imageHash) public{
   
    house.push(House(houseCount,nm,msg.sender,pc,ha,hd,HouseStatus.Available,0,address(0x0)));
    
    
    addHouseHistory(houseCount,"Deploy-House","This house was deployed on given date !","---",hd,_imageHash,_imageHash);
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


function addHouseHistory(uint _houseId,string memory title,string memory desc,string memory cn,uint256 hd,string memory _befImgHash,string memory _aftImgHash) public {
  
    
    history[_houseId].push(History(historyCount,_houseId,msg.sender,title,desc,cn,hd,_befImgHash,_aftImgHash));
    house[_houseId].totalHistoryCount++;
    historyCount++;
} 

function addHouseHistoryThroughAccept(uint _houseId,string memory title,string memory desc,string memory cn,uint256 hd,address newOwner) public {
  
    string memory t1="not available";
    history[_houseId].push(History(historyCount,_houseId,newOwner,title,desc,cn,hd,t1,t1));
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

function requestHouse(uint _houseId,uint256 hd)public {

    House storage _temHouse=house[_houseId];
    _temHouse.houseStatus=HouseStatus.Requested;
    _temHouse.RequestedUser=address(msg.sender);

    string memory houseName= _temHouse.name;

    OutgoingRequestMap[address(msg.sender)].push(OutgoingRequest(_houseId,houseName,0,hd));
    OutgoingRequestMapCount[address(msg.sender)]=OutgoingRequestMapCount[address(msg.sender)]+1;
}

function agreeHouse(uint _houseId ,address _newOwner,uint256 hd)public {

    House storage _temHouse=house[_houseId];
    _temHouse.houseStatus=HouseStatus.Available;
    _temHouse.RequestedUser=address(0x0);

    uint cnt=getHousesByOwnerCount[address(msg.sender)];
    cnt=cnt-1;
    getHousesByOwnerCount[address(msg.sender)]=cnt;

    cnt=getHousesByOwnerCount[_newOwner];
    cnt=cnt+1;
    getHousesByOwnerCount[_newOwner]=cnt;

    _temHouse.currentOwner=_newOwner;
    
    string memory desc="transfer takes place from previous owner to new owner";
    addHouseHistoryThroughAccept(_houseId,"Ownership Transfer",desc,"---",hd,_newOwner); 

    //outgoing request handler

    uint count=OutgoingRequestMapCount[address(_newOwner)];

    for(uint i=0;i<count;i++){

        OutgoingRequest storage outgoingstruct=OutgoingRequestMap[address(_newOwner)][i];
        if(outgoingstruct.houseId==_houseId && outgoingstruct.status==0){

            outgoingstruct.status=1;
            outgoingstruct.dateOfReq=hd;
        }
    }
    
    
}


function disAgreeHouse(uint _houseId,address _newOwner,uint256 hd)public {

    House storage _temHouse=house[_houseId];
    _temHouse.houseStatus=HouseStatus.Available;
    _temHouse.RequestedUser=address(0x0);

    //outgoing request handler
    uint count=OutgoingRequestMapCount[address(_newOwner)];

    for(uint i=0;i<count;i++){

        OutgoingRequest storage outgoingstruct=OutgoingRequestMap[address(_newOwner)][i];
        if(outgoingstruct.houseId==_houseId && outgoingstruct.status==0){

            outgoingstruct.status=2;
             outgoingstruct.dateOfReq=hd;
        }
    }

}

}



