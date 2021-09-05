// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CLIPArt is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  uint256 public _maxNumberOfPieces;


  constructor(uint256 maxNumberOfPieces) ERC721("CLIPArt", "CLIP") {
    _maxNumberOfPieces = maxNumberOfPieces;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return "http://localhost:8080/test/";
  }

  function paint(string memory paintPrompt) public returns (uint256) {
    require(_tokenIds.current() < _maxNumberOfPieces, "All pieces have already been minted.");

    _tokenIds.increment();
    uint256 newId = _tokenIds.current();

    _mint(msg.sender, newId);

    // _setTokenURI(string(abi.encodePacked(av)))

    return newId;
  }

}