import { useEffect, useRef } from "react"

/**
 * react中异步回调中的state,是创建的那次渲染中看到的,不是最新的state
 * 这个hook使用useRef保存那个state,确保获取最新的state
 * @param state
 * @returns
 */
export function useStateRef(state: any) {
    const stateRef = useRef<any>()
    useEffect(() => {
      stateRef.current = state
      return () => {}
    }, [state])
    return stateRef
  }