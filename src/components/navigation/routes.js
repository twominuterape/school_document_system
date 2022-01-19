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
import RequestIndex from '../elements/admin/requests/indexRequests'
export const routes = [
    // {
    //     path: '/home',
    //     exact: true,
    //     component: Index,
    //     page_name: 'LandPage'
    // },
   
    {
        path: '/wis/admin/documents',
        exact: false,
        component: AddDocuments,
        page_name: 'Adding Documents'
    },
    {
        path: '/wis/admin/folder/:user_id',
        exact: false,
        component: FileStorage,
        page_name: 'File Storage'
    },
    {
        path: '/wis/admin/fileStorageList/:folderName/:category_id',
        exact: false,
        component: FileStorageList,
        page_name: 'File Storage List'
    },
   
]

export const routes_student = [
   
    {
        path: '/',
        exact: true,
        component: reqDocuments,
        page_name: 'Documents Request'
    },
    {
        path: '/requestList/',
        exact: false,
        component: RequestIndex,
        page_name: 'Request List'
    },
]

