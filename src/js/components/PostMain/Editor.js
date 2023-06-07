function Editor({ 
    $target, 
    initialState,
    onEditing
}) {
   const $editor = document.createElement("div")
   $editor.className = 'editorDiv'
   $target.appendChild($editor)

   let isInitialized = false
   this.state = initialState

   this.setState = (nextState) => {
    this.state = nextState
    $editor.querySelector('[name=title]').value = this.state.title
    $editor.querySelector('[name=content]').value = this.state.content
    this.render()
   }

   this.render = () => {
        if (!isInitialized) {
            $editor.innerHTML = `
            <input type="text" name ="title" class="editorTitle" value="${this.state.title}" placeholder="제목 없음"  autofocous/>
            <textarea name="content" class="editorContent" placeholder="내용을 입력하세요" autofocous>${this.state.content} </textarea>
        `
        isInitialized = true
      }
   }

   this.render()

   $editor.addEventListener('keyup', (e) => {
        const { target } = e
        const { title } = this.state
        const name = target.getAttribute('name')


        const nextState = {
            ...this.state,
            [name]: target.value
        }
        this.setState(nextState)
        onEditing(this.state)
   })
   

}

export default Editor;