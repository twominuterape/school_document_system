import React, { useEffect } from 'react';
import {
    HashRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import AddDocuments from '../elements/addDocs/indexDocs'

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
        path: '/wis/addDocs',
        exact: false,
        component: AddDocuments,
        page_name: 'Adding Documents'
    },
]
export default routes;
