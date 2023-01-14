// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ImageAsset {
    struct Image {
        address owneer;
        string caption;
        string imageUrl;
    }

    mapping(uint256 => Image) public images;
    uint256 public numberOfImages;

    // returns the idx of image uploaded
    function createImageAsset(address _owner, string memory _caption, string memory _imageUrl) public returns (uint256) {
        Image storage image = images[numberOfImages];
        image.owneer = _owner; // Typo Orz...
        image.caption = _caption;
        image.imageUrl = _imageUrl;
        numberOfImages++;
        return numberOfImages - 1;
    }

    // returns all images
    function getImageAssets() public view returns (Image[] memory){
        Image[] memory allImages = new Image[](numberOfImages);
        for (uint i = 0; i < numberOfImages; i++) {
            Image storage item = images[i];
            allImages[i] = item;
        }
        return allImages;
    }
}