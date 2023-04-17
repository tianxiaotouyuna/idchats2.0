import { useCallback } from 'react'
import { TransactionResponse } from '@ethersproject/providers'
import { Contract, CallOverrides } from '@ethersproject/contracts'
import get from 'lodash/get'
export function useCallWithMarketGasPrice() {
  /**
   * Perform a contract call with a gas price returned from useGasPrice
   * @param contract Used to perform the call
   * @param methodName The name of the method called
   * @param methodArgs An array of arguments to pass to the method
   * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
   * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
   */
  const callWithMarketGasPrice = useCallback(
    async (
      contract: Contract,
      methodName: string,
      methodArgs: any[] = [],
      // @ts-ignore
      overrides: CallOverrides = null,
    ): Promise<TransactionResponse> => {
      const contractMethod = get(contract, methodName)
      const tx = await contractMethod(...methodArgs, { ...overrides })
      return tx
    },
    [],
  )

  return { callWithMarketGasPrice }
}
