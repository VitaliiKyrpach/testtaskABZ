export const Button = ({children, anchor,type, action, disable}) => {
    if(type == 'link') {
        return <a className="button" href={`#${anchor}`}>{children}</a>
    }
    if(type == 'pagination'){
        return <button className="button" type="button" onClick={action}>{children}</button>
    }
    if (type == 'submit') {
        return <button className="button" disabled={disable} type="submit" onClick={action}>{children}</button>
    }
}