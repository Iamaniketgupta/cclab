
import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { userData } from '../recoil/states';
import { useRecoilState } from 'recoil';
import axiosInstance from '../utils/axiosInstance';
import { all } from 'axios';
import { set } from 'mongoose';

const FetchDataContext = createContext();

export const FetchDataProvider = ({ children }) => {
    const [currUser, setUserData] = useRecoilState(userData);

    const [allLabs, setAllLabs] = useState([]);
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [allIssues, setAllIssues] = useState([]);
    const [allResources, setAllResources] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]);
    const [allResRequests, setAllResRequests] = useState([]);
    const [allFaculties, setAllFaculties] = useState([]);
    const [allStudents, setAllStudents] = useState([]);

    const [allMyFeedbacks, setAllMyFeedbacks] = useState([]);
    const [allMyResRequests, setAllMyResRequests] = useState([]);
    const [allMyIssues, setAllMyIssues] = useState([]);

    const [allStats, setAllStats] = useState([]);


    // fetch all stats

    const fetchDashboardStats = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/stats/all');
            console.log(response.data)
            setAllStats(response.data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    }, []);



    //    fetch all labs
    const fetchAllLabs = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/labs/get/all');
            setAllLabs(response.data);
        } catch (error) {
            console.error('Error fetching all labs:', error);
        }
    }, []);

    // fetch all feedbacks
    const fetchAllFeedbacks = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/feedback/all');
            setAllFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching all feedbacks:', error);
        }
    }, []);
    // get feedbacks by user
    const fetchAllFeedbacksByUserId = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/feedback/user/all');
            setAllMyFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching all feedbacks:', error);
        }
    }, []);


    // fetch all issues
    const fetchAllIssues = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/issues/all');
            setAllIssues(response.data);
        } catch (error) {
            console.error('Error fetching all issues:', error);
        }
    }, []);
    const fetchAllIssuesByUserId = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/issues/user/all');
            setAllMyIssues(response.data);
        } catch (error) {
            console.error('Error fetching all issues:', error);
        }
    }, []);

    // fetch all resources  
    const fetchAllResources = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/resource/all');
            setAllResources(response.data);
        } catch (error) {
            console.error('Error fetching all resources:', error);
        }
    }, []);

    // fetch all schedules
    const fetchAllSchedules = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/schedule/all');
            setAllSchedules(response.data);
        } catch (error) {
            console.error('Error fetching all schedules:', error);
        }
    }, []);

    // fetch all resource requests
    const fetchAllResRequests = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/request/all');
            setAllResRequests(response.data);
        } catch (error) {
            console.error('Error fetching all resource requests:', error);
        }
    }, []);

    const fetchAllResRequestsByUserId = useCallback( async () => {
        try {
            const response = await axiosInstance.get('/request/user/all');
            setAllMyResRequests(response.data);
        } catch (error) {
            console.error('Error fetching all resource requests:', error);
        }
    }, []);

    // fetch all faculties
    const fetchAllFaculties = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/role/faculty/all');
            setAllFaculties(response.data);
        } catch (error) {
            console.error('Error fetching all faculties:', error);
        }
    }, []);

    // fetch all students
    const fetchAllStudents = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/role/student/all');
            setAllStudents(response.data);
        } catch (error) {
            console.error('Error fetching all students:', error);
        }
    }, []);

    useEffect(() => {
        if (!currUser) return;
        fetchAllLabs();
        fetchDashboardStats();
        if (currUser.role === 'admin') {
            fetchAllFaculties();
            fetchAllIssues();
            fetchAllFeedbacks();
            fetchAllResRequests();
            fetchAllResources();
        }
        if (currUser.role === 'admin' || currUser.role === 'faculty') {
            fetchAllStudents();
        }
        fetchAllSchedules();
        if (currUser.role === 'student') {
            fetchAllFeedbacksByUserId();
            fetchAllResRequestsByUserId();
            fetchAllIssuesByUserId();
        }


    }, [currUser]);





    return (
        <FetchDataContext.Provider value={{
            // data
            allLabs, setAllLabs,
            allFeedbacks, setAllFeedbacks,
            allIssues, setAllIssues,
            allResources, setAllResources,
            allSchedules, setAllSchedules,
            allResRequests, setAllResRequests,
            allFaculties, setAllFaculties,
            allStudents, setAllStudents,
            allMyFeedbacks, setAllMyFeedbacks,
            allMyIssues, setAllMyIssues,
            allMyResRequests, setAllMyResRequests,
            allStats, setAllStats,

            // functions
            fetchAllLabs,
            fetchAllFeedbacks,
            fetchAllIssues,
            fetchAllResources,
            fetchAllSchedules,
            fetchAllResRequests,
            fetchAllFaculties,
            fetchAllStudents,
            fetchAllFeedbacksByUserId,
            fetchAllResRequestsByUserId,
            fetchAllIssuesByUserId,
            fetchDashboardStats
        }}>
            {children}
        </FetchDataContext.Provider>
    );
};

export const useFetchDataApi = () => useContext(FetchDataContext);
