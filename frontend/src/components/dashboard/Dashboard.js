import React from 'react'

export default function Dashboard() {
  // const baseUrl = 'http://localhost:8080/api'

  // const makeBackendRequest = async () => {
  //       try {
  //           // Fetch Auth0 token
  //           const token = await getAccessTokenSilently();
    
  //           // Send request to backend
  //           const response = await axios.post(`${baseUrl}/login`, {
  //               user: user
  //           }, {
  //               headers: {
  //                   Authorization: `Bearer ${token}`  
  //               }
  //           });
    
  //           console.log('Backend login successful:', response.data);
  //       } catch (error) {
  //           console.error('Error in backend request:', error.response ? error.response.data : error.message);
  //       }
  //   };
  return (
      <h1>
          dashboard
        </h1>
  )
}
