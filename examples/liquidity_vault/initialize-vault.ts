import { Keypair } from "@solana/web3.js";
import { vault_program } from "../constants";
import { initLiquidityVaultClient } from "../utils";
import { createMint } from "../../src/index";

const main = async () => {
  // Initialize the vault client with transaction callback
  const vaultClient = initLiquidityVaultClient(
    "../../test-keypairs/alice/key.json"
  );

  const tokenMint = Keypair.generate();

  await createMint(vaultClient.provider, tokenMint, 6);

  // Create vault for the token
  await vaultClient
    .createVault(tokenMint.publicKey, vault_program)
    .then(() => console.log("Token vault created successfully"));
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
