import { pushUrl } from "./Router.js"

export default function NewButton({ $target, initialState }) {
    const $newButton = document.createElement("button")
    $target.appendChild($newButton)

    this.state = initialState

    this.render = () => {
       const { text, name } = this.state

       $newButton.textContent = text
       if (name) {
        $newButton.className = name
       }

    }
    this.render()

    $newButton.addEventListener('click', () => {
      const { link }  = this.state
      pushUrl(`/documents/${link}`)
    })

}