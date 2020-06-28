import { ethers } from "ethers";
import EthereumTx from "ethereumjs-tx";
import util from "ethjs-util";
import CryptoJS from "crypto-js";

const generateEOA = () => {
  let wallet = ethers.Wallet.createRandom();
  let randomMnemonic = wallet.mnemonic;
  let walletPath = {
    standard: `m/44'/60'/0'/0/0`,
  };
  let hdnode = ethers.utils.HDNode.fromMnemonic(randomMnemonic.phrase);
  return hdnode.derivePath(walletPath.standard);
  // const { address, publicKey, privateKey, mnemonic } = node;
};

const getClientPassphrase = (userID: string) => {
  // FOR DEVELOPMENT
  return "my_password_hash";

  // FOR PRODUCTION
  // return localStorage.getItem(`@eDoc-phrase-${userID}`) || "";
};

///// sign transaction ////////
const getSignedTx = (rawTx: any, privateKey: string) => {
  const tx = new EthereumTx(rawTx, { chain: 4 });

  const stripedPrivateKey = util.stripHexPrefix(privateKey);
  const privateKeySign = Buffer.from(stripedPrivateKey, "hex");

  tx.sign(privateKeySign);

  const serializedTx = tx.serialize();
  const signedTxToSend = "0x" + serializedTx.toString("hex");

  return signedTxToSend;
};

///////////// encrypt & decrypt EOA ////////

const symEncrypt = (rawString: string, secret: string) => {
  return CryptoJS.AES.encrypt(rawString, secret).toString();
};

const symDecrypt = (ciphertext: string, secret: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export {
  getClientPassphrase,
  getSignedTx,
  symEncrypt,
  symDecrypt,
  generateEOA,
};
