// Copyright 2017 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ----------------------------------------------------------------------------
// test/SimpleStake_utils.js
//
// http://www.simpletoken.org/
//
// ----------------------------------------------------------------------------

const Assert = require('assert');

var SimpleToken = artifacts.require("./SimpleToken/SimpleToken.sol");
var SimpleStake = artifacts.require("./SimpleStake.sol");

/// @dev Deploy 
module.exports.deploySingleSimpleStake = async (artifacts, accounts, protocol, UUID) => {

	const token = await SimpleToken.new({ from: accounts[0], gas: 3500000 });
	// Set Simple Token admin to account[1]
	await token.setAdminAddress(accounts[1]);
	// and finalize Simple Token
	Assert.ok(await token.finalize({ from: accounts[1] }));

	const simpleStake = await SimpleStake.new(token.address, protocol, UUID, { from: accounts[0] });

	return {
		token       : token,
		simpleStake : simpleStake
	};
};