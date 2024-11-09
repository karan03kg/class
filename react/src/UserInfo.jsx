const UserInfo = ({name,email,password,imageUrl})=>{
    return <div className="user">
        <img src={imageUrl} alt="pic" />
        <h1>{name}</h1>
        <h2>{email}</h2>
        <h3>{password}</h3>
    </div>
}

export default UserInfo;