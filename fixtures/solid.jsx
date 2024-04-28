import { For } from 'solid-js'

/* eslint no-unused-vars: "off" */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _Component = props => (
  <ol>
    <For each={props.data}>
      {d => (
        <li>{d.text}</li>
      )}
    </For>
  </ol>
)
