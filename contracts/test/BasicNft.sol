// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error ERC721Metadata__URI_QueryFor_NonExistentToken();

contract BasicNft is ERC721 {


    string public constant TOKEN_URI = "ipfs://bafyreiawa5q6idc7sd7pfwjkplagxtpun6ot25yked2iboagcktw75y72y/metadata.json";
    uint256 private s_tokenCounter;

    event DogMinted(uint256 indexed tokenId);

    constructor() ERC721("Dogie", "DOG") { 
        s_tokenCounter = 0;
    }

    function mintNft() public {
        _safeMint(
            msg.sender, 
            s_tokenCounter 
        );
        emit DogMinted(s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function tokenURI(
        uint256 tokenId
        ) public view override returns (string memory) {
            
        if (_ownerOf(tokenId) == address(0)) { 
            revert ERC721Metadata__URI_QueryFor_NonExistentToken();
            }
    
        return TOKEN_URI;
    }           

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}


