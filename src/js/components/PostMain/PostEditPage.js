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
            if (this.state.postId === 'new') {
                const createdPost = await request('documents', {
                    method: 'POST',
                    body: JSON.stringify(post)
                })
    
                if (post.content) {
                    await request(`documents/${createdPost.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })
                }
            } else {
                await request(`documents/${post.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(post)
                })
            }



        }
    })

    this.setState = async (nextState) => {
        if (nextState === undefined) {
            return
        }

        //현재  post id 와 클릭된 id가 다르면 api를 통해서 데이터 바다오는 로직
        if (this.state.postId !== nextState.postId) {

            this.state = nextState

            if (this.state.postId === 'new') {
                this.render()
                editor.setState({title: '', content: ''})
            } else {
                await fetchPost()
            }
            return
        }
    }
    

    this.render = () => {
        $target.appendChild($page)
    }


    const fetchPost = async () => {
        const { postId } = this.state

        if (postId !== 'new') {
            const post = await request(`/documents/${postId}`)
        }

        this.setState({
            ...this.state,
            post
        })
    }
}

export default PostEditPage;