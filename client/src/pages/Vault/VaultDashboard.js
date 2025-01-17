import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './VaultDashboard.scss';
import Navbar from "../../components/Navbar/Navbar";
import { Progress } from 'antd';
import FolderCreate from '../../components/Vault/FolderCreate/FolderCreate';
import { getFolders } from '../../services/AuthService';

import FileList from '../../components/Vault/FileList/FileList'
import FolderList from '../../components/Vault/FolderList/FolderList'

const VaultDashboard = () => {

  const { folderId } = useParams();
  const [currentFolder, setCurrentFolder] = useState( folderId || null );

  useEffect(() => setCurrentFolder(folderId || null), [folderId]);


  const [popup, setpopup] = useState(false);


  const [folder, setFolder] = useState(currentFolder);
  useEffect(() => setFolder(currentFolder), [currentFolder]);

  
  //Folder
  
  const [updatefolders, setupdatefolders] = useState(false);
  const [folders, setFolders] = useState([]);

  const GetFolders  = async () => {
		try {
			const response = await getFolders ();
			console.log(response.data.data);
			setFolders(response.data.data);
		} catch (e) {
			console.log(e);
		}
	};

  useEffect(() => {GetFolders();}, []);
  useEffect(() => {GetFolders();}, [popup]);
  useEffect(() => {GetFolders();}, [updatefolders]);

  

  //File
  const [files, setFiles] = useState(Array(5).fill(0).map(e => ({
    _id: Math.floor(Math.random() * 100000),
    name: 'File',
    addedOn: Date.now() - Math.floor(Math.random() * 1000000000),
    size: Math.floor(Math.random() * 1000)
  })));

  return (
    <>
      <Navbar page="crestera" />
      <div className="vaultDashboard">

        <div className="vaultDashButtons">
          <button className="vaultDashButton">upload</button>
          <button className="vaultDashButton" onClick={() => setpopup(true)}>create</button>
          <Link to={`/folder/bin`} style={{ textDecoration: 'none' }}>
            <button className="vaultDashButton">Trash</button>
          </Link>


          <div className='progressBar'>
            <Progress
              strokeColor={{
                from: '#0B572E',
                to: '#117f45',
              }}
              percent={60.9}
              status="active"
              size="small"
            />
          </div>
        </div>


        <div className="folderList">
          <div className="box">

            {/* Header */}
            <div className="VaultHeader">
              <div className="VaultHeader_fileIcon"></div>
              <div className="VaultHeader_title1">
                <p>Name</p>
              </div>
              <div className="VaultHeader_middleIcon"></div>
              <div className="VaultHeader_title2">
                <p>Size</p>
              </div>
              <div className="VaultHeader_title3">
                <p>Date Modified</p>
              </div>
              <div className="VaultHeader_setings"></div>
            </div>

            {/* Folder list */}
            {
              folders.map((folder) =>
                <div key={folder._id}>
                  <FolderList folder={folder} updatefolders={updatefolders} setupdatefolders={setupdatefolders}/>
                </div>
              )
            }

            {/* File list */}
            {
              files.map((file) =>
                <FileList file={file} />
              )
            }
          </div>
        </div>

      </div>
      <FolderCreate trigger={popup} settrigger={setpopup} currentfolder={folder}/>
    </>
  );
};

export default VaultDashboard;