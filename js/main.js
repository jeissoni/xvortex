//const Web3 = require('web3');

//import Web3 from '../js/dist/web3.min.js';
//import { Web3 } from '../js/dist/web3.min.js';
let web3;
let from;
const dvContent = document.getElementById('dvContent');
//console.log(add);


const btnInvertir = document.getElementById('nvInvestment');
const itemAbautUs = document.getElementById('nvAbautUs');
const itemBlog = document.getElementById('nvBlog');
const itemClass = document.getElementById('nvClass');
const itemContac = document.getElementById('nvContac');
const nvBar = document.getElementById('nvbar');
const itemHome = document.getElementById('nvHome');
const aHome = document.getElementById('aHome');



// const address = '0x2e2b0001A14Aa207dBC09861476b58c60E003896';
const address = '0x58feD4C4607f1313c3E7e2b08D57d2c91Ef3E9A8';
//import * as data from '../contract/contract.json';

//var web3 = new Web3(Web3.givenProvider);

var ventaAbi;
fetch("contract/contract.json")
.then(response => {
   return response.json();
})
.then(data => ventaAbi = data);



async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}


function fnUrlAsJson(urlJson){
  const response = fetch(urlJson);
  return response.json();
}

//const ventaAbi = fnUrlAsJson(urlJson);

/*
window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
      console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
      window.web3 = new Web3(web3.currentProvider);
  }
})
*/


async function isOpen() {
  try {
    web3 = new Web3(window.ethereum);
    const contractVenta = new web3.eth.Contract(ventaAbi, address);
    const isOpen = await contractVenta.methods.isOpen().call();
    return isOpen;
  } catch (error) {
    return false;
  }

}

async function rate() {
  let open = await isOpen();
  if (open) {
    try {
      web3 = new Web3(window.ethereum);
      const contractVenta = new web3.eth.Contract(ventaAbi, address);
      const isOpen = await contractVenta.methods.isOpen().call();
      return isOpen;
    } catch (error) {}
  }else{
    return 0;
  }
}

async function initialDate (){
  let open = await isOpen();
  //if (open) {
    try {
      web3 = new Web3(window.ethereum);
      const contractVenta = new web3.eth.Contract(ventaAbi, address);
      const initialDate = await contractVenta.methods.openingTime().call();
      var d = new Date(0);
      d.setUTCSeconds(initialDate);
      console.log(d);
      return d;
    } catch (error) {
      return 0;
    }
  //}
}



async function buyTokens(){
  let open = await isOpen();
  //if (open) {}
  try {
      web3 = new Web3(window.ethereum);
      const contractVenta = new web3.eth.Contract(ventaAbi, address);

      const inpEth = document.getElementById('iptEth').value;

      const ethToWei = web3.utils.toWei(inpEth ,"ether");

      console.log(ethToWei);     


      contractVenta.methods.buyTokens(from).send({ from: from, value : ethToWei}, function(error, transactionHash){
        const lblHast = document.getElementById('lblHast');
        const lblError = document.getElementById('lblError');

        lblHast.innerHTML = 'Hast: '+transactionHash;
        lblError.innerHTML = 'Error! :' + error;
      });
      
  } catch (error) {
    console.log(error);
  }
}



async function fnAbautUs (){  
  const url = 'html/aboutUs.html'; 
  dvContent.innerHTML = await fetchHtmlAsText(url);
  nvBar.className = 'navbar navbar-expand-lg navbar-dark fondo-verde pt-lg-3 pt-2 aos-init aos-animate';
  
}


async function fnBlog (){
  const url = 'html/blog.html';
  dvContent.innerHTML = await fetchHtmlAsText(url);
  nvBar.className = 'navbar navbar-expand-lg navbar-dark fondo-azul pt-lg-3 pt-2 aos-init aos-animate';
}


async function fnClass(){
  const url = 'html/class.html';
  dvContent.innerHTML = await fetchHtmlAsText(url);
  nvBar.className = 'navbar navbar-expand-lg navbar-dark fondo-rosa pt-lg-3 pt-2 aos-init aos-animate';
}


async function fnContact(){
  const url = 'html/contact.html';
  dvContent.innerHTML = await fetchHtmlAsText(url);
  nvBar.className = 'navbar navbar-expand-lg navbar-dark fondo-morado pt-lg-3 pt-2 aos-init aos-animate';
}


async function fnHome(){
  window.location.href = 'index.html';
}


async function fnInvestment(event){

    web3 = new Web3(window.ethereum);
    //console.log(web3);
    // const dvContent = document.getElementById('dvContent');

    
    const url = 'html/investment.html'; 
    dvContent.innerHTML = await fetchHtmlAsText(url);   
    nvBar.className = 'navbar navbar-expand-lg navbar-dark fondo-naranja pt-lg-3 pt-2 aos-init aos-animate';


    const btnConect = document.getElementById("btnConect");
    // const btnOpening = document.getElementById('btnOpening');
    const btnSend =  document.getElementById('btnSend');
    

    btnConect.onclick = conect;    
    // btnOpening.onclick = initialDate;
    btnSend.onclick = buyTokens;
}


async function conect() {
  if (window.ethereum) {
    let open = await isOpen();
    //if (open) {
      web3 = new Web3(window.ethereum);
      
      try {
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        // const labelCount = document.getElementById('lblcount');
        const iptConect = document.getElementById('iptConect');
        const accounts = await web3.eth.getAccounts();

        from = accounts[0];
        iptConect.value = from;
        const btnSend =  document.getElementById('btnSend');
        const iptEth = document.getElementById('iptEth');
        btnSend.disabled = false;
        iptEth.disabled = false;

        btnSend.className = 'btn btn-outline-primary btn-block';
        // labelCount.innerText = 'Cuenta conectada: '+ from;
      } catch (err) {
        console.log(err);
        alert('Usted Rechazo la conexión');
      }
/*
    } else {
      alert("Is close ICO")
    }
*/
  } else {
    alert('Web3 es Requerido');
  }
};


btnInvertir.onclick = fnInvestment;
itemAbautUs.onclick = fnAbautUs;
itemBlog.onclick = fnBlog;
itemClass.onclick = fnClass;
itemContac.onclick = fnContact;
itemHome.onclick = fnHome;
aHome.onclick = fnHome;