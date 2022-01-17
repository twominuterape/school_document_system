import React, { useEffect } from 'react';
import {
    HashRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import AddDocuments from '../elements/admin/addDocs/indexDocs'
import FileStorage from '../elements/admin/addDocs/fileList'
import FileStorageList from '../elements/admin/addDocs/fileListTable'
// import Index from '../landingpg'
import reqDocuments from '../elements/students/indexReq'
const routes = [
    // {
    //     path: '/home',
    //     exact: true,
    //     component: Index,
    //     page_name: 'LandPage'
    // },
    {
        path: '/wis',
        exact: true,
        component: reqDocuments,
        page_name: 'Documents Request'
    },
    {
        path: '/wis/documents',
        exact: false,
        component: AddDocuments,
        page_name: 'Adding Documents'
    },
    {
        path: '/wis/folder',
        exact: false,
        component: FileStorage,
        page_name: 'File Storage'
    },
    {
        path: '/wis/fileStorageList/:folderName/:category_id',
        exact: false,
        component: FileStorageList,
        page_name: 'File Storage List'
    },
]
export default routes;
