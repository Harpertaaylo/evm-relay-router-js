const Web3 = require('web3');

const endpoints = [
	'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
	'https://rpc.flashbots.net',
	'https://eth.llamarpc.com'
];

async function sendTx(rawTx) {
	for (const url of endpoints) {
		try {
			const web3 = new Web3(new Web3.providers.HttpProvider(url));
			const receipt = await web3.eth.sendSignedTransaction(rawTx);
			console.log(`✅ Sent via ${url}:`, receipt.transactionHash);
			return receipt;
		} catch (err) {
			console.warn(`⚠️ Failed on ${url}, trying next...`);
		}
	}
	throw new Error("❌ All endpoints failed");
}

// Example usage
(async () => {
	const rawTx = '0x...'; // signed tx
	await sendTx(rawTx);
})();
