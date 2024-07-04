from web3 import Web3

# Connect to an Ethereum node (Infura in this case)
ALCHEMY_API_KEY = 'YZfmMo3qV3PLNl4okf78ic3HV2gr2Bvd'
alchemy_url = f'https://eth-mainnet.alchemyapi.io/v2/{ALCHEMY_API_KEY}'
web3 = Web3(Web3.HTTPProvider(alchemy_url))
# Check if the connection is successful
if web3.is_connected():
    print("Connected to Ethereum network")
else:
    print("Failed to connect to Ethereum network")