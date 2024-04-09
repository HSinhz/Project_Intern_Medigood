import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Nav.scss'
import { useEffect, useState} from 'react';

const NavWeb = () => {
    const [account, setAccount] = useState();

    useState( () => {
        let session = sessionStorage.getItem("account");
        if(session){
            setAccount(JSON.parse(session));
        }
    } , []) // [] chỉ chạy một   lần
    return (
        <>
      <header className="fixed z-50 top-0 left-0 bg-white w-full h-20 p-0 m-0 border-b-2 border-gray-100 ">
        <div className='flex flex-row  justify-center items-center h-full max-sm:justify-between max-sm:px-1'>
          <div className="md:w-2/12">
            <div className="w-full flex flex-row justify-center items-center">
              <div className="">
                    <img src='https://e1.pngegg.com/pngimages/385/607/png-clipart-tableau-sur-toile-bleu-livraison-logo-fret-transport-de-marchandises-livraison-de-colis-enveloppement-de-galerie-texte-thumbnail.png'/> 
              </div>
              <div className="w-8/12">
                <h1 className="text-lg font-bold text-primary-1-color hover:cursor-pointer max-sm:text-sm">
                  Quản lý giao hàng
                </h1>
              </div>
            </div>
          </div>
          <nav className="w-6/12 max-md:hidden flex flex-row h-full">
            
          </nav>
          <div className="sm:w-4/12">
            <div className="w-full flex flex-row justify-between items-center p-4">
              <div className="sm:w-2/5 flex flex-row justify-center items-center hover:cursor-pointer ten chu shop">
                
              </div>
              
              <div
                className="w-2/5 hover:cursor-pointer flex flex-row justify-center items-center max-sm:hidden"
               
              >
                <p>Logout</p>
              </div>
             
            </div>
          </div>
        </div>
        <div className="block sm:hidden">
          {/* <SideBar open={sidebarOpen} onClose={handleSideBar} /> */}
        </div>
      </header>
    </>
        
    );
}

export default NavWeb;