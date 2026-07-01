import { useSelector } from "react-redux";
import "./css/header.css";
import musicLogo from "../../IMG/Icon music.png";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleLogout = () => {
    //dispatch(logout());
    window.location.href = "/";
  };

  const handleclick = () => {
    navigate("/");
  };
  return (
    <header className="header">
      {/* Logo */}
      <div onClick={handleclick} className="logoout">
        <img src={musicLogo} />
        <h1 className="logo">MOODsync</h1>
      </div>
      {/* Navigation 
      <nav className="nav-links">
        {/* <a href="/">Home</a>
        <a href="/playlists">Playlists</a>
        <a href="/about">About</a> 
      </nav>
      */}

      {/* User Profile & Logout */}
      {/* {user ? ( */}
      <div className="user-info">
        {console.log("star", user?.photoURL)}
        <img
          //  src={user?.images?.[0]?.url}
          src={user?.photoURL || "https://picsum.photos/200/300"}
          alt="Profile"
          onError={(e) => (e.target.src = "https://picsum.photos/200/300")}
          className="profile-img"
        />
        {/* //<span>{user?.display_name}</span> */}

        <IoExitOutline size={30} className="exit-icon" onClick={handleLogout} />
      </div>
      {/* ) : (
        <a href="/login" className="login-btn">
          Login
        </a>
      )} */}
    </header>
  );
};

export default Index;
