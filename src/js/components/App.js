import { initRouter } from "../utils/Router.js";
import PostEditPage from "./PostMain/PostEditPage.js";
import PostPage from "./SideBar/PostPage.js";

function App({ $target }) {
    const $listContainer = document.createElement('div')
    $listContainer.className = 'listContainer'
    const $rendingContainer = document.createElement('div')
    $rendingContainer.className = 'rendingContainer'
    $target.appendChild($listContainer)
    $target.appendChild($rendingContainer)
  
 
    const postPage = new PostPage({
        $target: $listContainer
    })

    const postEditPage = new PostEditPage({ 
        $target: $rendingContainer,
        initialState: {
            postId: 'new',
            post: {
                title: '',
                content: ''
            }
        }
     })
     
    this.route = () => {
        const { pathname } = window.location
        if (pathname.indexOf('/documents/') === 0) {
            const [, , postId] = pathname.split('/')
            postEditPage.setState({ postId })
        }

        // 위치를 파악해서 api 연동 던져주기
        postPage.setState()
    }

    this.route()

    initRouter(() => this.route())

}
 
export default App;