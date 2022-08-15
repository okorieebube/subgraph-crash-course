// mapping.ts
/*
Build completed: QmTwjfjs97ZPYrMXLZNhKEMS2f5TSyGBMTWA768YDanUbg

Deployed to https://thegraph.com/studio/subgraph/subgraph-crash-course

Subgraph endpoints:
Queries (HTTP):     https://api.studio.thegraph.com/query/32095/subgraph-crash-course/0.1
*/

import { BigInt } from "@graphprotocol/graph-ts";
import {
  Zora,
  TokenMetadataURIUpdated,
  TokenURIUpdated,
  Transfer,
} from "../generated/Zora/Zora";
import { Token, User } from "../generated/schema";

export function handleTokenMetadataURIUpdated(
  event: TokenMetadataURIUpdated
): void {
  let token = Token.load(event.params._tokenId.toString());
  if (!token) return;
  token.contentURI = event.params._uri;
  token.save;
}

export function handleTokenURIUpdated(event: TokenURIUpdated): void {
  let token = Token.load(event.params._tokenId.toString());
  if (!token) return;
  token.contentURI = event.params._uri;
  token.save;
}

export function handleTransfer(event: Transfer): void {
  let token = Token.load(event.params.tokenId.toString());
  if (!token) {
    token = new Token(event.params.tokenId.toString());
    token.creator = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;
    token.createdAtTimestamp = event.block.timestamp;

    let tokenContract = Zora.bind(event.address);
    token.contentURI = tokenContract.tokenURI(event.params.tokenId);
    token.metadataURI = tokenContract.tokenMetadataURI(event.params.tokenId);
  }
  token.owner = event.params.to.toHexString();
  token.save()

  let user = User.load(event.params.to.toHexString());
  if(!user){
    user = new User(event.params.to.toHexString());
    user.save()
  }


}
