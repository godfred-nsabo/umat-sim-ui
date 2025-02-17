const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthService = {
    Authenticate: async (username: string , password:string) => {
        try {

           localStorage.removeItem("token");
           localStorage.removeItem("userData");

            const response = await fetch(
                `${API_URL}/UserAccount/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username, password }),
                }
              );
          
              const data = await response.json();

              if (data.token) {
                const token = data.token;
                const studentDataEndpointResponse = await fetch(
                  `${API_URL}/Account/UserInfo/StudentPortal`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${token}`, 
                    },
                  }
                );
          
                const studentData = await studentDataEndpointResponse.json();
                if (studentData) {
                  localStorage.setItem("token", token);
                  localStorage.setItem("userData", JSON.stringify(studentData));
                  return { isSuccessful: true, message: 'user logged in successfully' }; 
                } else {
                   // console.error("Student has not been registered");
                    return { isSuccessful: false, message: 'Student has not been registered' }; 
                 
                }
              } else {
                //console.error("Invalid username or password");
                return { isSuccessful: false, message: 'Invalid username or password' }; 
              }
           

        } catch (error) {
            console.error("Error authenticating user:", error);
            return { isSuccessful: false, message: 'An error occurred while authenticating' }; 
        }
    }
}

export default AuthService