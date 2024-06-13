
const Pagination = (props) => {
    
    let pages= []
    for(let i=1; i<=Math.ceil(props.totalPosts/props.postsPerPage); i++){
        pages.push(i)
    }
  return (
    <div className="bg-red-500 text-white p-4 text-center">
        {
            props.currentPage>1 && <button onClick={()=>props.prevPage()}>Prev</button>
        }
        
        <span>
            <span className="ml-3">Page {props.currentPage}</span>
            <span className="mr-3"> of {pages.length}</span>
        </span>
        {
            props.currentPage<pages.length && <button onClick={()=>props.nextPage()}>Next</button>
        }
        
        </div>
  )
}

export default Pagination