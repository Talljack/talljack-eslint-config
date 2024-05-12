import { createSignal } from 'solid-js'
import { render } from 'solid-js/web'

/**
 *
 */
function Counter() {
  const [count, setCount] = createSignal(0)
  const doubleCount = () => count() * 2

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>
        {doubleCount()}
      </button>
    </>
  )
}

render(Counter, document.getElementById('app'))
