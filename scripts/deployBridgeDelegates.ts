import { Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    ArbitrumBridgeSender,
    ArbitrumBridgeSender__factory,
    BridgeDelegateReceiver,
    BridgeDelegateReceiver__factory,
    BridgeDelegateSender,
    GnosisBridgeSender,
    GnosisBridgeSender__factory,
    SidechainConfig,
    SimpleBridgeDelegateSender,
    SimpleBridgeDelegateSender__factory,
} from "../types";
import { deployContract } from "../tasks/utils";
import { CanonicalPhase1Deployed } from "./deploySidechain";

export interface SimplyBridgeDelegateDeployed {
    bridgeDelegateSender: BridgeDelegateSender;
    bridgeDelegateReceiver: BridgeDelegateReceiver;
}

export async function deploySimpleBridgeSender(
    hre: HardhatRuntimeEnvironment,
    config: SidechainConfig,
    deployer: Signer,
    debug: boolean = false,
    waitForBlocks: number = 0,
): Promise<{ bridgeDelegateSender: SimpleBridgeDelegateSender }> {
    const bridgeDelegateSender = await deployContract<SimpleBridgeDelegateSender>(
        hre,
        new SimpleBridgeDelegateSender__factory(deployer),
        "SimpleBridgeDelegateSender",
        [config.extConfig.token],
        {},
        debug,
        waitForBlocks,
    );

    return { bridgeDelegateSender };
}

export async function deploySimpleBridgeReceiver(
    hre: HardhatRuntimeEnvironment,
    canonical: CanonicalPhase1Deployed,
    srcChainId: number,
    deployer: Signer,
    debug: boolean = false,
    waitForBlocks: number = 0,
): Promise<{ bridgeDelegateReceiver: BridgeDelegateReceiver }> {
    const bridgeDelegateReceiver = await deployContract<BridgeDelegateReceiver>(
        hre,
        new BridgeDelegateReceiver__factory(deployer),
        "BridgeDelegateReceiver",
        [canonical.l1Coordinator.address, srcChainId],
        {},
        debug,
        waitForBlocks,
    );

    return { bridgeDelegateReceiver };
}

export async function deployGnosisBridgeSender(
    hre: HardhatRuntimeEnvironment,
    deployer: Signer,
    bridge: string,
    token: string,
    debug = false,
    waitForBlocks = 0,
): Promise<GnosisBridgeSender> {
    const bridgeDelegate = await deployContract<GnosisBridgeSender>(
        hre,
        new GnosisBridgeSender__factory(deployer),
        "GnosisBridgeSender",
        [bridge, token],
        {},
        debug,
        waitForBlocks,
    );
    return bridgeDelegate;
}

export async function deployArbitrumBridgeSender(
    hre: HardhatRuntimeEnvironment,
    deployer: Signer,
    gatewayRouter: string,
    token: string,
    l1Token: string,
    debug = false,
    waitForBlocks = 0,
): Promise<ArbitrumBridgeSender> {
    const bridgeDelegate = await deployContract<ArbitrumBridgeSender>(
        hre,
        new ArbitrumBridgeSender__factory(deployer),
        "ArbitrumBridgeSender",
        [gatewayRouter, token, l1Token],
        {},
        debug,
        waitForBlocks,
    );

    return bridgeDelegate;
}
