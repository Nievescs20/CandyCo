import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Navbar = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => {
    return !!state.auth.id;
  });

  const user = useSelector((state) => {
    return state.auth;
  });

  const location = useLocation();

  console.log("location", location);

  return (
    // <div id="navbar">
    //   <nav>
    //     <div>
    //       <Link to="/home">
    //         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
    //           Home
    //         </button>
    //       </Link>
    //     </div>
    //     {isLoggedIn ? (
    //       <div>
    //         {state.role === "admin" ? (
    //           <div className="flex justify-center">
    //             <div className="text-orange-500 font-bold text-2xl self-center">
    //               DBZ Commerce
    //             </div>
    //             <div className="dropdown">
    //               <button>{state.username}</button>
    //               <div className="dropdown-content">
    //                 <div onClick={() => dispatch(logout())}>Logout</div>
    //               </div>
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="flex justify-center">
    //             <div className="text-orange-500 font-bold text-2xl self-center">
    //               DBZ Commerce
    //             </div>
    //             <div className="dropdown">
    //               <div className="dropdown-content">
    //                 {/* <button onClick={() => dispatch(logout())}>Logout</button> */}
    //                 <Link to="/login">
    //                   <button
    //                     onClick={() => dispatch(logout())}
    //                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
    //                   >
    //                     Logout
    //                   </button>
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     ) : (
    //       <div>
    //         <div className="flex justify-center">
    //           <div className="text-orange-500 font-bold text-2xl">
    //             DBZ Commerce
    //           </div>
    //         </div>
    //         <div className="flex justify-end mx-5">
    //           {location.pathname !== "/login" ? (
    //             <div className="">
    //               <Link to="/login">
    //                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
    //                   Login
    //                 </button>
    //               </Link>
    //             </div>
    //           ) : (
    //             <div className="">
    //               <Link to="/home">
    //                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
    //                   Home
    //                 </button>
    //               </Link>
    //             </div>
    //           )}
    //         </div>
    //         <div className="flex justify-end mx-5"></div>
    //       </div>
    //     )}
    //   </nav>
    //   <hr />
    // </div>
    <nav className="flex items-center justify-between flex-wrap bg-orange-400 p-6">
      <Link to="/home">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img
            style={{ height: "70px", width: "70px", marginRight: "20px" }}
            src="https://www.icons101.com/icon_ico/id_80140/Dragon_Ball_Z_alt.ico"
            alt="dragon-ball-shenron"
          />

          <span className="font-semibold text-2xl tracking-tight">
            DBZ Commerce
          </span>
        </div>
      </Link>
      {isLoggedIn ? (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/products">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                Products
              </div>
            </Link>
            {user.role === "admin" ? (
              <>
                <Link to="userprofiles">
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                    User Profiles
                  </div>
                </Link>
                <Link to="cart">
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                    Test Cart
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="profile">
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                    Profile
                  </div>
                </Link>
                <Link to="cart">
                  <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                    Cart
                  </div>
                </Link>
              </>
            )}
          </div>
          <div>
            <div
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-400 hover:bg-white mt-4 lg:mt-0"
              onClick={() => dispatch(logout())}
            >
              Logout
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/products">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                Products
              </div>
            </Link>
            <Link to="cart">
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-8">
                Cart
              </div>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-400 hover:bg-white mt-4 lg:mt-0">
                Login
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
