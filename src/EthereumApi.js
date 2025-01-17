const TatumApi = require("./TatumApi.js");
class EthereumApi extends TatumApi {


    constructor() {
        super();
    }
    async getTransactions(address) {
        if (!address) {
            throw new Error('Ethereum address is required');
        }

        const endpoint = `/ethereum/account/transaction/${address}`;
        const params = {'pageSize': this.pageSize, 'offset': this.offset }
        return this.makeRequest(endpoint, 'GET', null, params);
    }

    async getAccountBalance(address) {
        if (!address) {
            throw new Error('Ethereum address is required');
        }

        const endpoint = `/ethereum/account/balance/${address}`;
        return this.makeRequest(endpoint);
    }

    async getTokenBalance(tokenAddress, walletAddress){

        const data = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [
                {
                    to: tokenAddress,
                    data: `0x70a08231000000000000000000000000${walletAddress.replace('0x', '')}`,
                },
                'latest',
            ],
            id: 1,
        };
        const endpoint = `/blockchain/node/ethereum-mainnet/`;

        return this.makeRequest(endpoint, 'POST', data);
    }
}

module.exports = EthereumApi;


