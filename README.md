# ReactWeb3App

The purpose of this Application is to understand and implement Wallet Generation, Airdrops, Node Providers and Transacting between wallets in SOLANA
## Description

This project is created using the React.js Library the following additional Libraries are used -
* ```react-router-dom```
* ```react-bootstrap```
* ```buffer```
* ```@solana/web3.js```

The application is a multi-paged application and the routing is done through ```<RouterProvider>``` Component.
The working order of the application is as follows:
1. ```Key generation and Airdrop```
The KeygenPage will display the result like this.


![1684927139623](https://github.com/Sidkjr/metacrafters-solana-challenge3/assets/40859683/409ffc43-c3da-4235-8bfd-5c376df2717b)


2. ```Connect to Phantom```
There are 3 situations that one can face here
  a. Phantom extension is not installed.
  
  
  ![image](https://github.com/Sidkjr/metacrafters-solana-challenge3/assets/40859683/239e72bb-37f9-45b9-9118-56edca1b095c)



  b. Phantom is installed but wallet is not connected.
  
  
  ![1684927140029](https://github.com/Sidkjr/metacrafters-solana-challenge3/assets/40859683/26a03696-cbad-4aa5-ab63-80b655593ee6)



  c. Pantom wallet is successfully connected to the application.
  
  
  ![1684927138505](https://github.com/Sidkjr/metacrafters-solana-challenge3/assets/40859683/01fedec3-cdbe-4c5f-af95-69b909a32c5b)



3. ```Send SOL to Phantom```
If you followed the instructions and the order of working properly, You will see this reciept.

![image](https://github.com/Sidkjr/metacrafters-solana-challenge3/assets/40859683/84ad120d-394f-4892-b4f1-2a995e5d469e)

And in the console, The transaction id will be printed out.

![image](https://github.com/Sidkjr/metacrafters-solana-challenge3/assets/40859683/94ccd0cc-d206-469d-bc32-d57be5381acd)

You can later verify the Signature on the Solana Explorer Page. Like this.

![1684927139504](https://github.com/Sidkjr/metacrafters-solana-challenge3/assets/40859683/5fef7e4d-9cd3-40d8-b107-ea831717d81a)



## Getting Started

### Installing

* ```git clone``` this repo into a folder of your choice.
* Go into the root folder of the project - ```metacrafters-solana-challenge3```
* All done!

### Executing program

* Make sure that you are in the root diretory of the project
* Into the terminal, enter:
```
npm start
```
* Your react application will be opened in another browser window

## Authors

Contributors names and contact info

Siddhant Khare  
(https://www.linkedin.com/in/siddhant-khare-13938920a/)
