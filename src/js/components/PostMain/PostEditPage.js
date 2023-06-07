import { request } from "../../utils/api.js";
import Editor from "./Editor.js";

function PostEditPage({$target, initialState}) {
    const $page = document.createElement("div")

    this.state = initialState

    const post = {
        title: '',
        content: ''
    }

    const editor = new Editor({
        $target: $page,
        initialState: post,
        onEditing: async (post) => {
            setTimeout(async () => {
                if (this.state.postId === 'new') {
                    const createdPost = await request('/documents', {
                        method: 'POST',
                        body: JSON.stringify(post)
                    })
        
                    if (post.content) {
                        await request(`/documents/${createdPost.id}`, {
                            method: 'PUT',
                            body: JSON.stringify(post)
                        })
                    }
                    history.replaceState(null, null, `/documents/${createdPost.id}`)
                    this.setState({
                        postId: createdPost.id
                    })
                } else {
                    await request(`/documents/${this.state.postId}`, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })
                }
            }, 500)
        }
    })

    this.setState = async (nextState) => {
        if (nextState === undefined) {
            return
        }
        if (this.state.postId !== nextState.postId) {
            this.state = nextState

            if (this.state.postId === 'new') {
                this.render()
                editor.setState(post)
            } else {
                await fetchPost()
            }
            return
        }
        
        this.state = nextState

        this.render()
        editor.setState(this.state.post || {
            title: '',
            content: ''
        })
    }
    

    this.render = () => {
        $target.appendChild($page)
    }


    const fetchPost = async () => {
        const { postId } = this.state

        if (postId !== 'new') {
            const post = await request(`/documents/${postId}`)
            console.log(post)
            this.setState({
                ...this.state,
                post
            })  
        }
    }
}

export default PostEditPage;