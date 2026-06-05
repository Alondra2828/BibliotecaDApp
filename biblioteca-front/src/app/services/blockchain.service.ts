import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

import { ABI } from '../abi/biblioteca';

declare global {
  interface Window {
    ethereum: any;
  }
}


@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  provider:any;
  signer:any;
  contract:any;

  CONTRACT_ADDRESS =
  '0xea8411802A1Dae906f903D0338CCd6d8FE54a9e1';

  constructor(){}

async conectarWallet() {

  await window.ethereum.request({
    method: 'eth_requestAccounts'
  });

  this.provider =
    new ethers.BrowserProvider(
      window.ethereum
    );

  const network =
    await this.provider.getNetwork();

  if(
    Number(network.chainId)
    !== 11155111
  ){

    await window.ethereum.request({

      method:
        'wallet_switchEthereumChain',

      params: [
        {
          chainId: '0xaa36a7'
        }
      ]

    });

    this.provider =
      new ethers.BrowserProvider(
        window.ethereum
      );

  }

  this.signer =
    await this.provider.getSigner();

  this.contract =
    new ethers.Contract(

      this.CONTRACT_ADDRESS,

      ABI,

      this.signer

    );

  alert(
    'Conectado a Sepolia'
  );

}
  async obtenerDireccion() {

    return await this.signer.getAddress();

  }

async agregarLibro(
  isbn:string,
  titulo:string,
  autor:string
) {

  const tx =
    await this.contract.agregarLibro(
      isbn,
      titulo,
      autor
    );

  await tx.wait();

}

async obtenerLibro(
  id:number
){

  return await
    this.contract.consultarLibro(id);

}

async prestarLibro(
  id:number,
  estudiante:string
){

  const tx =
    await this.contract.prestarLibro(
      id,
      estudiante
    );

  await tx.wait();

}

async devolverLibro(
  id:number
){

  const tx =
    await this.contract.devolverLibro(
      id
    );

  await tx.wait();

}

async consultarLibro(
  id:number
){

  return await this.contract
    .consultarLibro(id);

}

async obtenerTotalLibros(){

  const total =
    await this.contract
      .totalLibros();

  console.log(
    'TOTAL:',
    total
  );

  return Number(total);

}

async obtenerEventosPrestamos() {

  const eventosPrestado =
    await this.contract.queryFilter(
      this.contract.filters.LibroPrestado()
    );

  const eventosDevuelto =
    await this.contract.queryFilter(
      this.contract.filters.LibroDevuelto()
    );

  return {

    prestados:
      eventosPrestado,

    devueltos:
      eventosDevuelto

  };

}

}