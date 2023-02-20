import WalletConnectProvider from "@walletconnect/web3-provider";

export let provider = new WalletConnectProvider({
  rpc: {
    1: "https://mainnet.infura.io/v3/9255e09afae94ffa9ea052ce163b8c90",
  },
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: ["rainbow", "metamask", "argent", "trust"],
  },
});

export const walletConnect = async () => {
  try {
    const account = await provider.enable();
    return account[0];
  } catch (error) {
    if (error?.message == "User closed modal") {
      localStorage.clear();
      await provider?.disconnect();
    }
  }
};

export const killWalletConnect = async () => {
  await provider?.disconnect();
};
