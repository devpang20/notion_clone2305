import NewButton from "../../utils/NewButton.js";
import { pushUrl } from "../../utils/Router.js";
import { request } from "../../utils/api.js";
import PostList from "./PostList.js";


function PostPage({ $target }) {
    const $page = document.createElement("div")
    $page.className = 'documentDiv'
    
    const postList = new PostList({ 
        $target: $page,
        initialState: [],
        onAttach: async (id) => {
          await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
              title: '제목없음',
              parent: id
            })
          })

          this.setState()
        },
        onDelete: async (id) => {
          await request(`/documents/${id}`, {
            method: 'DELETE'
          })

          pushUrl('/')

          this.setState()
        }
     })

    new NewButton({
      $target: $page,
      initialState: {
        text: '+New page',
        link: 'new',
        name: 'addNew'
      }
    })


    this.setState = async () => {
      const posts = await request('/documents')
      postList.setState(posts)
      
      this.render()
    }

    this.render = async () => {
        $target.appendChild($page)
    }
}

export default PostPage;