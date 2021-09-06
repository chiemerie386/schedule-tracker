import PropTypes from 'prop-types'
import Button from'./Button'
import { useLocation } from 'react-router'

const Header  = ({body,onAdd , showAddTask}) => {
  const loct = useLocation()
    return (
        <header className = 'header'>
            <h1>{body}</h1>
            {loct.pathname === '/' && <Button color= {showAddTask ? "red" : "green"} text = {showAddTask ? "Close" : "Add"} onClick = {onAdd}/>}
            
        </header>
    )
}

Header.defaultProps ={
    body : "funnyf",
    title : "lets see"
}

Header.propTypes = {
    body: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color : 'red', 
//     backgroundColor:'blue'
// }
export default Header
 