// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./ERC721r.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RandomFoundersNFT is ERC721r, IERC721Receiver {

    using Counters for Counters.Counter;

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    Counters.Counter private _tokenIds;

    // Initializes the mapping of each address to the (token to the ipfsURL) entry
    mapping(uint => string) private ipfsURLMapping; 

    constructor(uint8 maxSupplyAmnt) ERC721r("Founders Pack", "FP", maxSupplyAmnt)
    {
       
    }

    function setupIPFSMappings(string[] memory addresses) public
    {
        for (uint i = 0; i < maxSupply(); i++)
        {
            ipfsURLMapping[i] = addresses[i];
        }
    }

    function randomMint(uint quantity, uint mintingCostInWei) public payable
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        // Check sender's balance
        //require(msg.sender.balance >= mintingCostInWei, "Insufficient balance to mint!");
        _mintRandom(msg.sender, quantity);
        _setTokenURI(newItemId, ipfsURLMapping[newItemId - 1]);
    }

    // Deposit an asset and start an auction
    function onERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    )
        public virtual override 
        returns(bytes4)
    {
        return this.onERC721Received.selector;
    }

    // For each URI for the address, return corresponding baseURI
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) virtual internal {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
       return "https://gateway.pinata.cloud/ipfs/";
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
        uint256 currentTokenId = 1;
        uint256 ownedTokenIndex = 0;

        while (ownedTokenIndex < ownerTokenCount && currentTokenId <= maxSupply()) {
            address currentTokenOwner = ownerOf(currentTokenId);

            if (currentTokenOwner == _owner) {
                ownedTokenIds[ownedTokenIndex] = currentTokenId;

                ownedTokenIndex++;
            }

            currentTokenId++;
        }

        return ownedTokenIds;
    }


}