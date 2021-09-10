// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CLIPArt is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  uint256 public _maxNumberOfPieces;
  uint8 public _maxNumberOfPiecesPerAddress;


  constructor(uint256 maxNumberOfPieces, uint8 maxNumberOfPiecesPerAddress) ERC721("CLIPArt", "CLIP") {
    _maxNumberOfPieces = maxNumberOfPieces;
    _maxNumberOfPiecesPerAddress = maxNumberOfPiecesPerAddress;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return "http://localhost:8080/test/";
  }

  function paint(/*string memory paintPrompt*/) public payable returns (uint256) {
    require(_tokenIds.current() < _maxNumberOfPieces, "All pieces have already been minted.");
    require(balanceOf(msg.sender) < _maxNumberOfPiecesPerAddress, "You have already minted the max number of pieces per address.");
    require(msg.value >= 0.1 ether, "You did not send enough ether to interest the painter. Please send at least 0.1 ether.");

    _tokenIds.increment();
    uint256 newId = _tokenIds.current();

    _mint(msg.sender, newId);

    // _setTokenURI(string(abi.encodePacked(av)))

    return newId;
  }

}