### steps to run the code on local machine with Ganache !

 1) pull the code in specific folder(ex:selfConsciousHouse) <br>
 2) run npm install to install dependencies  <br> 
 &nbsp;&nbsp;2-a) run npm install react-scripts@2.1.8 --save  <br>
 &nbsp;&nbsp;2-b) add node modules folder to .gitignore file <br>
 3) open local blockchian i.e ganache (will provide u 10 accounts )  <br>
 4) run command "truffle compile" in selfConsciousHouse folder  <br>
 5) run  command "truffle migrate --reset" in same folder  <br>
 6) run npm start (start development server)  <br>
 7) web page will show metamask popup   <br>
 8) click on import account through seed phrase  <br>
 9) paste  12 words seed phrase from ganache to metamask  <br>
 10) set password  <br>
 11) you are all set to go !   <br>
 
 <b> Note :</b>  You need to run step 4,5,8,9 every time you restart of open new instance of Ganache <br>

### steps to run the code on on Ropsten test network!

 1) pull the code in specific folder(ex:selfConsciousHouse) <br>
 2) run npm install to install dependencies  <br>
 &nbsp;&nbsp;2-a)  run npm install react-scripts@2.1.8 --save <br>
 3) run command truffle compile in selfConsciousHouse folder  <br> 
 4) customizing Metamask and Infura> <br>
 &nbsp;&nbsp;4-a) Register on Infura.io website, create project & copy project ID. <br>
 &nbsp;&nbsp;4-b) Download metamask extension for browser ,Register on it.set password  and save the 12 word phrase somewhere. <br>
 &nbsp;&nbsp;4-c) Create s secret.json file  whose structure is -  {  <br>
    &nbsp;&nbsp;&nbsp;&nbsp; "mnemonic": "12 word phrase",      <br>
    &nbsp;&nbsp;&nbsp;&nbsp;  "projectId": "e98bfc46....."    <br>
    &nbsp;&nbsp;&nbsp;&nbsp; }  <br>
5) add secret.json file & node modules folder to .gitignore file <br>
6) run command "truffle migrate --reset --network ropsten" in same folder (it will take some time) <br>
7) run npm start (start development server)  <br>
8) web page will show metamask popup , enter the password which you have set at the start <br>
9) you are all set to go !   <br>

 <b> Note :</b> step 3,5,6 & all section of 4  are on time step.  Do not repeat every time you start the website<br>
