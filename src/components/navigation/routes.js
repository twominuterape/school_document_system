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
import TransactionIndex from '../elements/admin/transactions/indexRequests'
import AccountRecoveryRequest from '../elements/admin/recoveryRequest/indexRequests'

export const routes = [
    // {
    //     path: '/home',
    //     exact: true,
    //     component: Index,
    //     page_name: 'LandPage'
    // },
   
    {
        path: '/',
        exact: true,
        component: AddDocuments,
        page_name: 'Adding Documents'
    },
    {
        path: '/folder/:user_id',
        exact: false,
        component: FileStorage,
        page_name: 'File Storage'
    },
    {
        path: '/fileStorageList/:folderName/:category_id/:user_id',
        exact: false,
        component: FileStorageList,
        page_name: 'File Storage List'
    },
    {
        path: '/requests',
        exact: false,
        component: RequestIndex,
        page_name: 'Requests'
    },
    {
        path: '/transactions',
        exact: false,
        component: TransactionIndex,
        page_name: 'Transactions'
    },
    {
        path: '/accountRecovery',
        exact: false,
        component: AccountRecoveryRequest,
        page_name: 'Account Recovery Request'
    },
]

export const routes_student = [
   
    {
        path: '/wis',
        exact: true,
        component: reqDocuments,
        page_name: 'Documents Request'
    },
    {
        path: '/wis/requestList/',
        exact: false,
        component: RequestIndex,
        page_name: 'Request List'
    },
]

